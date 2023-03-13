import { Employee } from "../models/Employee";

class EmployeeView {
	render(employee: Employee) {
		return {
			id: employee.id,
			fullname: employee.fullname,
			email: employee.email,
			phone: employee.phone,
			roleId: employee.role.id,
			roleName: employee.role.name,
		};
	}
	renderMany(employees: Employee[]) {
		return employees.map((employee) => this.render(employee));
	}
}

export { EmployeeView };
