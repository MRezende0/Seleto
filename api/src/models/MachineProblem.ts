import moment from "moment";
import { Column, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Machine } from "./Machine";

@Entity("machinesProblem")
class MachineProblem {
	@PrimaryColumn()
	readonly id: string;

	@OneToMany(() => Machine, machine => machine.id, {
		cascade: ['update', 'remove']
	})
	@Column({ name: "machineId" })
	machine: string;
	
	@Column()
	desciption: string;

	@Column()
	level: number;

	@Column({ type: "date" })
	resolutionDate: Date;

	@Column()
	isDeleted: boolean;

	@Column()
	createdAt: Date;

	@Column()
	updatedAt: Date;

	constructor() {
		if (!this.id) this.id = uuid();
		if (!this.createdAt) this.createdAt = moment().utc().toDate();
	}
};

export { MachineProblem };
