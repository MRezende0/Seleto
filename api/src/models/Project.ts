import moment from "moment";
import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Property } from "./Property";
import { ProjectType } from "./ProjectType";

@Entity("projects")
class Project {
	@PrimaryColumn()
	readonly id: string;

	@ManyToOne(() => Property, property => property.id, {
		cascade: ['update', 'remove']
	})
	@Column({ name: 'propertyId' })
	property: string;

	@ManyToOne(() => ProjectType, projectType => projectType.id, {
		cascade: ['update', 'remove']
	})
	@Column({ name: 'typeId' })
	type: ProjectType;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column({ type: "date" })
	startDate: Date;

	@Column({ type: "date" })
	endDate: Date;

	@Column({ type: "date" })
	expectedEndDate: Date;

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

export { Project };
