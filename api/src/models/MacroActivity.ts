import moment from "moment";
import { Column, Entity, PrimaryColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Project } from "./Project";

@Entity("macrosActivities")
class MacroActivity {
	@PrimaryColumn()
	readonly id: string;

	@Column()
	name: string;

	@Column({ type: "date" })
	startDate: Date;

	@Column({ type: "date" })
	endDate: Date;

	@Column({ type: "date" })
	expectedEndDate: Date;

	@Column()
	description: string;

	@ManyToOne(() => Project, project => project.id, {
		cascade: ['update', 'remove']
	})
	@Column({ name: 'projectId' })
	project: string;

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

export { MacroActivity };
