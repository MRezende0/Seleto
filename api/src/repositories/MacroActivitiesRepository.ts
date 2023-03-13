import { EntityRepository, Repository } from "typeorm";
import { MacroActivity } from "../models/MacroActivity";

@EntityRepository(MacroActivity)
class MacroActivitiesRepository extends Repository<MacroActivity> {
	public async findById(id: string | undefined): Promise<MacroActivity | undefined> {
		return await this.findOne({ id });
	}
	public async findByProject(
		project: string | undefined
	): Promise<MacroActivity[]> {
		return await this.find({ project });
	}
}

export { MacroActivitiesRepository };
