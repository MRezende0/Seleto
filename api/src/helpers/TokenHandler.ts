require("dotenv").config();

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Employee } from "../models/Employee";
import { User } from "../models/User";

const tokenHandler = () => {
	function validade(token: string) {
		return jwt.verify(token, process.env.SECRET || "SECRET", function(err, decoded) {
			if (err) false;
			return decoded;
		});
	}

	return {
		createEmployee(employee: Employee) {
			return jwt.sign(
				{ id: employee.id, fullname: employee.fullname, type: employee.role },
				process.env.SECRET || "SECRET"
				//{ expiresIn: "1d" }
			);
		},
		createUser(user: User) {
			return jwt.sign(
				{ id: user.id, fullname: user.fullname, type: "Proprietário" },
				process.env.SECRET || "SECRET"
				//{ expiresIn: "1d" }
			);
		},
		refresh(token: string) {},
		middleware(req: Request, res: Response, next: NextFunction) {
			const token = req.headers.authorization;

			if (!token) {
				return res.json({
					message: "Authorization fails",
					errors: { token: ["empty token"] },
				});
			}

			const decoded = (validade(token) as UserToken | undefined);

			if (!decoded) {
				return res.json({
					message: "Authorization fails",
					errors: { token: ["invalid token"] },
				});
			}

			req.auth = decoded;
			return next();
		},
	};
};

export { tokenHandler };
