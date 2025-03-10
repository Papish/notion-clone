import { RequestHandler } from "express";
import { UserService } from "../services";
import { AuthVerificationError } from "../utils";
import path from "path";
import {
  updateProfileSchema,
  formatValidationError,
} from "../validations/profileValidation";
import { z } from "zod";

export const profile: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) throw new AuthVerificationError();

    const user = await UserService.findUserById(req.user.userId);
    const profile = await UserService.findProfileByUserId(req.user.userId);

    if (profile?.avatar) {
      profile.avatar = `${req.protocol}://${req.get("host")}/public/avatars/${path.basename(profile.avatar)}`;
    }

    res.status(200).json({ ...user, ...profile });
  } catch (err) {
    next(err);
  }
};

export const updateProfile: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) throw new AuthVerificationError();

    const userId = req.user.userId;

    // Validate request body
    const validatedData = updateProfileSchema.parse(req.body);

    const avatar = req.file ? req.file.path : undefined;

    const updatedProfile = await UserService.updateProfile(userId, {
      ...validatedData,
      avatar,
    });

    if (updatedProfile.avatar) {
      updatedProfile.avatar = `${req.protocol}://${req.get("host")}/public/avatars/${path.basename(updatedProfile.avatar)}`;
    }

    res.status(200).json(updatedProfile);
  } catch (err) {
    next(err);
  }
};
