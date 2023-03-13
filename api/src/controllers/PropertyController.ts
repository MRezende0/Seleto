import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { PropertiesRepository } from "../repositories/PropertiesRepository";
import { PropertyView } from "../views/PropertyView";
import * as Yup from "yup";

export class PropertyController {
	async list(req: Request, res: Response) {
		const auth = req.auth;

		const propertiesRepository = getCustomRepository(PropertiesRepository);
		const properties = await propertiesRepository.findByUserId(auth.id);

		const propertyView = new PropertyView();
		return res.status(200).json({
			message: "successfully list",
			properties: propertyView.renderMany(properties),
		});
	}
	async create(req: Request, res: Response) {
		const auth = req.auth;
		const { name, area, cep, cepNumber, cepComplement } = req.body;

		const propertySchema = Yup.object().shape({
			name: Yup.string().required(),
			area: Yup.number(),
			cep: Yup.string().required(),
			cepNumber: Yup.number().required(),
			cepComplement: Yup.string(),
		});
		await propertySchema.validate(
			{
				name,
				area,
				cep,
				cepNumber,
				cepComplement,
			},
			{ abortEarly: false }
		);

		const repository = getCustomRepository(PropertiesRepository);
		const property = repository.create({
			name,
			user: auth.id,
			area,
			cep,
			cepNumber,
			cepComplement,
		});
		await repository.save(property);

		const newProperty = await repository.findById(property.id);
		if (!newProperty) return;

		const propertyView = new PropertyView();
		return res
			.status(200)
			.json({
				message: "successfully create",
				property: propertyView.render(newProperty),
			});
	}
}
