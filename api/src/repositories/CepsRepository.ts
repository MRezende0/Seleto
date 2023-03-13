import { EntityRepository, Repository } from "typeorm";
import { Cep } from "../models/Cep";

@EntityRepository(Cep)
class CepRepository extends Repository<Cep> {
	public async findByCep(cep: string | undefined): Promise<Cep | undefined> {
		return await this.findOne({ cep });
	}
}

export { CepRepository };
