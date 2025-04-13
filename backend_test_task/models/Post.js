import mongoose from 'mongoose';

/**
 * Схема поста для MongoDB
 * @typedef {Object} PostSchema
 * @property {string} title - Заголовок поста (обязательное поле)
 * @property {string} text - Текст поста (обязательное поле, уникальное)
 * @property {Array} [tags] - Теги поста (по умолчанию пустой массив)
 * @property {number} [viewsCount] - Количество просмотров (по умолчанию 0)
 * @property {mongoose.Schema.Types.ObjectId} user - ID автора поста (ссылка на модель User)
 * @property {string} [imageUrl] - URL изображения поста
 * @property {Date} createdAt - Дата создания (автоматически добавляется)
 * @property {Date} updatedAt - Дата обновления (автоматически добавляется)
 */
const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
            unique: true,
        },
        tags: {
            type: Array,
            default: [],
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        imageUrl: String,
    }, 
    {
        timestamps: true,
    },
);

/**
 * Модель поста
 * @typedef {Model<PostSchema>} PostModel
 * @exports Post
 */
export default mongoose.model('Post', PostSchema);