const validator = require('validator');
const { errorResponseMessage, successResponseMessage } = require("../helper/ResponseMessage");
const { createContact } = require("../services/ContactService");
const { checkImageType } = require('../helper/ImageValidation');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const { promisify } = require('util');

const submitProposalRequest = async (req, res) => {
    const { name, email, subject, content } = req.body;
    try {
        if (!name || name.length < 3) {
            return errorResponseMessage(res, "Full Name must be at least 3 characters long");
        }
        if (validator.isEmpty(email)) {
            return errorResponseMessage(res, "Email field is required");
        } else if (!validator.isEmail(email)) {
            return errorResponseMessage(res, "Invalid email address");
        }
        if (!subject || subject.length < 3) {
            return errorResponseMessage(res, "Subject must be at least 3 characters long");
        }
        if (!content || content.length < 3) {
            return errorResponseMessage(res, "Content must be at least 3 characters long");
        }

        var imageResponse = null;
        if (req.file) {
            if (checkImageType(req.file.mimetype)) {
                console.log("req.file", req.file);
                const writeFileAsync = promisify(fs.writeFile);
                const tempFilePath = `temp_${Date.now()}_${req.file.originalname}`;
                await writeFileAsync(tempFilePath, req.file.buffer);
                const options = {
                    use_filename: true,
                    unique_filename: false,
                    folder: 'public/',
                    overwrite: false,
                    resource_type: 'raw'
                };
                imageResponse = await cloudinary.uploader.upload(tempFilePath, options);
                fs.unlinkSync(tempFilePath);
            }
        }
        const contact = await createContact({
            name,
            email,
            subject,
            content,
            fileId: imageResponse?.asset_id ?? null,
            fileType: req?.file?.mimetype ?? null,
            imageUrl: imageResponse?.secure_url ?? null // Save the Cloudinary image URL in your database
        });


        // const contact = await createContact({ name, email, subject, content });
        return successResponseMessage(res, "User created successfully!", contact);
    } catch (error) {
        console.log("error==>", error);
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
module.exports = { submitProposalRequest }