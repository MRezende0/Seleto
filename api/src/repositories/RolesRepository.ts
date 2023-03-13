import { EntityRepository, Repository } from "typeorm";
import { Role } from "../models/Role";

@EntityRepository(Role)
class RolesRepository extends Repository<Role> {
	public async findById(id: string | undefined): Promise<Role | undefined> {
		return await this.findOne({ id });
	}
}

export { RolesRepository };
