import { Request, Response } from "express";
import * as jobsModel from "../models/jobs.model";


const viewAll = async (req: Request, res: Response) : Promise<void> => {

    const query = req.query;
    const userID = query.userID.length

    try {

        let jobResults = (await jobsModel.viewAll(userID));
        const count = jobResults.length;
        res.status(200).send({"jobs": jobResults, "count": count});

    } catch (err) {
        Logger.error('FUCK YOU');
        return;
    }

}