interface UserToken {
	id: string,
	fullname: string,
	type: string,
}

declare namespace Express {
	export interface Request {
		auth: UserToken;
	}
}
