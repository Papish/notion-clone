import db from "../configs/database";

export const registerUser = async ({
  email,
  password,
  firstName,
  lastName,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const user = await db.user.create({
    data: {
      email,
      password,
    },
  });

  await db.profile.create({
    data: {
      firstName,
      lastName,
      userId: user.id,
    },
  });

  return user;
};

export const findUserByEmail = (email: string) => {
  return db.user.findUnique({
    where: {
      email,
    },
  });
};

export const findUserById = (id: string) => {
  return db.user.findUnique({
    where: {
      id,
    },
    select: {
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const updateProfile = async (userId: string, data: {
  firstName?: string;
  lastName?: string;
  bio?: string;
  address?: string;
  avatar?: string;
}) => {
  return db.profile.update({
    where: {
      userId,
    },
    data,
  });
};

export const findProfileByUserId = (userId: string) => {
  return db.profile.findUnique({
    where: {
      userId,
    },
  });
};
