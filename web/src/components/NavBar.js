import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import api from "../services/api";
import jwt_decode from "jwt-decode";
import { getToken } from "../services/auth";

class NavBar extends Component {
  state = {
    apiToken: null,
    user: {
      fullname: null,
      type: null,
    },
    displayName: null,

    properties: [],
  };

  setUser = async (apiToken) => {
    const user = jwt_decode(apiToken);
    const userNames = user.fullname.split(" ");
    const displayName = userNames[0] + " " + userNames[1].charAt(0) + ".";
    this.setState({ apiToken, user, displayName });
  };
  listProperties = async () => {
    const response = await api.get("/properties");
    this.setState({ properties: response.data.properties });
  };

  componentDidMount() {
    const apiToken = getToken();
    this.setUser(apiToken);
    this.listProperties();
  }

  render() {
    return (
      <div id="app">
        <nav>
          <div className="nav__header">
            <div className="nav__header__user"></div>
            <div className="nav__header__user__info">
              <p>{this.state.displayName}</p>
              <p>{this.state.user.type}</p>
            </div>
          </div>
          <div className="nav__menu">
            <div className="nav__menu__section">
              <p className="nav__menu__title">Geral</p>
              <ul className="nav__menu__body">
                {/*<NavLink to={`/${this.props.property}/dashboard`} activeClassName="menu--active">
                  <li>
                    <i className="fas fa-home"></i>
                    Home
                  </li>
                </NavLink>*/}
                <NavLink
                  to={`/${this.props.property}/projects`}
                  activeClassName="menu--active"
                >
                  <li>
                    <i className="far fa-clipboard"></i>
                    Planejamentos
                  </li>
                </NavLink>
                <NavLink
                  to={`/${this.props.property}/employees`}
                  activeClassName="menu--active"
                >
                  <li>
                    <i className="fas fa-user-friends"></i>
                    Funcionários
                  </li>
                </NavLink>
                <NavLink
                  to={`/${this.props.property}/machines`}
                  activeClassName="menu--active"
                >
                  <li>
                    <i className="fas fa-tractor"></i>
                    Maquinários
                  </li>
                </NavLink>
              </ul>
            </div>
            <div className="nav__menu__section">
              <p className="nav__menu__title">Tools</p>
              <ul className="nav__menu__body">
                {/*<NavLink to="/">
                  <li>
                    <i className="fas fa-cog"></i>
                    Configurações
                  </li>
              </NavLink>*/}
                <NavLink to="/properties" activeClassName="menu--active">
                  <li>
                    <i className="fas fa-home"></i>
                    Propriedades
                  </li>
                </NavLink>
                <NavLink to="/logout" id="sair">
                  <li>
                    <i className="fas fa-sign-out-alt"></i>
                    Sair
                  </li>
                </NavLink>
              </ul>
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

export default NavBar;
