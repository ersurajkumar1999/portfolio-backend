const contactModel = require("../models/Contact");

const createContact = async (contact) => {
    return await contactModel.create(contact);
}
module.exports = {
    createContact,
}