import { User } from "../models/User";

class UserView {
	render(user: User) {
		return {
			id: user.id,
			fullname: user.fullname,
			email: user.email,
			phone: user.phone,
			cpfOrCnpj: user.cpfOrCnpj,
			cep: user.cep,
			cepNumber: user.cep,
			cepComplement: user.cepComplement,
		};
	}
	renderMany(users: User[]) {
		return users.map((user) => this.render(user));
	}
}

export { UserView };
