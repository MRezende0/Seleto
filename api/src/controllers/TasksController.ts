require("dotenv").config();

import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { TasksRepository } from "../repositories/TasksRepository";
import * as Yup from "yup";
import { TaskView } from "../views/TaskView";
import moment from "moment";

export class TasksController {
	async list(req: Request, res: Response) {
		const { employee } = req.params;

		const tasksRepository = getCustomRepository(TasksRepository);
		const tasks = await tasksRepository.find();

		const tasksView = new TaskView();
		return res.status(200).json({message: "successfully list", tasks: tasksView.renderMany(tasks)});
	}
	async find(req: Request, res: Response) {
		const { id } = req.params;

		const tasksRepository = getCustomRepository(TasksRepository);
		const task = await tasksRepository.findById(id);

		if (!task) return res.json({message: "find fails"});

		const tasksView = new TaskView();
		return res.status(200).json({message: "successfully find", task: tasksView.render(task)});
	}
	async create(req: Request, res: Response) {
		const { employee } = req.params;
		const { name, description, expectedEndDate, status } = req.body;

		const taskSchema = Yup.object().shape({
			name: Yup.string().required(),
			description: Yup.string().required(),
			expectedEndDate: Yup.date().required(),
			status: Yup.string().required(),
		});
		await taskSchema.validate(
			{
				name,
				description,
				expectedEndDate,
				status,
			},
			{ abortEarly: false }
		);

		const repository = getCustomRepository(TasksRepository);
		const task = repository.create({
			name,
			description,
			expectedEndDate,
			status,
			employee,
		});
		repository.save(task);

		const tasksView = new TaskView();
		return res.status(200).json({message: "successfully create", task: tasksView.render(task)});
	}
	async update(req: Request, res: Response) {
		const { id } = req.params;
		const { name, description, endDate, expectedEndDate, status } = req.body;

		const propertySchema = Yup.object().shape({
			name: Yup.string().required(),
			startDate: Yup.date().required(),
			endDate: Yup.date(),
			expectedEndDate: Yup.date().required(),
			type: Yup.string().required(),
		});
		await propertySchema.validate(
			{
				name,
				description,
				endDate,
				expectedEndDate,
				status,
			},
			{ abortEarly: false }
		);

		const repository = getCustomRepository(TasksRepository);
		const task = await repository.findById(id);

		if (!task) return res.json({message: "update fails"});

		task.name = name;
		task.description = description;
		task.endDate = endDate;
		task.expectedEndDate = expectedEndDate;
		task.status = status;
		task.updatedAt = moment().utc().toDate();
		repository.save(task);

		const taskView = new TaskView();
		return res.status(200).json({message: "successfully update", task: taskView.render(task)});
	}
	async delete(req: Request, res: Response) {
		const { id } = req.params;

		const repository = getCustomRepository(TasksRepository);
		const task = await repository.findById(id);

		if (!task) return res.json({message: "delete fails"});
		
		task.isDeleted = true;
		task.updatedAt = moment().utc().toDate();
		repository.save(task);

		const taskView = new TaskView();
		return res.status(200).json({message: "successfully delete", task: taskView.render(task)});
	}
}
