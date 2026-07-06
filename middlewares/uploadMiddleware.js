const multer = require("multer");
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

/**
 * ======================================================
 * Type Prefix Mapping
 * ======================================================
 */

const typeMappings = {
    ictClerk: "ICT-Clerk",
    ictLab: "ICT-Lab",
    ictStore: "ICT-Store",
    ictInternet: "ICT-Internet",
    ictSoftware: "ICT-Software",
    others: "Others"
};

/**
 * ======================================================
 * Allowed File Extensions
 * ======================================================
 */

const allowedExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx"
];

/**
 * ======================================================
 * Allowed MIME Types
 * ======================================================
 */

const allowedMimeTypes = [

    // Images
    "image/jpeg",
    "image/png",

    // PDF
    "application/pdf",

    // Word
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    // Excel
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    // PowerPoint
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"

];

/**
 * ======================================================
 * Multer Storage
 * ======================================================
 */

const storage = multer.diskStorage({

    destination: async (req, file, cb) => {

        try {

            const type = req.body.type || req.query.type || "others";

            const section = typeMappings[type] || "others";

            // Today's Date (DD-MM-YYYY)
            const now = new Date();

            const day = String(now.getDate()).padStart(2, "0");
            const month = String(now.getMonth() + 1).padStart(2, "0");
            const year = now.getFullYear();

            const today = `${day}-${month}-${year}`;

            // Extension Folder
            const extension = path
                .extname(file.originalname)
                .replace(".", "")
                .toLowerCase();

            const uploadPath = path.join(
                process.cwd(),
                "uploads",
                "files",
                section,
                today,
                extension
            );

            // Create folders asynchronously
            await fs.mkdir(uploadPath, {
                recursive: true
            });

            cb(null, uploadPath);

        } catch (error) {

            cb(error);

        }

    },

    filename: (req, file, cb) => {

        try {

            const extension = path.extname(file.originalname).toLowerCase();

            // Original filename without extension
            const originalName = path.basename(file.originalname, extension);

            // Optional: remove unsafe characters
            const safeName = originalName
                .trim()
                .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
                .replace(/\s+/g, "_");

            // Final filename
            const filename = `${safeName}_${nanoid(10)}${extension}`;

            cb(null, filename);

        } catch (error) {

            cb(error);

        }

    }

});

/**
 * ======================================================
 * File Filter
 * ======================================================
 */

const fileFilter = (req, file, cb) => {

    const extension = path
        .extname(file.originalname)
        .toLowerCase();

    const validExtension = allowedExtensions.includes(extension);

    const validMimeType = allowedMimeTypes.includes(file.mimetype);

    if (validExtension && validMimeType) {

        return cb(null, true);

    }

    cb(
        new Error(
            "Only JPG, JPEG, PNG, PDF, DOC, DOCX, XLS, XLSX, PPT and PPTX files are allowed."
        )
    );

};

/**
 * ======================================================
 * Multer Configuration
 * ======================================================
 */

const upload = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 20 * 1024 * 1024 // 20 MB
    }

});

/**
 * ======================================================
 * Export
 * ======================================================
 */

module.exports = upload;





// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");
// const { nanoid } = require("nanoid");

// /**
//  * ======================================================
//  * Type Prefix Mapping
//  * ======================================================
//  */

// const typeMappings = {
//     ictClerk: "ICT-Clerk",
//     ictLab: "ICT-Lab",
//     ictStore: "ICT-Store",
//     ictInternet: "ICT-Internet",
//     ictSoftware: "ICT-Software",
// };

// /**
//  * ======================================================
//  * Allowed File Extensions
//  * ======================================================
//  */

// const allowedExtensions = [
//     ".jpg",
//     ".jpeg",
//     ".png",
//     ".pdf",
//     ".doc",
//     ".docx",
//     ".xls",
//     ".xlsx",
//     ".ppt",
//     ".pptx"
// ];

// /**
//  * ======================================================
//  * Allowed MIME Types
//  * ======================================================
//  */

// const allowedMimeTypes = [
//     // Images
//     "image/jpeg",
//     "image/png",

//     // PDF
//     "application/pdf",

//     // Word
//     "application/msword",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

//     // Excel
//     "application/vnd.ms-excel",
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

//     // PowerPoint
//     "application/vnd.ms-powerpoint",
//     "application/vnd.openxmlformats-officedocument.presentationml.presentation"
// ];

// /**
//  * ======================================================
//  * Multer Storage Configuration
//  * ======================================================
//  */

// const storage = multer.diskStorage({

//     destination(req, file, cb) {

//         try {

//             const type = req.body.type || req.query.type || "others";

//             const uploadPath = path.join(
//                 process.cwd(),
//                 "uploads",
//                 "files",
//                 type
//             );

//             // Create folder if not exists
//             fs.mkdirSync(uploadPath, {
//                 recursive: true
//             });

//             cb(null, uploadPath);

//         } catch (error) {
//             cb(error);
//         }

//     },

//     filename(req, file, cb) {

//         try {

//             const type = req.body.type || req.query.type || "others";

//             const prefix = typeMappings[type] || "file";

//             const extension = path.extname(file.originalname).toLowerCase();

//             const filename = `${prefix}-${nanoid(10)}${extension}`;

//             cb(null, filename);

//         } catch (error) {
//             cb(error);
//         }

//     }

// });

// /**
//  * ======================================================
//  * File Filter
//  * ======================================================
//  */

// const fileFilter = (req, file, cb) => {

//     const extension = path.extname(file.originalname).toLowerCase();

//     const validExtension = allowedExtensions.includes(extension);

//     const validMimeType = allowedMimeTypes.includes(file.mimetype);

//     if (validExtension && validMimeType) {
//         return cb(null, true);
//     }

//     cb(
//         new Error(
//             "Only JPG, JPEG, PNG, PDF, DOC, DOCX, XLS, XLSX, PPT and PPTX files are allowed."
//         )
//     );

// };

// /**
//  * ======================================================
//  * Multer Configuration
//  * ======================================================
//  */

// const upload = multer({

//     storage,

//     fileFilter,

//     limits: {
//         fileSize: 20 * 1024 * 1024 // 20 MB
//     }

// });

// /**
//  * ======================================================
//  * Export
//  * ======================================================
//  */

// module.exports = upload;

// filename: (req, file, cb) => {

//     try {

//         const type = req.body.type || req.query.type || "others";

//         const prefix = typeMappings[type] || "file";

//         const extension = path
//             .extname(file.originalname)
//             .toLowerCase();

//         const filename = `${prefix}-${nanoid(10)}${extension}`;

//         cb(null, filename);

//     } catch (error) {

//         cb(error);

//     }

// }