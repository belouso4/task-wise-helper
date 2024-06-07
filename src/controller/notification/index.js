import { Markup, Scenes } from 'telegraf'
import moment from 'moment';

import { repeat } from '../../utils/consts.js';
import { notificationMainInfo } from './helpers.js';
import { editKeyboard } from './keyboards.js';
import Notification from '../../models/Notification.js';

const notificationScene = new Scenes.BaseScene('notification-scene')

notificationScene.enter(async (ctx) => await notificationMainInfo(ctx));
notificationScene.action('add', async (ctx) => ctx.scene.enter('add-notification-wizard'))
notificationScene.action('deletes', async (ctx) => ctx.scene.enter('delete-notification-wizard'))

const notiifyRegex = /^notiify_(.+)$/i;
notificationScene.action(notiifyRegex, async (ctx) => {
    const key = ctx.callbackQuery.data.split('_')[1]
    ctx.session.changeNotifyId = key
    const { message, expires_at } = await Notification.findById(key);
    const formattedDate = moment.unix(expires_at / 1000).format('DD.MM.YYYY HH:mm');

    await ctx.editMessageText(`*Сообщение*: ${message}\n\n*Дата:* ${formattedDate} 🔔`, {
        ...editKeyboard,
        parse_mode: 'Markdown',
    })
})

notificationScene.action('changeDate', async (ctx) =>
    ctx.scene.enter('change-date-notification-wizard', { key: ctx.session.changeNotifyId }))

notificationScene.action('changeTextNotify', async (ctx) =>
    ctx.scene.enter('edit-text-notification-scene', { key: ctx.session.changeNotifyId }))

notificationScene.action('delete', async (ctx) => {
    const key = ctx.session.changeNotifyId
    await Notification.findByIdAndDelete(key);
    await ctx.editMessageText('✅ Уведомление удалено')
    await ctx.scene.leave()
})

notificationScene.action(Object.keys(repeat), async (ctx) => {
    const repeatName = ctx.callbackQuery.data
    const key = ctx.session.changeNotifyId
    await Notification.updateOne({ _id: key }, { repeat: repeatName })
    delete ctx.session.changeNotifyId
    await ctx.editMessageText('✅ Время повторения уведомление изменено ')
    await ctx.scene.leave()
})

notificationScene.action('changeRepeat', async (ctx) => {
    const key = ctx.session.changeNotifyId
    let button = []

    for (let key in repeat) {
        if (repeat.hasOwnProperty(key)) {
            button.push([Markup.button.callback(key, key)])
        }
    }

    await ctx.editMessageText(
        'Выберите через какое время повторять уведомление',
        Markup.inlineKeyboard(button)
    )
})

notificationScene.action('cancel', async (ctx) => await notificationMainInfo(ctx, true))

export default notificationScene