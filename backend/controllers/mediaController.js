import Media from '../models/Media.js';

// Get all watch list items
export const getMediaList = async (req, res) => {
    try {
        const { status, type } = req.query;
        const filter = {};

        if (status) filter.status = status;
        if (type) filter.type = type;

        const items = await Media.find(filter).sort({ updatedAt: -1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Adding a movie
export const createMedia = async (req, res) => {
    try {
        const newMedia = new Media(req.body);
        const savedMedia = await newMedia.save();
        res.status(201).json(savedMedia);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update status/rating/review
export const updateMeida = async(req, res) => {
    try {
        const { id } = req.params;
        const updatedMedia = await Media.findByIdAndUpdate(id, req.body, { 
            new: true,
            runValidators: true,
        });

        if (!updatedMedia) {
            return res.status(404).json({ message: 'Media not found' });
        }

        res.status(200).json(updatedMedia);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a media entry
export const deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Media.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ error: 'Media entry not found' });
        }

        res.status(200).json({ message: 'Media entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};