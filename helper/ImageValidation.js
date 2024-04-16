// Function to check if file type is allowed
const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf', 'text/html', 'application/zip']; // Add more types if needed

const checkImageType = (mimetype) => {
    return allowedTypes.includes(mimetype);
};

module.exports = { checkImageType }
