import moment from "moment";
import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Property } from "./Property";

@Entity("users")
class User {
	@PrimaryColumn()
	readonly id: string;

	@Column()
	fullname: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	phone: string;

	@Column()
	birthday: Date;

	@Column()
	cpfOrCnpj: string;

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

	@ManyToOne(() => Property, property => property.id, {
		cascade: ['remove', 'insert', 'update']
	})
	@JoinColumn({ name: "id" })
	property: string;

	constructor() {
		if (!this.id) this.id = uuid();
		if (!this.createdAt) this.createdAt = moment().utc().toDate();
	}
};

export { User };
