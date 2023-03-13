import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "moment/locale/pt-br";
import moment from "moment";
import api from "../services/api";
import NavBar from "../components/NavBar";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      projectsTypes: [],

      name: null,
      description: null,
      startDate: null,
      expectedEndDate: null,
      type: null,
    };
  }

  listProjectsTypes = async () => {
    const response = await api.get("/projects/types");
    this.setState({ projectsTypes: response.data.projectsTypes });
  };
  listProjects = async () => {
    const response = await api.get(
      `/${this.props.match.params.property}/projects/`
    );
    this.setState({ projects: response.data.projects });
  };
  createProjects = async (e) => {
    e.preventDefault();
    const { name, description, startDate, expectedEndDate, type } = this.state;
    const response = await api.post(
      `/${this.props.match.params.property}/projects/`,
      {
        name,
        description,
        startDate,
        expectedEndDate,
        type,
      }
    );
    let projects = this.state.projects;
    console.log(response.data);
    projects.push(response.data.project);
    this.setState({
      projects,
      name: null,
      description: null,
      startDate: null,
      expectedEndDate: null,
      type: null,
    });
  };

  componentDidMount() {
    moment.locale("pt-br");
    this.listProjectsTypes();
    this.listProjects();
  }

  render() {
    return (
      <NavBar property={this.props.match.params.property}>
        <section className="app__body">
          <header className="app__body__header">
            <h1>Planejamento</h1>
          </header>
          <div className="app__body__section">
            <div className="cards__plan">
              {this.state.projects.map((project) => (
                <Link
                  to={`/${this.props.match.params.property}/${project.id}/macrosActivities`}
                  className="card__plan"
                  key={project.id}
                >
                  <div className="tags">{project.typeName}</div>
                  <h1 className="title">{project.name}</h1>
                  <p className="text">{project.description}</p>
                  <div className="card__plan__footer">
                    <p>
                      {moment(project.expectedEndDate).diff(
                        moment(project.startDate),
                        "days"
                      ) > 0
                        ? moment(project.expectedEndDate).diff(
                            moment(project.startDate),
                            "days"
                          )
                        : 0}{" "}
                      dias
                    </p>
                    <div className="funcionarios"></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <form className="menu__rigth" onSubmit={(e) => this.createProjects(e)}>
          <h1 className="title mb--4">Projeto</h1>

          <div className="campo">
            <label htmlFor="nome">Nome</label>
            <div className="campo__input">
              <input
                onChange={(e) => this.setState({ name: e.target.value })}
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
                onChange={(e) => this.setState({ description: e.target.value })}
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
                type="date"
                min={this.state.startDate}
                required
              />
            </div>
          </div>
          <div className="campo">
            <label htmlFor="tipo">Tipo</label>
            <div className="campo__input">
              <select
                onChange={(e) => this.setState({ type: e.target.value })}
                name="tipo"
                required
              >
                <option value={null}>Selecione o tipo</option>
                {this.state.projectsTypes.map((projectType) => (
                  <option value={projectType.id} key={projectType.id}>{projectType.name}</option>
                ))}
              </select>
            </div>
          </div>
          <button className="btn btn--primary w-100">Adicionar</button>
        </form>
      </NavBar>
    );
  }
}

export default withRouter(Projects);
