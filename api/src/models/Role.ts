import { Column, Entity, PrimaryColumn, JoinTable, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Employee } from "./Employee";

@Entity("roles")
class Role {
	@PrimaryColumn()
	readonly id: string;

	@OneToMany(() => Employee, employee => employee.role)
	employees: Employee[];

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	icon: string;

	constructor() {
		if (!this.id) this.id = uuid();
	}
}

export { Role };
