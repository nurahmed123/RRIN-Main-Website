const { Schema, models, model } = require("mongoose");

const DriveSchema = new Schema({
    url: { type: String, required: true },
    name: { type: String, required: true },
    size: { type: String },
}, {
    timestamps: true // This option will automatically manage createdAt and updatedAt fields
});

export const Drive = models.Drive || model('Drive', DriveSchema, 'Drive');
