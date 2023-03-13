import { EntityRepository, Repository } from "typeorm";
import { Property } from "../models/Property";
import { User } from "../models/User";

@EntityRepository(Property)
class PropertiesRepository extends Repository<Property> {
	public async findById(id: string | undefined): Promise<Property | undefined> {
		return await this.findOne({ id });
	}
	public async findByUserId(userId: string | undefined): Promise<Property[]> {
		return await this.find({ user: userId });
	}
}

export { PropertiesRepository };
