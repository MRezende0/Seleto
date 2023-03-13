import { EntityRepository, Repository } from "typeorm";
import { ProjectType } from "../models/ProjectType";

@EntityRepository(ProjectType)
class ProjectTypeRepository extends Repository<ProjectType> {
	public async findById(id: string | undefined): Promise<ProjectType | undefined> {
		return await this.findOne({ id });
	}
}

export { ProjectTypeRepository };
