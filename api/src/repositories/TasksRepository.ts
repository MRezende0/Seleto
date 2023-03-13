import { EntityRepository, Repository } from "typeorm";
import { Task } from "../models/Task";

@EntityRepository(Task)
class TasksRepository extends Repository<Task> {
	public async findById(id: string | undefined): Promise<Task | undefined> {
		return await this.findOne({ id });
	}
	public async findByEmployee(employee: string | undefined): Promise<Task[]> {
		return await this.find({ employee });
	}
}

export { TasksRepository };
