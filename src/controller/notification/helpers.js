// import db from '../../db.js'
import moment from 'moment';
import { Markup } from 'telegraf'
import Notification from '../../models/Notification.js';
import { LIST_OF_ADMINS, repeat } from '../../utils/consts.js';

export const notificationMainInfo = async (ctx, edit = false, text = undefined) => {
    const notifications = await Notification.find();
    if (ctx.wizard) ctx.wizard.state.notifications = notifications
    let button = []

    for (const notif of notifications) {
        const formattedDate = moment.unix(notif.expires_at / 1000).format('DD-MM-YYYY HH:mm');
        button.push([Markup.button.callback(`${truncate(notif.message, 20)} | ${formattedDate}`, 'notiify_' + notif._id)])
    }

    button.push([
        Markup.button.callback('Добавить', 'add'),
        Markup.button.callback('Удалить', 'deletes')
    ])

    text ??= 'Нажмите на уведомление чтобы изменить его. \n\nтекст уведомления | дата уведомления'
    const btns = Markup.inlineKeyboard(button)

    return await edit
        ? ctx.editMessageText(text, btns)
        : ctx.reply(text, btns)
}

// YYYY-MM-DD HH:mm
export function parseDateString(dateString) {
    const parts = dateString.split(/[\s:.]/);

    // Извлекаем часы, минуты, день, месяц, год из массива
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const hours = parseInt(parts[3], 10);
    const minutes = parseInt(parts[4], 10);

    const date = new Date(year, month, day, hours, minutes);
    return date.getTime();
}

export async function notify(bot) {
    const currentDateTime = Date.now();
    const notifications = await Notification.find({ expires_at: { $lt: currentDateTime } });

    notifications.forEach(async (notification) => {
        const interval = repeat[notification.repeat];
        const nextNotificationTime = new Date(currentDateTime + interval);
        await Notification.updateOne({ _id: notification._id }, { expires_at: nextNotificationTime.getTime() });

        for (const user_id of LIST_OF_ADMINS) {
            try {
                await bot.telegram.sendMessage(user_id, `🔔 ${notification.message} 🔔`);
            } catch (error) { }
        }
    });
}

function truncate(str, maxLen) {
    return str.length > maxLen ? str.slice(0, maxLen - 3).trim() + '...' : str;
}

