import moment from "moment";
import { Column, Entity, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";
import { Employee } from "./Employee";
import { Project } from "./Project";

@Entity("properties")
class Property {
	@PrimaryColumn()
	readonly id: string;

	@Column()
	name: string;

	@ManyToOne(() => User, user => user.id, {
		cascade: ['insert']
	})
	@Column({ name: 'userId' })
	user: string;

	@Column()
	area: string;

	@Column()
	cep: string;

	@Column()
	cepNumber: number;

	@Column()
	cepComplement: string;

	@Column()
	isDeleted: boolean;

	@Column()
	createdAt: Date;

	@Column()
	updatedAt: Date;

	@OneToMany(() => Employee, employee => employee.id, {
		cascade: ['remove', 'insert', 'update']
	})
	employee: string;

	@OneToMany(() => Project, project => project.id, {
		cascade: ['update', 'remove']
	})
	projects: string;

	constructor() {
		if (!this.id) this.id = uuid();
		if (!this.createdAt) this.createdAt = moment().utc().toDate();
	}
};

export { Property };
