import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const timerSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    start_date: {
        type: String,
        required: true
    }
});

const Timer = mongoose.model('Timer', timerSchema);

export default Timer