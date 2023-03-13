import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "moment/locale/pt-br";
import api from "../services/api";
import moment from "moment";
import NavBar from "../components/NavBar";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    };
  }

  getMachines = async () => {};
  getTasks = async () => {
    const response = await api.get(`/employee/tasks/`);
    this.setState({ tasks: response.data.tasks });
  };

  componentDidMount() {
    moment.locale("pt-br");
    this.getTasks();
    this.getMachines();
  }

  render() {
    return (
      <NavBar property={this.props.match.params.property}>
        <section className="app__body">
          <header className="app__body__header">
            <h1>Dashboard</h1>
            <p>{moment().format("LL")}</p>
          </header>
          <div className="slide"></div>
          <div className="app__body__section">
            <div className="app__body__section__header">
              <p className="app__body__section__title">
                Maquinários Reportados
              </p>
              <Link to="/">Ver mais</Link>
            </div>
            <div className="cards">
              <div className="cards__maquinarios">
                <div className="cards__overlay">
                  <div className="cards__text">
                    <div className="cards__title">
                      <p>Trator</p>
                      <p>29.02</p>
                    </div>
                  </div>
                  <p className="cards__descricao">Manutenção preventiva</p>
                </div>
              </div>
              <div className="cards__maquinarios">
                <div className="cards__overlay">
                  <div className="cards__text">
                    <div className="cards__title">
                      <p>Semeadora</p>
                      <p>31.05</p>
                    </div>
                  </div>
                  <p className="cards__descricao">Manutenção no Motor</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="menu__rigth">
          <h1 className="title">Tarefas</h1>
          <p className="text mb--4">
            Analise suas tarefas e dos seus colaboradores
          </p>
          <p className="title__min">Minhas atividades</p>

          {this.state.tasks.map((task) => (
            <div className="card__tarefa">
              <div className="card__title">{task}</div>
              <p className="card__text"></p>
            </div>
          ))}
        </div>
      </NavBar>
    );
  }
}

export default withRouter(Dashboard);
