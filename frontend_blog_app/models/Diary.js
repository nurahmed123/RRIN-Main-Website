const { Schema, models, model } = require("mongoose");

const DiarySchema = new Schema({
    userid: { type: String, required: true },
    username: { type: String },
    debitted: { type: String },
    creditted: { type: String },
    reason: { type: String },
    note: { type: String },
    cost: { type: String },
}, {
    timestamps: true // This option will automatically manage createdAt and updatedAt fields
});

export const Diary = models.Diary || model('Diary', DiarySchema, 'Diary');
