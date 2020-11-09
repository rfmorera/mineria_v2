// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { NivoLine, NivoBar, NivoPie } from '../../components/Charts/NivoChart';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Container,
  Grid,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { flexbox } from '@material-ui/system';
import compose_data, {
  resume_data,
  convert_to_pie
} from '../../../utils/chart-data-converter';

const API = 'http://127.0.0.1:8000/api/report-sentiment-planteamiento/';
const DEFAULT_ACTION = '/report';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

const columns = [
  { field: 'name', headerName: 'Nombre', width: 50 },
  { field: 'description', headerName: 'Descripción', width: 50 }
];

class ReportSentiment extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.match.params;
    this.state = {
      data_line: [],
      data_total_report: [],
      data_total: [],
      data_ratio: [],
      data_report_desc: [],
      total: '-',
      total_opiniones: '-',
      page: '0'
    };
  }

  componentDidMount() {
    var ids = this.params.id.split(',');
    this.setState({ total: ids.length });

    const promises = ids.map(item => {
      return fetch(API + item + DEFAULT_ACTION)
        .then(response => response.json())
        .then(json => {
          var desc = compose_data(
            [json],
            [
              'id',
              'name',
              'description',
              'start_date',
              'end_date',
              'delta_type',
              'delta_value'
            ],
            [
              'id',
              'name',
              'description',
              'inicio',
              'fin',
              'delta_type',
              'delta_value'
            ]
          )[0];

          var total_d = compose_data(
            json.result,
            ['start_date', 'total_positive', 'total_negative', 'total_neutral'],
            ['fecha', 'Positivas', 'Negativas', 'Neutras']
          );

          total_d = resume_data(
            total_d,
            ['Positivas', 'Negativas', 'Neutras'],
            ['Positivas', 'Negativas', 'Neutras'],
            { id: desc['name'] }
          );

          var ratio_d = {
            id: desc['name'],
            data: compose_data(json.result, ['start_date', 'ratio'], ['x', 'y'])
          };

          return { desc, total_d, ratio_d };
        });
    });

    var temp_data_ratio = [];
    var temp_data_total_report = [];
    var temp_data_report_desc = [];

    Promise.all(promises)
      .then(results => {
        results.map(item => {
          temp_data_ratio.push(item['ratio_d']);

          temp_data_total_report.push(item['total_d']);

          temp_data_report_desc.push(item['desc']);
        });

        var min = [null].concat(temp_data_report_desc).reduce(function(a, b) {
          return a < b.inicio ? a : b.inicio;
        });
        var max = [null].concat(temp_data_report_desc).reduce(function(a, b) {
          return a > b.fin ? a : b.fin;
        });

        if (max === null) {
          max = 'Ahora';
        }
        this.setState({
          min_date: min,
          max_date: max
        });
        return temp_data_total_report;
      })
      .then(result => {
        var ans = convert_to_pie(
          temp_data_total_report,
          ['Positivas', 'Negativas', 'Neutras'],
          ['Positivas', 'Negativas', 'Neutras']
        );

        var total_op = resume_data(ans, ['value'], ['value']);

        this.setState({
          data_total: ans,
          total_opiniones: total_op['value']
        });
      });

    this.setState({
      data_ratio: temp_data_ratio,
      data_total_report: temp_data_total_report,
      data_report_desc: temp_data_report_desc
    });
  }

  render() {
    return (
      <Container fixed>
        <Grid container spacing={3} p={2}>
          <Grid
            container
            item
            xs={12}
            sm={6}
            alignItems="center"
            direction="column"
            justify="flex-start"
          >
            <Box p={3}>
              <Typography variant="h3">Descripción</Typography>
            </Box>
            <Box>
              <Typography variant="p"></Typography>
              Cantidad de reportes: <b>{this.state.total}</b> | Fecha Inicio :{' '}
              <b>{this.state.min_date}</b> | Fecha Fin :{' '}
              <b>{this.state.max_date}</b>
            </Box>
            {this.state.data_report_desc.length === 0 ? (
              <Box p={3}>
                <CircularProgress/>
              </Box>
            ) : (
              <Box maxHeight="300px" width="100%">
                <div>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Descripción</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.data_report_desc.map((item, index) => (
                        <TableRow hover key={item.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            <Box alignItems="center" display="flex">
                              <Typography color="textPrimary" variant="body1">
                                {item.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{item.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    component="div"
                    count={this.state.data_report_desc.length}
                    page={this.state.page}
                    rowsPerPage={5}
                    rowsPerPageOptions={5}
                  />
                </div>
              </Box>
            )}
          </Grid>
          <Grid
            container
            xs={12}
            sm={6}
            alignItems="center"
            direction="column"
            justify="flex-start"
          >
            <Box p={3}>
              <Typography variant="h3">Resumen por cantidad</Typography>
            </Box>
            <div>
              <p className="text-center">
                Total de opiniones: <b>{this.state.total_opiniones}</b>
              </p>
            </div>
            {this.state.data_total.length === 0 ? (
              <Box p={3}>
                <CircularProgress />
              </Box>
            ) : (
              <Box height="350px" width="100%" component="div">
                <NivoPie data={this.state.data_total} />
              </Box>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="center"
          direction="column"
          justify="flex-start"
          pt={5}
        >
          <Box p={3}>
            <Typography variant="h3">
              Relacion de sentimientos (Positivas/Negativas)
            </Typography>
          </Box>
          {this.state.data_ratio.length === 0 ? (
            <Box p={3} pt={5} width="100%">
              <LinearProgress />
            </Box>
          ) : (
            <Box height="80vh" width="100%">
              <NivoLine data={this.state.data_ratio} />
            </Box>
          )}

          <Box p={3} pt={5}>
            <Typography variant="h3">Distribución de Opiniones</Typography>
          </Box>

          {this.state.data_total_report.length === 0 ? (
            <Box p={3} pt={5} width="100%">
              <LinearProgress />
            </Box>
          ) : (
            <Box height="80vh" width="100%">
              <NivoBar
                data={this.state.data_total_report}
                indexBy="id"
                keys_data={['Positivas', 'Negativas']}
              />
            </Box>
          )}
        </Grid>
      </Container>
    );
  }
}

export default ReportSentiment;
