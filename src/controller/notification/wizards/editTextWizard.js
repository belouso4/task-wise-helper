import { Scenes } from 'telegraf'
import Notification from '../../../models/Notification.js';
import { cancelNotificationKeyboard } from '../keyboards.js';

export const notificationEditTextWizard = new Scenes.WizardScene(
    'edit-text-notification-scene', // first argument is Scene_ID, same as for BaseScene
    async (ctx) => {
        await ctx.editMessageText(
            'Напишите текст для уведомления.\n\nTemplate: text: text',
            cancelNotificationKeyboard
        )
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (!ctx.message.text.match(/text:\s*([^\s].*)/g)) return
        const text = ctx.message.text.split(':')[1]
        const key = ctx.wizard.state.key

        await Notification.updateOne({ _id: key }, { message: text })
        await ctx.reply('✅ Текст изменен')
        await ctx.scene.leave()
    }
);


notificationEditTextWizard.leave(async (ctx) => await ctx.answerCbQuery())