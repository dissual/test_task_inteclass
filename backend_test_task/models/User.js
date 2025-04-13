import mongoose from 'mongoose';

/**
 * Схема пользователя для MongoDB
 * @typedef {Object} UserSchema
 * @property {string} fullName - Полное имя пользователя (обязательное поле)
 * @property {string} email - Email пользователя (обязательное поле, уникальное)
 * @property {string} passwordHash - Хеш пароля пользователя (обязательное поле)
 * @property {string} [avatarUrl] - URL аватара пользователя (необязательное поле)
 * @property {Date} createdAt - Дата создания (автоматически добавляется)
 * @property {Date} updatedAt - Дата обновления (автоматически добавляется)
 */
const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        avatarUrl: String,
    }, 
    {
        timestamps: true,
    },
);

/**
 * Модель пользователя
 * @typedef {Model<UserSchema>} UserModel
 * @exports User
 */
export default mongoose.model('User', UserSchema);