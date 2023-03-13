import moment from "moment";
import { Column, Entity, PrimaryColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { MacroActivity } from "./MacroActivity";

@Entity("microActivities")
class MicroActivity {
	@PrimaryColumn()
	readonly id: string;

	@Column()
	name: string;

	@Column({ type: "date" })
	startDate: Date;

	@Column({ type: "date" })
	endDate: Date;
	
	@Column()
	description: string;

	@ManyToOne(() => MacroActivity, macroActivity => macroActivity.id, {
		cascade: ['update', 'remove']
	})
	@Column({ name: 'macroActivityId' })
	macroActivity: string;

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

export { MicroActivity };
