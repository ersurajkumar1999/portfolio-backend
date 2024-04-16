const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    subject: {
        type: String,
        trim: true,
        required: true,
    },
    content: {
        type: String,
        trim: true,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    fileId: {
        type: String,
        default: null,
    },
    fileType: {
        type: String,
        default: null,
    },
    content: {
        type: String,
        trim: true,
        required: true,
    },
    imageUrl: {
        type: String,
        default: null,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    closed: {
        type: Date,
        trim: true,
        default: null,
    },
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);
