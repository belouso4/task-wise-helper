import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    expires_at: {
        type: String,
        required: true
    },
    repeat: {
        type: String,
        required: true
    }
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification