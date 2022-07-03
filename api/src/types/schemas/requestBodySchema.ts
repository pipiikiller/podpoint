import * as Joi from "joi";
import JoiDate from "@joi/date";

const JoiExte = Joi.extend(JoiDate);

export const startRequestSchema = JoiExte.object({
    started_at: JoiExte.date().format("YYYY-MM-DDTHH:mm:ss.sssZ").required(),
});

export const stopRequestSchema = JoiExte.object({
    finished_at: JoiExte.date().format("YYYY-MM-DDTHH:mm:ss.sssZ").required(),
});
