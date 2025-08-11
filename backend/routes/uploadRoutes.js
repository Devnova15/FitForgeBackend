const express = require('express');
const router = express.Router();
const { upload, deleteFile } = require('../middleware/uploadMiddleware');

// Загрузка файлов
router.post('/upload', upload.array('files', 5), (req, res) => {
    try {
        const uploadedFiles = req.files.map(file => ({
            key: file.key,
            location: `${process.env.S3_BASE_URL}/${file.key}`,
            originalName: file.originalname
        }));
        res.status(200).json({ success: true, files: uploadedFiles });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Удаление файла
router.delete('/delete/:key', async (req, res) => {
    try {
        const { key } = req.params;
        if (!key) {
            return res.status(400).json({ success: false, error: 'Ключ файла не указан' });
        }
        await deleteFile(key);
        res.status(200).json({ success: true, message: 'Файл успешно удален' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;