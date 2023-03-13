import moment from "moment";
import { Column, Entity, PrimaryColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Property } from "./Property";
import { MachineType } from "./MachineType";

@Entity("machines")
class Machine {
	@PrimaryColumn()
	readonly id: string;

	@ManyToOne(() => Property, property => property.id, {
		cascade: ['update', 'remove']
	})
	@Column({ name: "propertyId" })
	property: string;

	@ManyToOne(() => MachineType, machineType => machineType.id, {
		cascade: ['update', 'remove']
	})
	@Column({ name: "typeId" })
	type: string;

	@Column()
	model: string;

	@Column()
	year: string;

	@Column()
	number: number;

	@Column()
	status: string;

	@Column()
	isDeleted: boolean;

	@Column()
	createdAt: Date;

	@Column()
	updatedAt: Date;

	constructor() {
		if (!this.id) this.id = uuid();
		if (!this.status) this.status = "OK";
		if (!this.createdAt) this.createdAt = moment().utc().toDate();
	}
};

export { Machine };
