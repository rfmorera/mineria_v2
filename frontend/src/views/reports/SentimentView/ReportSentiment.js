// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { NivoLine, NivoBar, NivoPie } from '../../components/Charts/NivoChart';
import compose_data, {
  resume_data,
  convert_to_pie
} from '../../../utils/chart-data-converter';
const API = 'http://127.0.0.1:8000/api/report-sentiment-planteamiento/';
const DEFAULT_ACTION = '/report';

class ReportSentiment extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.match.params;
    this.state = {
      data_line: [],
      data_total_report: [],
      data_total: [],
      data_report_desc: [],
      total: '-',
      total_opiniones: '-'
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
              'inicio',
              'fin',
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
            [
              'fecha_inicio',
              'total_positive',
              'total_negative',
              'total_neutral'
            ],
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
            data: compose_data(
              json.result,
              ['fecha_inicio', 'ratio'],
              ['x', 'y']
            )
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

        var min = temp_data_report_desc.reduce(function(a, b) {
          return a < b.inicio ? a : b.inicio;
        });
        var max = temp_data_report_desc.reduce(function(a, b) {
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

    console.log(temp_data_report_desc);
    this.setState({
      data_ratio: temp_data_ratio,
      data_total_report: temp_data_total_report,
      data_report_desc: temp_data_report_desc
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
            <h3 className="text-center">Descripción</h3>
            <div>
              <p className="text-center">
                Cantidad de reportes: <b>{this.state.total}</b> | Fecha Inicio :{' '}
                <b>{this.state.min_date}</b> | Fecha Fin :{' '}
                <b>{this.state.max_date}</b>
              </p>
              <div className="container">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data_report_desc.map((item, index) => (
                      <tr key={item.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div>
              <h3 className="text-center">Resumen por cantidad</h3>
              <div>
                <p className="text-center">
                  Total de opiniones: <b>{this.state.total_opiniones}</b>
                </p>
              </div>
              <div className="center-block" style={{ height: '350px' }}>
                <NivoPie data={this.state.data_total} />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-center">
            Relacion de sentimientos (Positivas/Negativas)
          </h3>
          <div style={{ height: '85vh' }}>
            <NivoLine data={this.state.data_ratio} />
          </div>
        </div>
        <br />
        <br />
        <div>
          <h3 className="text-center">Distribución de Opiniones</h3>
          <div style={{ height: '85vh' }}>
            <NivoBar
              data={this.state.data_total_report}
              indexBy="id"
              keys_data={['Positivas', 'Negativas']}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ReportSentiment;
