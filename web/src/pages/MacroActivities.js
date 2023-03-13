import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "moment/locale/pt-br";
import moment from "moment";
import api from "../services/api";
import NavBar from "../components/NavBar";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: [],
      macrosActivities: [],

      index: null,
      id: null,

      name: "",
      description: "",
      startDate: "",
      expectedEndDate: "",

      menuRigth: "createMacroActivity",
      menusRigth: {
        findMacroActivity: () => (
          <div>
            <div className="menu__atividades__header">
              <h1 className="title">{this.state.name}</h1>
              <button
                className="edit"
                onClick={() =>
                  this.setState({ menuRigth: "updateMacroActivity" })
                }
                style={{ cursor: "pointer" }}
              >
                <i className="fas fa-pen"></i>
              </button>
            </div>
            <p className="text mb--4">{this.state.description}</p>
            <p className="subtitle">Data de entrega</p>
            <p className="text">
              {moment(this.state.startDate).format("DD/MM/YYYY")}
            </p>
          </div>
        ),
        createMacroActivity: () => (
          <form
            className="menu__rigth"
            onSubmit={(e) => this.createMacroActivity(e)}
          >
            <h1 className="title mb--4">Macro Atividade</h1>

            <div className="campo">
              <label htmlFor="nome">Nome</label>
              <div className="campo__input">
                <input
                  onChange={(e) => this.setState({ name: e.target.value })}
                  value={this.state.name}
                  type="text"
                  placeholder="Escreva seu nome"
                  required
                />
              </div>
            </div>
            <div className="campo">
              <label htmlFor="nome">Descrição</label>
              <div className="campo__input">
                <input
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                  value={this.state.description}
                  type="text"
                  placeholder="Escreva uma descrição"
                  required
                />
              </div>
            </div>
            <div className="campo">
              <label htmlFor="inicio">Data de inicio</label>
              <div className="campo__input">
                <input
                  onChange={(e) => this.setState({ startDate: e.target.value })}
                  value={this.state.startDate}
                  type="date"
                  required
                />
              </div>
            </div>
            <div className="campo">
              <label htmlFor="termino">Data de Termino</label>
              <div className="campo__input">
                <input
                  onChange={(e) =>
                    this.setState({ expectedEndDate: e.target.value })
                  }
                  value={this.state.expectedEndDate}
                  type="date"
                  min={this.state.startDate}
                  required
                />
              </div>
            </div>
            <button className="btn btn--primary w-100">Adicionar</button>
          </form>
        ),
        updateMacroActivity: () => (
          <form
            className="menu__rigth"
            onSubmit={(e) => this.updateMacroActivity(e)}
          >
            <h1 className="title mb--4">Macro Atividade</h1>

            <div className="campo">
              <label htmlFor="nome">Nome</label>
              <div className="campo__input">
                <input
                  onChange={(e) => this.setState({ name: e.target.value })}
                  value={this.state.name}
                  type="text"
                  placeholder="Escreva seu nome"
                  required
                />
              </div>
            </div>
            <div className="campo">
              <label htmlFor="nome">Descrição</label>
              <div className="campo__input">
                <input
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                  value={this.state.description}
                  type="text"
                  placeholder="Escreva uma descrição"
                  required
                />
              </div>
            </div>
            <div className="campo">
              <label htmlFor="inicio">Data de inicio</label>
              <div className="campo__input">
                <input
                  onChange={(e) => this.setState({ startDate: e.target.value })}
                  value={this.state.startDate}
                  type="date"
                  required
                />
              </div>
            </div>
            <div className="campo">
              <label htmlFor="termino">Data de Termino</label>
              <div className="campo__input">
                <input
                  onChange={(e) =>
                    this.setState({ expectedEndDate: e.target.value })
                  }
                  value={this.state.expectedEndDate}
                  type="date"
                  min={this.state.startDate}
                  required
                />
              </div>
            </div>
            <button className="btn btn--primary w-100">Editar</button>
          </form>
        ),
      },
    };
  }

  findProject = async () => {
    const response = await api.get(
      `/projects/${this.props.match.params.project}`
    );
    this.setState({ project: response.data.project });
  };
  listMacroActivities = async () => {
    const response = await api.get(
      `/${this.props.match.params.project}/macroActivity/`
    );
    this.setState({ macrosActivities: response.data.macrosActivities });
  };
  createMacroActivity = async (e) => {
    e.preventDefault();
    const { name, description, startDate, expectedEndDate } = this.state;
    const response = await api.post(
      `/${this.props.match.params.project}/macroActivity/`,
      {
        name,
        description,
        startDate,
        expectedEndDate,
      }
    );
    let macrosActivities = this.state.macrosActivities;
    macrosActivities.push(response.data.macroActivity);
    this.setState({
      macrosActivities,
      index: null,
      id: null,
      name: "",
      description: "",
      startDate: "",
      expectedEndDate: "",
    });
  };
  updateMacroActivity = async (e) => {
    e.preventDefault();
    const { index, id, name, description, startDate, expectedEndDate } =
      this.state;
    const response = await api.patch(`/macroActivity/${id}`, {
      name,
      description,
      startDate,
      expectedEndDate,
    });
    let macrosActivities = this.state.macrosActivities;
    macrosActivities[index] = response.data.macroActivity;
    this.setState({
      macrosActivities,
      menuRigth: "createMacroActivity",
      index: null,
      id: null,
      name: "",
      description: "",
      startDate: "",
      expectedEndDate: "",
    });
  };

  componentDidMount() {
    moment.locale("pt-br");
    this.findProject();
    this.listMacroActivities();
  }

  render() {
    return (
      <NavBar property={this.props.match.params.property}>
        <section className="app__body">
          <header className="app__body__header">
            <h1>Macro Atividades</h1>
            <button
              onClick={() =>
                this.setState({
                  menuRigth: "createMacroActivity",
                  index: null,
                  id: null,
                  name: "",
                  description: "",
                  startDate: "",
                  expectedEndDate: "",
                })
              }
              className="btn btn--primary"
            >
              Criar Atividades
            </button>
          </header>
          <div className="app__body__section">
            <div className="cards__plan mb-4">
              <div className="card__plan w-100 mr-0">
                <div className="tags">{this.state.project.typeName}</div>
                <h1 className="title title--lg">{this.state.project.name}</h1>
                <p className="subtitle subtitle--gray">Descrição</p>
                <p className="text mb-4">{this.state.project.description}</p>

                <p className="subtitle subtitle--gray">Data de Inicio</p>
                <p className="text">
                  {moment(this.state.project.startDate).format("DD/MM/YYYY")}
                </p>
              </div>
            </div>

            {this.state.macrosActivities.map((macroActivity, index) => (
              <div
                onClick={() =>
                  this.setState({
                    menuRigth: "findMacroActivity",
                    index,
                    id: macroActivity.id,
                    name: macroActivity.name,
                    description: macroActivity.description,
                    startDate: macroActivity.startDate,
                    expectedEndDate: macroActivity.expectedEndDate,
                  })
                }
                className="list"
                key={macroActivity.id}
              >
                <p>{macroActivity.name}</p>
                <i className="fas fa-ellipsis-v"></i>
              </div>
            ))}
          </div>
        </section>

        <div className="menu__rigth">
          {this.state.menusRigth[this.state.menuRigth]()}
        </div>
      </NavBar>
    );
  }
}

export default withRouter(Projects);
