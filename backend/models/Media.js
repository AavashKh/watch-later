import mongoose from 'express';

const mediaSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        type: {
            type: String,
            required: true,
            enum:['Movie', 'Show', 'Anime'],
            default: 'Movie',
        },
        posterUrl: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            required: true,
            enum:['Completed', 'Watching', 'Plan to Watch', 'Dropped'],
            default: 'Plan to Watch',
        },
        rating: {
            type: Number,
            min: 0,
            max: 10,
            default: null,
        },
        review: {
            type: String,
            trim: true,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Media', mediaSchema);