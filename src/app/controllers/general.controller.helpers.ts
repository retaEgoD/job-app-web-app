import Logger from "../../config/logger";
import { Request, Response } from "express";
import { getIdByAuth } from "../models/users.model.helpers";
import Ajv from 'ajv';

const ajv = new Ajv({removeAdditional: 'all', strict: false});


const validate = async (schema: object, data: any) => {

    try {

        const validator = ajv.compile(schema);
        const valid = await validator(data);
        if (!valid)
            return ajv.errorsText(validator.errors);
        return true;

    } catch (err) {
        return (err as Error).message;
    }

}


const sendStatus = async (res: Response, statusCode: number, message: string, data?: any): Promise<void> => {

    Logger.error(`Response ${statusCode}: ${message}.`);
    res.statusMessage = message;

    if (typeof data !== 'undefined') {
        res.status(statusCode).send(data);
    } else {
        res.status(statusCode).send();
    }
}


const sendError = async (res: Response, errorCode: number, errorMessage: string): Promise<void> => {

    Logger.error(`Error response ${errorCode}: ${errorMessage}.`);
    res.statusMessage = errorMessage;
    res.status(errorCode).send();

}

const sendInternalError = async (res: Response, err: Error): Promise<void> => {
    
    Logger.error(`Internal server error 500: ${err.message}.`);
    res.statusMessage = "Internal server error";
    res.status(500).send();

}


const checkJSON = async (schema: object, data: any, res: Response): Promise<boolean> => {

    if (!await validate(schema, data)) {
        await sendError(res, 400, "Bad response. Invalid information.");
        return false;
    }
    return true;
    
}


const checkAuth = async (req: Request): Promise<boolean> => {

    const auth = req.get('X-Authorisation');
    if (await getIdByAuth(auth) === -1) {
        return false;
    }
    return true;
}



export { validate, sendStatus, sendError, sendInternalError, checkJSON, checkAuth }