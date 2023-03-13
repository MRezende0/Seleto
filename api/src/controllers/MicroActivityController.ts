import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { MicroActivitiesRepository } from "../repositories/MicroActivitiesRepository";
import { MicroActivityView } from "../views/MicroActivityView";
import * as Yup from "yup";
import moment from "moment";

export class MicroActivityController {
	async list(req: Request, res: Response) {
		const { macroActivity } = req.params;

		const repository = getCustomRepository(MicroActivitiesRepository);
		const microActivity = await repository.findByProject(macroActivity);

		const microActivityView = new MicroActivityView();
		return res.status(200).json({message: "successfully list", microActivities: microActivityView.renderMany(microActivity)});
	}
	async find(req: Request, res: Response) {
		const { id } = req.params;

		const repository = getCustomRepository(MicroActivitiesRepository);
		const microActivity = await repository.findById(id);

		if (!microActivity) return res.json({message: "find fails"});

		const microActivityView = new MicroActivityView();
		return res.status(200).json({message: "successfully find", microActivity: microActivityView.render(microActivity)});
	}
	async create(req: Request, res: Response) {
		const { macroActivity } = req.params;
		const { name, startDate, endDate, description } = req.body;

		const propertySchema = Yup.object().shape({
			name: Yup.string().required(),
			startDate: Yup.date().required(),
			endDate: Yup.date().required(),
			description: Yup.string(),
		});
		await propertySchema.validate(
			{
				name,
				startDate,
				endDate,
				description,
			},
			{ abortEarly: false }
		);

		const repository = getCustomRepository(MicroActivitiesRepository);
		const microActivity = repository.create({
			name,
			startDate,
			endDate,
			description,
			macroActivity,
		});
		repository.save(microActivity);

		const microActivityView = new MicroActivityView();
		return res.status(200).json({message: "successfully create", microActivity: microActivityView.render(microActivity)});
	}
	async update(req: Request, res: Response) {
		const { id } = req.params;
		const { name, startDate, endDate, description } = req.body;

		const propertySchema = Yup.object().shape({
			name: Yup.string().required(),
			startDate: Yup.date().required(),
			endDate: Yup.date(),
			description: Yup.string().required(),
		});
		await propertySchema.validate(
			{
				name,
				startDate,
				endDate,
				description,
			},
			{ abortEarly: false }
		);

		const repository = getCustomRepository(MicroActivitiesRepository);
		const microActivity = await repository.findById(id);

		if (!microActivity) return res.json({message: "update fails"});

		microActivity.name = name;
		microActivity.startDate = startDate;
		microActivity.endDate = endDate;
		microActivity.description = description;
		microActivity.updatedAt = moment().utc().toDate();
		repository.save(microActivity);

		const microActivityView = new MicroActivityView();
		return res.status(200).json({message: "successfully update", microActivity: microActivityView.render(microActivity)});
	}
	async delete(req: Request, res: Response) {
		const { id } = req.params;

		const repository = getCustomRepository(MicroActivitiesRepository);
		const microActivity = await repository.findById(id);

		if (!microActivity) return res.json({message: "delete fails"});
		
		microActivity.isDeleted = true;
		microActivity.updatedAt = moment().utc().toDate();
		repository.save(microActivity);

		const microActivityView = new MicroActivityView();
		return res.status(200).json({message: "successfully delete", microActivity: microActivityView.render(microActivity)});
	}
}
