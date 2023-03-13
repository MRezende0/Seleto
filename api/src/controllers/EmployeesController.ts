import { Request, Response } from "express";
import { getCustomRepository, getManager } from "typeorm";
import { EmployeesRepository } from "../repositories/EmployeesRepository";
import { RolesRepository } from "../repositories/RolesRepository";
import { EmployeeView } from "../views/EmployeeView";
import { RoleView } from "../views/RoleView";
import * as Yup from "yup";
import moment from "moment";
import { Employee } from "../models/Employee";

export class EmployeesController {
	async listRoles(req: Request, res: Response) {
		const rolesRepository = getCustomRepository(RolesRepository);
		const roles = await rolesRepository.find();

		const roleView = new RoleView();
		return res
			.status(200)
			.json({
				message: "successfully list",
				roles: roleView.renderMany(roles),
			});
	}
	async list(req: Request, res: Response) {
		const { property } = req.params;

		const employeesRepository = getCustomRepository(EmployeesRepository);
		const employees = await employeesRepository.findByProperty(property);

		const employeeView = new EmployeeView();
		return res.status(200).json({
			message: "successfully list",
			employees: employeeView.renderMany(employees),
		});
	}
	async create(req: Request, res: Response) {
		const { property } = req.params;
		const { fullname, email, phone, role } = req.body;

		const propertySchema = Yup.object().shape({
			fullname: Yup.string().required(),
			email: Yup.string().email().required(),
			phone: Yup.string().required(),
			role: Yup.string().required(),
		});
		await propertySchema.validate(
			{
				fullname,
				email,
				phone,
				role,
			},
			{ abortEarly: false }
		);

		const repository = getCustomRepository(EmployeesRepository);
		const employee = repository.create({
			fullname,
			email,
			phone,
			role,
			property,
		});
		await repository.save(employee);

		const newEmployee = await repository.findById(employee.id);
		if (!newEmployee) return;

		const employeeView = new EmployeeView();
		return res.status(200).json({
			message: "successfully create",
			employee: employeeView.render(newEmployee),
		});
	};
	async update(req: Request, res: Response) {
		const { id } = req.params;
		const { fullname, email, phone, role } = req.body;

		const propertySchema = Yup.object().shape({
			fullname: Yup.string().required(),
			email: Yup.string().email().required(),
			phone: Yup.string().required(),
			role: Yup.string().required(),
		});
		await propertySchema.validate(
			{
				fullname, email, phone, role
			},
			{ abortEarly: false }
		);

		const repository = getCustomRepository(EmployeesRepository);
		const employee = await repository.findById(id);

		if (!employee) return res.json({message: "update fails"});

		employee.fullname = fullname;
		employee.email = email;
		employee.phone = phone;
		employee.role = role;
		employee.updatedAt = moment().utc().toDate();
		await repository.save(employee);

		const newEmployee = await repository.findById(employee.id);
		if (!newEmployee) return;

		const employeeView = new EmployeeView();
		return res.status(200).json({message: "successfully update", employee: employeeView.render(newEmployee)});
	};
}
