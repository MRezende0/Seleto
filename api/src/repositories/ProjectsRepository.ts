import { EntityRepository, Repository } from "typeorm";
import { Project } from "../models/Project";

@EntityRepository(Project)
class ProjectsRepository extends Repository<Project> {
	public async findById(id: string | undefined): Promise<Project | undefined> {
		return await this.findOne({ where: { id }, relations: ["type"] });
	}
	public async findByProperty(
		property: string | undefined
	): Promise<Project[]> {
		return await this.find({ where: { property }, relations: ["type"] });
	}
}

export { ProjectsRepository };
