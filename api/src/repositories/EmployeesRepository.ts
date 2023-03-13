import { EntityRepository, Repository } from "typeorm";
import { Employee } from "../models/Employee";

@EntityRepository(Employee)
class EmployeesRepository extends Repository<Employee> {
	public async findById(id: string | undefined): Promise<Employee | undefined> {
		return await this.findOne({ where: { id }, relations: ["role"] });
	}
	public async findByProperty(
		property: string | undefined
	): Promise<Employee[]> {
		return await this.find({ where: { property }, relations: ["role"] });
	}
}

export { EmployeesRepository };
