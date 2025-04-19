const express = require('express');
const uploader = express.Router();
const imgsUploader = require('../controllers/imgsUploaderControllers');
const multer = require('multer');
const path = require("path");



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(__dirname, "..", "..", "src", "assets", "uploads");
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        // Nombrar archivo (agrega marca de tiempo para evitar duplicados)
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
      }
    });

    const upload = multer({storage});
uploader.post('/upload-img',  upload.single('file'), imgsUploader.uploadImg );

module.exports = uploader;