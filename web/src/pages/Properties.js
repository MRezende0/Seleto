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
      properties: [],

      name: null,
      cep: null,
      cepNumero: null,
      cepComplement: null,
    };
  }

  listProperties = async () => {
    const response = await api.get("/properties");
    this.setState({ properties: response.data.properties });
  };
  createProperty = async (e) => {
    e.preventDefault();
    const { name, cep, cepNumber, cepComplement } = this.state;
    const response = await api.post(`/properties`, {
      name,
      cep,
      cepNumber,
      cepComplement,
    });
    let properties = this.state.properties;
    properties.push(response.data.property);
    this.setState({
      properties,
      name: null,
      cep: null,
      cepNumber: null,
      cepComplement: null,
    });
  };

  componentDidMount() {
    moment.locale("pt-br");
    this.listProperties();
  }

  render() {
    return (
      <NavBar>
        <section className="app__body">
          <header className="app__body__header">
            <h1>Selecione a Propriedades</h1>
          </header>
          <div className="app__body__section">
            <div className="cards__propriedades">
              {this.state.properties.map((property) => (
                <Link to={`/${property.id}/machines`} className="card__propriedade">
                  <div className="card__propriedade__icon">: 
                    <i className="fas fa-home"></i>
                  </div>
                  <div className="card__propriedade__text">
                    {console.log(property)}
                    <p>{property.name}</p>
                    <p>
                      {property.cep}, {property.cepNumber}
                    </p>
                    <p>{property.cepComplement}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <form className="menu__rigth" onSubmit={(e) => this.createProperty(e)}>
          <h1 className="title mb--4">Adicionar Propriedade</h1>

          <div className="campo">
            <label for="nome">Nome</label>
            <div className="campo__input">
              <input
                onChange={(e) => this.setState({ name: e.target.value })}
                type="text"
                id="nome"
                placeholder="Escreva o nome"
                required
              />
            </div>
          </div>
          <div className="campo">
            <label for="cep">Cep</label>
            <div className="campo__input">
              <input
                onChange={(e) => this.setState({ cep: e.target.value })}
                type="text"
                id="cep"
                placeholder="Escreva o cep"
                required
              />
            </div>
          </div>
          <div className="campo">
            <label for="numero">Número</label>
            <div className="campo__input">
              <input
                onChange={(e) => this.setState({ cepNumber: e.target.value })}
                type="number"
                id="numero"
                placeholder="Escreva o número"
                required
              />
            </div>
          </div>
          <div className="campo">
            <label for="complemento">Complemento</label>
            <div className="campo__input">
              <input
                onChange={(e) =>
                  this.setState({ cepComplement: e.target.value })
                }
                type="text"
                id="complemento"
                placeholder="Escreva o complemento"
                required
              />
            </div>
          </div>
          <button className="btn btn--primary w-100">Adicionar</button>
        </form>
      </NavBar>
    );
  }
}

export default withRouter(Dashboard);
