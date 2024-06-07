import { Scenes } from 'telegraf'
import { calculateAverage } from '../helpers.js';

const averageCalculateScene = new Scenes.WizardScene('average-calculate-wizard',
    async (ctx) => {
        let text = 'Calculates the average. Template average value:\n{price}:{quantity}|{price}:{quantity}...\n' +
            'if it is a sale, then put a minus opposite the quantity\n\n';
        await ctx.reply(text)
        await ctx.wizard.next()
    },
    async (ctx) => {
        try {
            await calculateAverage(ctx)
        } catch (error) {
            await ctx.reply('Неправильный формат.')
        } finally {
            await ctx.scene.leave()
        }
    }
)


export default averageCalculateScene