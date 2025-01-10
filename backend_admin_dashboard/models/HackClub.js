const { Schema, models, model } = require("mongoose");

const HackClubSchema = new Schema({
    name: { type: String },
    code: { type: String },
    os: { type: String, },
    system: { type: String, },
    release: { type: String, },
    count: { type: Number, },
}, {
    timestamps: true // This option will automatically manage createdAt and updatedAt fields
});

export const HackClub = models.HackClub || model('HackClub', HackClubSchema, 'HackClub');
