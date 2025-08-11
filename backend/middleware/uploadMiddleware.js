const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// Конфигурация AWS
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.S3_BUCKET_NAME,
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, {
                fieldName: file.fieldname,
                uploadedAt: Date.now()
            });
        },
        key: (req, file, cb) => {
            const timestamp = Date.now();
            const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
            const fileName = `posts/${timestamp}-${safeName}`;
            cb(null, fileName);
        }
    }),
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 5
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Разрешены только изображения (JPEG, PNG, GIF)'), false);
        }
    }
});

const deleteFile = async (key) => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key
    };

    try {
        await s3.deleteObject(params).promise();
        return { success: true };
    } catch (error) {
        throw new Error(`Ошибка при удалении файла: ${error.message}`);
    }
};

module.exports = { upload, deleteFile };