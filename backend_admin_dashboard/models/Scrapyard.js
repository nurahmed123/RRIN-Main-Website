import { Schema, models, model } from "mongoose";

const ScrapyardSchema = new Schema({
    image: { type: String },
    name: { type: String },
    url: { type: String },
    time: { type: String },
    event: { type: String },
    type: { type: String },
}, {
    timestamps: true
});


export const Scrapyard = models.Scrapyard || model('Scrapyard', ScrapyardSchema, 'Scrapyard');

