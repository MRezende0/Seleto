import { MachineType } from "../models/MachineType";

class MachineTypeView {
	render(machineType: MachineType) {
		return {
			id: machineType.id,
			name: machineType.name,
			description: machineType.description,
			icon: machineType.icon,
		};
	}
	renderMany(machinesTypes: MachineType[]) {
		return machinesTypes.map((machineType) => this.render(machineType));
	}
}

export { MachineTypeView };
