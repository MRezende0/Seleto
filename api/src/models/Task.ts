import moment from "moment";
import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Employee } from "./Employee";

@Entity("tasks")
class Task {
	@PrimaryColumn()
	readonly id: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	endDate: Date;

	@Column()
	expectedEndDate: Date;

	@Column()
	status: string;

	@Column()
	isDeleted: boolean;

	@Column()
	createdAt: Date;

	@Column()
	updatedAt: Date;

	@ManyToOne(() => Employee, employee => employee.id, {
		cascade: ['remove', 'update']
	})
	@JoinColumn({ name: "id" })
	employee: string;

	constructor() {
		if (!this.id) this.id = uuid();
		if (!this.createdAt) this.createdAt = moment().utc().toDate();
	}
};

export { Task };
