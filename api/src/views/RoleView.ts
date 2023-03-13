import { Role } from "../models/Role";

class RoleView {
	render(role: Role) {
		return {
			id: role.id,
			name: role.name,
			description: role.description,
			icon: role.icon,
		};
	}
	renderMany(roles: Role[]) {
		return roles.map((role) => this.render(role));
	}
}

export { RoleView };
