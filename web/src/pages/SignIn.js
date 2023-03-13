import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from "../services/api";
import { login } from "../services/auth";

class SignIn extends Component {
  state = {
    email: null,
    password: null,

    error: null,
  };

  handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const response = await api.post("/users/login", {
        email,
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
                <Link to="/signup" className="btn btn--primary">Cadastrar-me</Link>
              </div>
            </div>
            <form onSubmit={this.handleSignIn} className="login__campos">
              <div className="login__campos__text">
                <h1>Aoba!</h1>
                <p>Faça login para começar!</p>
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
                <Link to="/forgout">Esqueceu sua senha?</Link>
              </div>

              <button className="btn btn--primary">Entrar</button>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(SignIn);
