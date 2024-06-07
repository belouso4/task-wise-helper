import { Telegraf, session, Markup, Scenes } from 'telegraf'

import { parseDateString, notificationMainInfo } from '../helpers.js';
import moment from 'moment';
import Notification from '../../../models/Notification.js';

const notiifyRegex = /^notiify_(.+)$/i;

export const notificationDeleteWizard = new Scenes.WizardScene(
  'delete-notification-wizard', // first argument is Scene_ID, same as for BaseScene
  async (ctx) => {
    const text = 'Для удаления кликните на уведомление, что хотите удалить и нажмите “Сохранить”'
    ctx.wizard.state.delete = []
    await notificationMainInfo(ctx, true, text)
    return await ctx.wizard.next();
  }
);

notificationDeleteWizard.action(notiifyRegex, async (ctx) => {
  const key = ctx.callbackQuery.data.split('_')[1]
  const notifications = ctx.wizard.state.notifications

  const index = ctx.wizard.state.delete.indexOf(key);
  index !== -1 ? ctx.wizard.state.delete.splice(index, 1) : ctx.wizard.state.delete.push(key);
  const deleteIds = ctx.wizard.state.delete

  let button = []

  for (const notif of notifications) {
    const formattedDate = moment.unix(notif.expires_at / 1000).format('DD-MM-YYYY HH:mm');
    if (!deleteIds.includes(notif.id))
      button.push([Markup.button.callback(`${notif.message} | ${formattedDate}`, 'notiify_' + notif.id)])
  }

  button.push([
    Markup.button.callback('Отмена', 'cancel'),
    Markup.button.callback('Сохранить', 'save')
  ])

  const text = 'Для удаления кликните на уведомление, что хотите удалить и нажмите “Сохранить”'
  const btns = Markup.inlineKeyboard(button)

  await ctx.editMessageText(text, btns)
  return await ctx.wizard.next();
})

notificationDeleteWizard.action('save', async (ctx) => {
  if (!ctx.wizard.state.delete.length) return ctx.answerCbQuery()

  await Notification.deleteMany({ _id: ctx.wizard.state.delete });

  await ctx.scene.leave()
  await ctx.editMessageText('✅ Уведомление Удалены')
})

notificationDeleteWizard.leave(async (ctx) => {
  delete ctx.wizard.state.notifications
  await ctx.answerCbQuery()
})
