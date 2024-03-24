import { Request, Response } from "express";
import * as schemas from "../../../resources/schemas.json";
import * as usersModel from "../models/users.model";
import * as helpers from "./general.controller.helpers";
import { getUserIdByEmail, getUser, getIdByAuth } from "../models/users.model.helpers";
import { compare } from 'bcryptjs';


const register = async (req: Request, res: Response): Promise<void> => {

    try {

        const body = req.body;
        if (!helpers.checkJSON(schemas.user_register, body, res)) {
            return;
        }

        const result = await usersModel.register(body.username,
                                                 body.first_name,
                                                 body.last_name,
                                                 body.email,
                                                 body.password);
        helpers.sendStatus(res, 201, "User created.");
        return;

    } catch (err) {

        helpers.sendInternalError(res, err as Error);
        return;

    }

}


const login = async (req: Request, res: Response): Promise<void> => {
    
    try {

        const body = req.body;
        if (!helpers.checkJSON(schemas.user_login, body, res)) {
            return;
        }

        const userId = await getUserIdByEmail(body.email);

        if (userId === -1) {
            helpers.sendError(res, 401, "Not Authorised. Incorrect email/password.");
            return;
        }

        const user = await getUser(userId);
        if (!await compare(body.password, user.password)) {
            helpers.sendError(res, 401, "Not Authorised. Incorrect email/password.");
            return;
        }

        const auth = await usersModel.login(body.email, body.password);
        helpers.sendStatus(res, 200, "Successfully logged in.", 
                            {"user_id": userId, "auth_token": auth});
        return;

    } catch (err) {

        helpers.sendInternalError(res, err as Error)
        return;

    }

}


const logout = async (req: Request, res: Response): Promise<void> => {

    try {

        const auth = req.get('X-Authorisation');

        if (!(await helpers.checkAuth(req))) {
            await helpers.sendError(res, 401, "Not Authorised. Incorrect email/password.");
            return;
        }

        const userId = await getIdByAuth(auth);
        await usersModel.logout(userId);
        helpers.sendStatus(res, 201, "Successfully logged out.")
    } catch (err) {

        helpers.sendInternalError(res, err as Error)
        return;

    }

}


const getUser = async (req: Request, res: Response): Promise<void> => {

    try {

        const auth = req.get('X-Authorisation');
    }

}