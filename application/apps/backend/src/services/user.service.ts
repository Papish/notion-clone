import db from "../config/database";

export const getUsers = () => {
  return db.user.findMany();
};

export const createUser = ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  return db.user.create({
    data: {
      email,
      password,
      name,
    },
  });
};

export const userExistByEmail = async (email: string) => {
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) return true;
  return false;
};
