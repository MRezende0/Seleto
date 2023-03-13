import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

@EntityRepository(User)
class UsersRepository extends Repository<User> {
	public async findByEmail(email: string | undefined): Promise<User | undefined> {
		return await this.findOne({ email });
	}
	public async findByCpfOrCnpj(cpfOrCnpj: string | undefined): Promise<User | undefined> {
		return await this.findOne({ cpfOrCnpj });
	}
	public async findById(id: string | undefined): Promise<User | undefined> {
		return await this.findOne({ id });
	}
}

export { UsersRepository };
