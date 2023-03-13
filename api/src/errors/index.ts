import { ErrorRequestHandler } from "express";
import { ValidationError } from "yup";

interface ValidationsErrors {
	[key: string]: Array<string> | undefined;
}

const handlerError: ErrorRequestHandler = (error, req, res, next) => {
	if(error instanceof ValidationError) {
		let errors: ValidationsErrors = {};

		error.inner.forEach((err, index) => {
			console.log(err)
			errors[err.type || err.path || index] = err.errors;
		});
		
		return res.status(400).json({ message: 'validation fails', errors });
	}

	console.log(error);
	return res.status(500).json({ message: 'internal server error' });
};

export { handlerError };
