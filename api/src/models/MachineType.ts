import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("machinesTypes")
class MachineType {
	@PrimaryColumn()
	readonly id: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	icon: string;

	constructor() {
		if (!this.id) this.id = uuid();
	}
};

export { MachineType };
