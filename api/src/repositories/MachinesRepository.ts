import { EntityRepository, Repository } from "typeorm";
import { Machine } from "../models/Machine";

@EntityRepository(Machine)
class MachinesRepository extends Repository<Machine> {
	public async findById(id: string | undefined): Promise<Machine | undefined> {
		return await this.findOne({ id });
	}
	public async findByProperty(property: string | undefined): Promise<Machine[]> {
		return await this.find({ property });
	}
}

export { MachinesRepository };
