import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { MachinesRepository } from "../repositories/MachinesRepository";
import { MachinesTypesRepository } from "../repositories/MachinesTypesRepository";
import { MachineView } from "../views/MachineView";
import { MachineTypeView } from "../views/MachineTypeView";
import * as Yup from "yup";
import moment from "moment";

export class MachinesController {
	async listTypes(req: Request, res: Response) {
		const machinesTypesRepository = getCustomRepository(
			MachinesTypesRepository
		);
		const machinesTypes = await machinesTypesRepository.find();

		const machineTypeView = new MachineTypeView();
		return res
			.status(200)
			.json({
				message: "successfully list",
				machinesTypes: machineTypeView.renderMany(machinesTypes),
			});
	}
	async list(req: Request, res: Response) {
		const { property } = req.params;

		const machinesRepository = getCustomRepository(MachinesRepository);
		const machines = await machinesRepository.findByProperty(property);

		const machineView = new MachineView();
		return res
			.status(200)
			.json({
				message: "successfully list",
				machines: machineView.renderMany(machines),
			});
	}
	async create(req: Request, res: Response) {
		const { property } = req.params;
		const { model, year, type, number } = req.body;

		const propertySchema = Yup.object().shape({
			model: Yup.string().required(),
			year: Yup.number().required(),
			type: Yup.string().required(),
			number: Yup.number().required(),
		});
		await propertySchema.validate(
			{
				model,
				year,
				type,
				number,
			},
			{ abortEarly: false }
		);

		const repository = getCustomRepository(MachinesRepository);
		const machines = repository.create({
			model,
			year,
			type,
			property,
			number,
		});
		await repository.save(machines);

		const newMachine = await repository.findById(machines.id);
		if (!newMachine) return;

		const machineView = new MachineView();
		return res
			.status(200)
			.json({
				message: "successfully create",
				machines: machineView.render(newMachine),
			});
	}
	async update(req: Request, res: Response) {
		const { id } = req.params;
		const { model, year, type, number } = req.body;

		const propertySchema = Yup.object().shape({
			model: Yup.string().required(),
			year: Yup.number().required(),
			type: Yup.string().required(),
			number: Yup.number().required(),
		});
		await propertySchema.validate(
			{
				model,
				year,
				type,
				number,
			},
			{ abortEarly: false }
		);

		const repository = getCustomRepository(MachinesRepository);
		const machine = await repository.findById(id);

		if (!machine) return res.json({ message: "update fails" });

		machine.model = model;
		machine.year = year;
		machine.type = type;
		machine.number = number;
		machine.updatedAt = moment().utc().toDate();
		await repository.save(machine);

		const newMachine = await repository.findById(machine.id);
		if (!newMachine) return;

		const machineView = new MachineView();
		return res
			.status(200)
			.json({
				message: "successfully update",
				machine: machineView.render(newMachine),
			});
	}
}
