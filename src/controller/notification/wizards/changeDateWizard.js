import { Markup, Scenes } from 'telegraf'

import { parseDateString } from '../helpers.js';
import { addTime } from '../../../utils/consts.js'
import Notification from '../../../models/Notification.js';

export const notificationChangeDateWizard = new Scenes.WizardScene(
  'change-date-notification-wizard', // first argument is Scene_ID, same as for BaseScene
  async (ctx) => {
    let button = []

    for (let i = 0; i < Object.keys(addTime).length; i += 2) {
      const chunk = [Markup.button.callback(Object.values(addTime)[i][0], Object.keys(addTime)[i])];
      if (i + 1 < Object.keys(addTime).length) {
        chunk.push(Markup.button.callback(Object.values(addTime)[i + 1][0], Object.keys(addTime)[i + 1]));
      }
      button.push(chunk);
    }
    button.push([Markup.button.callback('Отмена', "cancel")]);

    await ctx.editMessageText(
      'Напишите дату в формате hh:mm dd.mm.yyyy. Или выберите из предложенных внизу кнопок:',
      Markup.inlineKeyboard(button)
    )
    return ctx.wizard.next();
  },
  async (ctx) => {

    const dateRegex = /^\d{2}\.\d{2}\.\d{4}\s\d{2}:\d{2}$/;

    if (!ctx.message.text.match(dateRegex)) {
      ctx.reply('Повторите ввод:')
      // return
      return ctx.wizard.selectStep(ctx.wizard.cursor)
    }

    const key = ctx.wizard.state.key
    await Notification.updateOne({ _id: key }, { expires_at: parseDateString(ctx.message.text) })
    await ctx.reply('✅ Время изменено')
    await ctx.scene.leave()
  }
);

notificationChangeDateWizard.action(Object.keys(addTime), async (ctx) => {
  const callbackTime = addTime[ctx.callbackQuery.data];
  const key = ctx.wizard.state.key
  const currentDateTime = new Date();
  const nextNotificationTime = new Date(currentDateTime.getTime() + callbackTime[1]);

  await Notification.updateOne({ _id: key }, { expires_at: nextNotificationTime.getTime() })

  await ctx.editMessageText('✅ Время изменено')
  await ctx.scene.leave()
})

notificationChangeDateWizard.leave(async (ctx) => await ctx.answerCbQuery())