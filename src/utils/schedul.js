import 'dotenv/config'
import schedule from 'node-schedule';
import { notify } from '../controller/notification/helpers.js';

const scheduleBot = (bot) => {
    const scheduledTask = schedule.scheduleJob('* * * * *', async () => {
        await notify(bot)
    });
}

export default scheduleBot
