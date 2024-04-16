// const router = require("express").Router();
// const { submitProposalRequest } = require("../controllers/HomeController");

// router.post('/send-proposal-request', submitProposalRequest);


// module.exports = router;

const router = require("express").Router();
const { submitProposalRequest } = require("../controllers/HomeController");
const multer = require("multer");





// const storage = multer.memoryStorage(); // Use memory storage
// const upload = multer({
//     // storage: storage,
//     dest: "uploads/",
//     limits: {
//         fileSize: 1024 * 1024 * 30, // 30MB limit (adjust as needed)
//     },
// });

// Set up multer for file uploads with memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 30, // 30MB limit (adjust as needed)
    },
});




// Set up multer for file uploads
// const upload = multer({ dest: "uploads/" }); // Adjust the destination folder as needed
router.post('/send-proposal-request', upload.single('file', 20), submitProposalRequest);

module.exports = router;
