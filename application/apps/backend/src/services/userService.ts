import db from "../configs/database";

export const createUser = ({ email, password, name }: { email: string; password: string; name: string }) => {
	return db.user.create({
		data: {
			email,
			password,
			name,
		},
	});
};

export const findUserByEmail = (email: string) => {
	return db.user.findUnique({ where: { email } });
};

export const findUserById = (id: number) => {
	return db.user.findUnique({ where: { id } });
};
