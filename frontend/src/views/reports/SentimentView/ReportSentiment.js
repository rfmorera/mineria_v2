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
import SentimentRatioChart from './components/SentimentRatioChart';
import SentimentDistribution from './components/SentimentDistribution';
import ReportList from './components/ReportList';

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
      total_opiniones: '-'
    };
  }

  componentDidMount() {
    var ids = this.params.id.split(',');
    this.setState({ total: ids.length });
    // TODO: Use local state in component to avoid memory consumption
  }

  render() {
    return (
      <Container fixed>
        <Grid container spacing={3} p={2}>
          <ReportList
            data={this.state.data_report_desc}
            total_reports={this.state.total}
            start_date={this.state.min_date}
            end_date={this.state.max_date}
          />

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

        <SentimentRatioChart data={this.state.data_ratio} />

        <SentimentDistribution data={this.state.data_total_report} />
      </Container>
    );
  }
}

export default ReportSentiment;
