import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { MacroActivitiesRepository } from "../repositories/MacroActivitiesRepository";
import { MacroActivityView } from "../views/MacroActivityView";
import * as Yup from "yup";
import moment from "moment";

export class MacroActivityController {
	async list(req: Request, res: Response) {
		const { project } = req.params;

		const repository = getCustomRepository(MacroActivitiesRepository);
		const macroActivity = await repository.findByProject(project);

		const macroActivityView = new MacroActivityView();
		return res.status(200).json({message: "successfully list", macrosActivities: macroActivityView.renderMany(macroActivity)});
	}
	async find(req: Request, res: Response) {
		const { id } = req.params;

		const repository = getCustomRepository(MacroActivitiesRepository);
		const macroActivity = await repository.findById(id);

		if (!macroActivity) return res.json({message: "find fails"});

		const macroActivityView = new MacroActivityView();
		return res.status(200).json({message: "successfully find", macroActivity: macroActivityView.render(macroActivity)});
	}
	async create(req: Request, res: Response) {
		const { project } = req.params;
		const { name, startDate, expectedEndDate, description } = req.body;

		const propertySchema = Yup.object().shape({
			name: Yup.string().required(),
			startDate: Yup.date().required(),
			expectedEndDate: Yup.date().required(),
			description: Yup.string(),
		});
		await propertySchema.validate(
			{
				name,
				startDate,
				expectedEndDate,
				description,
			},
			{ abortEarly: false }
		);

		const repository = getCustomRepository(MacroActivitiesRepository);
		const macroActivity = repository.create({
			name,
			startDate,
			expectedEndDate,
			description,
			project,
		});
		await repository.save(macroActivity);

		const newMacroActivity = await repository.findById(macroActivity.id);
		if (!newMacroActivity) return;

		const macroActivityView = new MacroActivityView();
		return res.status(200).json({message: "successfully create", macroActivity: macroActivityView.render(newMacroActivity)});
	}
	async update(req: Request, res: Response) {
		const { id } = req.params;
		const { name, startDate, endDate, expectedEndDate, description } = req.body;

		const propertySchema = Yup.object().shape({
			name: Yup.string().required(),
			startDate: Yup.date().required(),
			endDate: Yup.date(),
			expectedEndDate: Yup.date().required(),
			description: Yup.string().required(),
		});
		await propertySchema.validate(
			{
				name,
				startDate,
				endDate,
				expectedEndDate,
				description,
			},
			{ abortEarly: false }
		);

		const repository = getCustomRepository(MacroActivitiesRepository);
		const macroActivity = await repository.findById(id);

		if (!macroActivity) return res.json({message: "update fails"});

		macroActivity.name = name;
		macroActivity.startDate = startDate;
		macroActivity.endDate = endDate;
		macroActivity.expectedEndDate = expectedEndDate;
		macroActivity.description = description;
		macroActivity.updatedAt = moment().utc().toDate();
		repository.save(macroActivity);

		const macroActivityView = new MacroActivityView();
		return res.status(200).json({message: "successfully update", macroActivity: macroActivityView.render(macroActivity)});
	};
	async delete(req: Request, res: Response) {
		const { id } = req.params;

		const repository = getCustomRepository(MacroActivitiesRepository);
		const macroActivity = await repository.findById(id);

		if (!macroActivity) return res.json({message: "delete fails"});
		
		macroActivity.isDeleted = true;
		macroActivity.updatedAt = moment().utc().toDate();
		repository.save(macroActivity);

		const macroActivityView = new MacroActivityView();
		return res.status(200).json({message: "successfully delete", macroActivity: macroActivityView.render(macroActivity)});
	}
}
