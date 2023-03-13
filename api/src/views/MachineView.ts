import { Machine } from "../models/Machine";

class MachineView {
	render(machine: Machine) {
		return {
			id: machine.id,
			model: machine.model,
			year: machine.year,
			type: machine.type,
			number: machine.number,
			createdAt: machine.createdAt,
			updatedAt: machine.updatedAt,
		};
	}
	renderMany(machines: Machine[]) {
		return machines.map((machine) => this.render(machine));
	}
}

export { MachineView };
