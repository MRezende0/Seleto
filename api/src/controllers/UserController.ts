require("dotenv").config();

import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import * as Yup from "yup";
import { cpf, cnpj } from "cpf-cnpj-validator";
import cepPromise from "cep-promise";
import bcrypt from "bcrypt";
import { tokenHandler } from "../helpers/tokenHandler";

export class UserController {
	async create(req: Request, res: Response) {
		const {
			fullname,
			email,
			password,
			phone,
			birthday,
			cpfOrCnpj,
			cep,
			cepNumber,
			cepComplement,
		} = req.body;

		const repository = getCustomRepository(UsersRepository);

		const userSchema = Yup.object().shape({
			fullname: Yup.string().required(),
			email: Yup.string().email("invalid email").required(),
			password: Yup.string().required(),
			phone: Yup.string().required(),
			birthday: Yup.date(),
			cpfOrCnpj: Yup.string().test(
				"cpfOrCnpj",
				"invalid cpfOrCnpj",
				function (cpfOrCnpj) {
					if (cpfOrCnpj)
						return cpf.isValid(cpfOrCnpj) || cnpj.isValid(cpfOrCnpj);
					return true;
				}
			),
			cep: Yup.string().test("cep", "invalid cep", function (cepUser) {
				if (cepUser)
					return cepPromise(cepUser)
						.then(() => true)
						.catch(() => false);
				return true;
			}),
			cepNumber: Yup.number(),
			cepComplement: Yup.string(),
		});
		await userSchema.validate(
			{
				fullname,
				email,
				password,
				phone,
				birthday,
				cpfOrCnpj,
				cep,
				cepNumber,
				cepComplement,
			},
			{ abortEarly: false }
		);

		const errors: { email?: string; cpfOrCnpj?: string } = {};

		const isUserEmail = await repository.findByEmail(email);
		if (isUserEmail) errors.email = "email already in use";

		const isUserCpfOrCnpj = await repository.findByCpfOrCnpj(cpfOrCnpj);
		if (isUserCpfOrCnpj) errors.cpfOrCnpj = "cpfOrCnpj already in use";

		if (isUserEmail || isUserCpfOrCnpj) {
			return res.json({ message: "create fails", errors });
		}

		const hash = await bcrypt.hash(password, 10);
		const user = repository.create({
			fullname,
			email,
			password: hash,
			phone,
			birthday,
			cpfOrCnpj,
			cep,
			cepNumber,
			cepComplement,
		});
		repository.save(user);

		const token = tokenHandler().createUser(user);
		return res.json({ message: "successfully create", token });
	}
	async login(req: Request, res: Response) {
		const { email, password } = req.body;

		const repository = getCustomRepository(UsersRepository);

		const userSchema = Yup.object().shape({
			email: Yup.string().email("invalid email").required(),
			password: Yup.string().required(),
		});
		await userSchema.validate(
			{
				email,
				password,
			},
			{ abortEarly: false }
		);

		const user = await repository.findByEmail(email);
		if (!user)
			return res.json({
				message: "login fails",
				errors: {
					login: "Email or Password Invalid",
				},
			});

		const compare = await bcrypt.compare(password, user.password);
		if (!compare)
			return res.json({
				message: "login fails",
				errors: {
					login: "Email or Password Invalid",
				},
			});

		const token = tokenHandler().createUser(user);
		return res.json({ message: "successfully login", token });
	}
}
