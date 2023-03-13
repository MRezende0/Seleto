import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ProjectsRepository } from "../repositories/ProjectsRepository";
import { ProjectTypeRepository } from "../repositories/ProjectTypeRepository"
import { ProjectView } from "../views/ProjectView";
import { ProjectTypeView } from "../views/ProjectTypeView";
import * as Yup from "yup";
import moment from "moment";

export class ProjectController { 
	async listTypes(req: Request, res: Response) {
		const projectTypeRepository = getCustomRepository(ProjectTypeRepository);
		const projectsTypes = await projectTypeRepository.find();

		const projectTypeView = new ProjectTypeView();
		return res.status(200).json({message: "successfully list", projectsTypes: projectTypeView.renderMany(projectsTypes)});
	};
	async list(req: Request, res: Response) {
		const { property } = req.params;

		const projectRepository = getCustomRepository(ProjectsRepository);
		const projects = await projectRepository.findByProperty(property);

		const projectView = new ProjectView();
		return res.status(200).json({message: "successfully list", projects: projectView.renderMany(projects)});
	}
	async find(req: Request, res: Response) {
		const { id } = req.params;

		const repository = getCustomRepository(ProjectsRepository);
		const project = await repository.findById(id);

		if (!project) return res.json({message: "find fails"});

		const projectView = new ProjectView();
		return res.status(200).json({message: "successfully find", project: projectView.render(project)});
	}
	async create(req: Request, res: Response) {
		const { property } = req.params;
		const { name, description, startDate, expectedEndDate, type } = req.body;

		const propertySchema = Yup.object().shape({
			name: Yup.string().required(),
			description: Yup.string().required(),
			startDate: Yup.date().required(),
			expectedEndDate: Yup.date().required(),
			type: Yup.string().required(),
		});
		await propertySchema.validate(
			{
				name,
				description,
				startDate,
				expectedEndDate,
				type,
			},
			{ abortEarly: false }
		);

		const repository = getCustomRepository(ProjectsRepository);
		const project = repository.create({
			name,
			description,
			startDate,
			expectedEndDate,
			type,
			property,
		});
		await repository.save(project);

		const newProject = await repository.findById(project.id);
		if (!newProject) return;

		const projectView = new ProjectView();
		return res.status(200).json({message: "successfully create", project: projectView.render(newProject)});
	}
	async update(req: Request, res: Response) {
		const { id } = req.params;
		const { name, startDate, endDate, expectedEndDate, type } = req.body;

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
				startDate,
				endDate,
				expectedEndDate,
				type,
			},
			{ abortEarly: false }
		);

		const repository = getCustomRepository(ProjectsRepository);
		const project = await repository.findById(id);

		if (!project) return res.json({message: "update fails"});

		project.name = name;
		project.startDate = startDate;
		project.endDate = endDate;
		project.expectedEndDate = expectedEndDate;
		project.type = type;
		project.updatedAt = moment().utc().toDate();
		repository.save(project);

		const projectView = new ProjectView();
		return res.status(200).json({message: "successfully update", project: projectView.render(project)});
	}
	async delete(req: Request, res: Response) {
		const { id } = req.params;

		const repository = getCustomRepository(ProjectsRepository);
		const project = await repository.findById(id);

		if (!project) return res.json({message: "delete fails"});
		
		project.isDeleted = true;
		project.updatedAt = moment().utc().toDate();
		repository.save(project);

		const projectView = new ProjectView();
		return res.status(200).json({message: "successfully delete", project: projectView.render(project)});
	}
}
