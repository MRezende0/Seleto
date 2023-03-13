import { EntityRepository, Repository } from "typeorm";
import { MachineType } from "../models/MachineType";

@EntityRepository(MachineType)
class MachinesTypesRepository extends Repository<MachineType> {
	public async findById(id: string | undefined): Promise<MachineType | undefined> {
		return await this.findOne({ id });
	}
}

export { MachinesTypesRepository };
