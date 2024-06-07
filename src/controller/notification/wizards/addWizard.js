import { Scenes } from 'telegraf'
import { parseDateString } from '../helpers.js';
import { cancelAndSaveKeyboard, notificationAddeKeyboard } from '../keyboards.js';
import Notification from '../../../models/Notification.js';
import { message } from 'telegraf/filters';

export const notificationAddWizard = new Scenes.WizardScene(
  'add-notification-wizard', // first argument is Scene_ID, same as for BaseScene
  async (ctx) => {
    ctx.wizard.state.data = []

    await ctx.editMessageText(
      'Введите текст уведомления и дату по очереди. \ndate | dd.mm.yyyy hh:mm\nmsg | text',
      notificationAddeKeyboard
    )
    return ctx.wizard.next();
  },
);

notificationAddWizard.on(message('text'), async (ctx) => {
  const [type, text] = ctx.message.text.split(' | ');

  switch (type) {
    case 'msg':
      ctx.wizard.state.data.msg = text
      break;
    case 'date':

      ctx.wizard.state.data.date = text
      break;
    default:
      ctx.reply('Неверный формат. Измените формат или покиньте сцену.', notificationAddeKeyboard);
  }

  if (ctx.wizard.state.data.date && ctx.wizard.state.data.msg) await ctx.reply(
    'Дата: ' + ctx.wizard.state.data.date +
    '\nMsg: ' + ctx.wizard.state.data.msg +
    '\n\n Данные введены корректно? Если да нажмите сохранить.',
    cancelAndSaveKeyboard
  )
})

notificationAddWizard.action('save', async (ctx) => {
  const { date, msg } = ctx.wizard.state.data

  await Notification.create({
    message: msg.trim(),
    expires_at: parseDateString(date.trim()),
    repeat: 'every day',
  });

  await ctx.scene.leave()
  await ctx.editMessageText('✅ Уведомление добавлено')
})

notificationAddWizard.leave(async (ctx) => await ctx.answerCbQuery())