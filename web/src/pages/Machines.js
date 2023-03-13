import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "moment/locale/pt-br";
import moment from "moment";
import api from "../services/api";
import NavBar from "../components/NavBar";

class Machines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      machines: [],
      machinesTypes: [],

      index: null,
      id: null,
      model: "",
      year: "",
      number: "",
      type: "",
    };
  }

  listMachinesTypes = async () => {
    const response = await api.get("/machines/types");
    this.setState({ machinesTypes: response.data.machinesTypes });
  };
  listMachines = async () => {
    const response = await api.get(
      `/${this.props.match.params.property}/machines/`
    );
    this.setState({ machines: response.data.machines });
  };
  createMachine = async (e) => {
    e.preventDefault();
    const { model, year, number, type } = this.state;
    const response = await api.post(
      `/${this.props.match.params.property}/machines/`,
      {
        model,
        year,
        number,
        type,
      }
    );
    let machines = this.state.machines;
    machines.push(response.data.machines);
    this.setState({
      machines,
      index: null,
      id: null,
      model: "",
      year: "",
      number: "",
      type: "",
    });
  };
  updateMachine = async (e) => {
    e.preventDefault();
    const { index, id, model, year, number, type } = this.state;
    const response = await api.patch(
      `/machines/${id}`,
      {
        model,
        year,
        number,
        type,
      }
    );
    let machines = this.state.machines;
    machines[index] = response.data.machine;
    this.setState({
      machines,
      index: null,
      id: null,
      model: "",
      year: "",
      number: "",
      type: "",
    });
  };

  componentDidMount() {
    moment.locale("pt-br");
    this.listMachinesTypes();
    this.listMachines();
  }

  render() {
    return (
      <NavBar property={this.props.match.params.property}>
        <section className="app__body">
          <header className="app__body__header">
            <h1>Maquinários</h1>
            <button
              onClick={() =>
                this.setState({
                  id: null,
                  index: null,
                  model: "",
                  year: "",
                  number: "",
                  type: "",
                })
              }
              className="btn btn--primary"
            >
              Criar Maquinário
            </button>
          </header>
          <div className="app__body__section">
            <div className="cards__maquinas">
              {this.state.machines.map((machine, index) => (
                <div className="card__maquina" key={machine.id}>
                  <div className="card__maquina__capa"></div>
                  <div className="card__maquina__text">
                    <div className="card__maquina__header">
                      <div>
                        <h1 className="title">{machine.model}</h1>
                        <p>{machine.year}</p>
                      </div>
                      <i
                        onClick={() =>
                          this.setState({
                            index,
                            id: machine.id,
                            model: machine.model,
                            year: machine.year,
                            number: machine.number,
                            type: machine.type,
                          })
                        }
                        className="fas fa-pen"
                        style={{cursor: "pointer"}}
                      ></i>
                    </div>
                    <p className="subtitle">Número</p>
                    <p>{machine.number}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <form
          className="menu__rigth"
          onSubmit={(e) =>
            this.state.id ? this.updateMachine(e) : this.createMachine(e)
          }
        >
          <h1 className="title mb--4">Maquinário</h1>

          <div className="campo">
            <label htmlFor="modelo">Modelo</label>
            <div className="campo__input">
              <input
                onChange={(e) => this.setState({ model: e.target.value })}
                value={this.state.model}
                type="text"
                placeholder="Escreva seu modelo"
                required
              />
            </div>
          </div>
          <div className="campo">
            <label htmlFor="ano">Ano</label>
            <div className="campo__input">
              <input
                onChange={(e) => this.setState({ year: e.target.value })}
                value={this.state.year}
                type="text"
                placeholder="Escreva seu ano"
                required
              />
            </div>
          </div>
          <div className="campo">
            <label htmlFor="num">Número</label>
            <div className="campo__input">
              <input
                onChange={(e) => this.setState({ number: e.target.value })}
                value={this.state.number}
                type="number"
                placeholder="Escreva seu número"
                required
              />
            </div>
          </div>
          <div className="campo">
            <label htmlFor="tipo">Tipo</label>
            <div className="campo__input">
              <select
                onChange={(e) => this.setState({ type: e.target.value })}
                value={this.state.type}
                name="tipo"
                required
              >
                <option value={null}>Selecione o tipo</option>
                {this.state.machinesTypes.map((machineType) => (
                  <option value={machineType.id} key={machineType.id}>{machineType.name}</option>
                ))}
              </select>
            </div>
          </div>
          <button className="btn btn--primary w-100">
            {this.state.id ? "Editar" : "Adicionar"}
          </button>
        </form>
      </NavBar>
    );
  }
}

export default withRouter(Machines);
