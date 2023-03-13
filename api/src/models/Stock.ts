import { Column, Double, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { ProjectType } from "./ProjectType"
import { Supply } from "./Supply"

@Entity("stock")
class Stock {
	@PrimaryColumn()
	readonly id: string;

	@OneToMany(() => ProjectType, projectType => projectType.id, {
		cascade: ['update', 'remove']
	})
	@Column({ name: "typeId" })
	type: string;

	@OneToMany(() => Supply, supply => supply.id, {
		cascade: ['update', 'remove']
	})
	@Column({ name: "supplyId" })
	supply: string;

	@Column()
	name: string;

	@Column()
	brand: string;

	@Column()
	quantity: number;

	@Column()
	purchaseValue: number;

	@Column({ type: "date" })
	entryDate: Date;

	@Column({ type: "date" })
	exitDate: Date;

	@Column()
	validityDate: Date;

	constructor() {
		if (!this.id) this.id = uuid();
	}
};

export { Stock };
