import express from 'express';
import {
    getMediaList,
    createMedia,
    updateMedia,
    deleteMedia
} from '../controllers/mediaController.js';

const router = express.Router();

router.get('/', getMediaList);
router.post('/', createMedia);
router.put('/:id', updateMedia);
router.delete('/:id', deleteMedia);

export default router;