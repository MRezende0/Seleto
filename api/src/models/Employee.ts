import moment from "moment";
import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Property } from "./Property";
import { Role } from "./Role";

@Entity("employees")
class Employee {
	@PrimaryColumn()
	readonly id: string;

	@ManyToOne(() => Property, (property) => property.id, {
		cascade: ["update", "remove"],
	})
	@Column({ name: "propertyId" })
	property: string;

	@ManyToOne(() => Role, (role) => role.id, {
		cascade: ["update", "remove"],
	})
	@Column({ name: "roleId" })
	role: Role;

	@Column()
	fullname: string;

	@Column()
	email: string;

	@Column()
	phone: string;

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
}

export { Employee };
