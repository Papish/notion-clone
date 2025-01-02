import db from "../config/database";

export const userService = {
  createUser: ({
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
  },

  findUserByEmail: (email: string) => {
    return db.user.findUnique({ where: { email } });
  },

  findUserById: (id: number) => {
    return db.user.findUnique({ where: { id } });
  },
};
