import { EntityRepository, Repository } from "typeorm";
import { MicroActivity } from "../models/MicroActivity";

@EntityRepository(MicroActivity)
class MicroActivitiesRepository extends Repository<MicroActivity> {
	public async findById(id: string | undefined): Promise<MicroActivity | undefined> {
		return await this.findOne({ id });
	}
	public async findByProject(
		macroActivity: string | undefined
	): Promise<MicroActivity[]> {
		return await this.find({ macroActivity });
	}
}

export { MicroActivitiesRepository };
