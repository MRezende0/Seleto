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
      employees: [],
      employeesRoles: [],

      index: null,
      id: null,
      fullname: "",
      email: "",
      role: "",
      phone: "",
    };
  }

  listEmployeesRoles = async () => {
    const response = await api.get("/employees/roles");
    this.setState({ employeesRoles: response.data.roles });
  };
  listEmployees = async () => {
    const response = await api.get(
      `/${this.props.match.params.property}/employees/`
    );
    this.setState({ employees: response.data.employees });
  };
  createEmployees = async (e) => {
    e.preventDefault();
    const { fullname, email, role, phone } = this.state;
    const response = await api.post(
      `/${this.props.match.params.property}/employees/`,
      {
        fullname,
        email,
        role,
        phone,
      }
    );
    let employees = this.state.employees;
    employees.push(response.data.employee);
    this.setState({
      employees,
      index: null,
      id: null,
      fullname: "",
      email: "",
      role: "",
      phone: "",
    });
  };
  updateEmployee = async (e) => {
    e.preventDefault();
    const { index, id, fullname, email, role, phone } = this.state;
    const response = await api.patch(`/employees/${id}`, {
      fullname,
      email,
      role,
      phone,
    });
    let employees = this.state.employees;
    employees[index] = response.data.employee;
    this.setState({
      employees,
      index: null,
      id: null,
      fullname: "",
      email: "",
      role: "",
      phone: "",
    });
  };

  componentDidMount() {
    moment.locale("pt-br");
    this.listEmployees();
    this.listEmployeesRoles();
  }

  render() {
    return (
      <NavBar property={this.props.match.params.property}>
        <section className="app__body">
          <header className="app__body__header">
            <h1>Funcionários</h1>
            <button
              onClick={() =>
                this.setState({
                  id: null,
                  index: null,
                  fullname: "",
                  email: "",
                  role: "",
                  phone: "",
                })
              }
              className="btn btn--primary"
            >
              Criar Funcionário
            </button>
          </header>
          <div className="app__body__section">
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Cargo</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.employees.map((employee, index) => (
                    <tr key={employee.id}>
                      <td>{employee.fullname}</td>
                      <td>{employee.email}</td>
                      <td>{employee.phone}</td>
                      <td>{employee.roleName}</td>
                      <td>
                        <i
                          onClick={() =>
                            this.setState({
                              index,
                              id: employee.id,
                              fullname: employee.fullname,
                              email: employee.email,
                              role: employee.roleId,
                              phone: employee.phone,
                            })
                          }
                          className="fas fa-pen"
                          style={{ cursor: "pointer" }}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <form
          className="menu__rigth"
          onSubmit={(e) =>
            this.state.id ? this.updateEmployee(e) : this.createEmployees(e)
          }
        >
          <h1 className="title mb--4">Funcionário</h1>

          <div className="campo">
            <label htmlFor="nome">Nome Completo</label>
            <div className="campo__input">
              <input
                onChange={(e) => this.setState({ fullname: e.target.value })}
                value={this.state.fullname}
                type="text"
                placeholder="Escreva seu nome"
                required
              />
            </div>
          </div>
          <div className="campo">
            <label htmlFor="email">Email</label>
            <div className="campo__input">
              <input
                onChange={(e) => this.setState({ email: e.target.value })}
                value={this.state.email}
                type="email"
                placeholder="Escreva seu email"
                required
              />
            </div>
          </div>
          <div className="campo">
            <label htmlFor="nasc">Telefone</label>
            <div className="campo__input">
              <input
                onChange={(e) => this.setState({ phone: e.target.value })}
                value={this.state.phone}
                type="phone"
                placeholder="Escreva seu telefone"
                required
              />
            </div>
          </div>
          <div className="campo">
            <label htmlFor="cargo">Cargo</label>
            <div className="campo__input">
              <select
                onChange={(e) => this.setState({ role: e.target.value })}
                value={this.state.role}
                name="cargo"
                required
              >
                <option value={null}>Selecione o tipo</option>
                {this.state.employeesRoles.map((employeeRole) => (
                  <option key={employeeRole.id} value={employeeRole.id}>
                    {employeeRole.name}
                  </option>
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
