import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from "../services/api";
import { login } from "../services/auth";

class SignUp extends Component {
  state = {
    fullname: null,
    email: null,
    phone: null,
    password: null,

    error: null,
  };

  handleSignUp = async (e) => {
    e.preventDefault();
    const { fullname, email, phone, password } = this.state;
    try {
      const response = await api.post("/users/create", {
        fullname,
        email,
        phone,
        password,
      });
      if (response.data.token) {
        login(response.data.token);
        this.props.history.push("/");
      } else {
        console.log(response.data)
      }
    } catch (err) {
      console.log(err);
      alert("ERROR");
      this.setState({ error: "Ocorreu um erro ao registrar sua conta. T.T" });
    }
  };

  render() {
    return (
      <div id="app">
        <section className="login">
          <div className="login__gradient">
            <div className="login__text">
              <img src="img/logo.svg" alt="" />
              <div className="login__descricao">
                <h1>A melhor forma de poder organizar sua fazenda!</h1>
                <p>
                  Gerencie sua fazeenda, produção, funcionários e maquinários de
                  maneira fácil e simples
                </p>
                <Link to="/signin" className="btn btn--primary">
                  Já sou cadastrado
                </Link>
              </div>
            </div>
            <form onSubmit={this.handleSignUp} className="login__campos">
              <div className="login__campos__text">
                <h1>Não Perca tempo!</h1>
                <p>Faça sua inscrição no melhor site de gerenciamento!</p>
              </div>

              <div className="campo">
                <label for="nome">Nome Completo</label>
                <div className="campo__input">
                  <input
                    required
                    id="nome"
                    type="text"
                    placeholder="Escreva seu nome completo"
                    onChange={(e) =>
                      this.setState({ fullname: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="campo">
                <label for="email">Email</label>
                <div className="campo__input">
                  <input
                    required
                    id="email"
                    type="email"
                    placeholder="Escreva seu email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </div>
              </div>

              <div className="campo">
                <label for="phone">Telefone</label>
                <div className="campo__input">
                  <input
                    required
                    id="phone"
                    type="phone"
                    placeholder="Escreva seu telefone"
                    onChange={(e) => this.setState({ phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="campo">
                <label for="senha">Senha</label>
                <div className="campo__input">
                  <input
                    required
                    id="senha"
                    type="password"
                    placeholder="Escreva sua senha"
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                </div>
              </div>

              <button className="btn btn--primary">Cadastrar</button>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(SignUp);
