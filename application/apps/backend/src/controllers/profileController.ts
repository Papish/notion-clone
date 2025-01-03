import { NextFunction, Request, Response } from 'express';

export const profile = (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        console.log('auth token: ', req.user);

        res.status(200).json({
            user: 'test',
        });
    } catch (err) {
        next(err);
    }
};
