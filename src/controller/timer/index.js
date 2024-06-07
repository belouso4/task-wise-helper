import { Markup, Scenes } from "telegraf"
import { timerKeyboard } from "./keyboards.js"
import Timer from "../../models/Timer.js"
import moment from "moment"
import { getTimers } from "./helpers.js"
import mongoose from "mongoose"

const timerScene = new Scenes.BaseScene('timer-scene')

timerScene.enter(async (ctx) => {
    try {
        await ctx.reply(await getTimers(ctx), { parse_mode: 'MarkdownV2', ...timerKeyboard })
    } catch (error) { console.log(error); }
})

timerScene.action(['timer-update'], async (ctx) => {
    try {
        await ctx.editMessageText(await getTimers(ctx), { parse_mode: 'MarkdownV2', ...timerKeyboard })
    } catch (error) { console.log(error); }

    await ctx.answerCbQuery()
})

timerScene.hears(/(add|idd|idt|del|res):\s*([^\s].*)/gi, async (ctx) => {
    const params = ctx.match[1]
    const value = ctx.match[2]

    try {
        switch (params) {
            case 'add': {
                await Timer.create({ message: value, start_date: Date.now() })
                return await ctx.reply('Таймер добавлен ✅')
                break;
            }

            case 'idd': {
                const [_id, date] = value.split(' ')
                const start_date = moment(date, 'DD.MM.YYYY').valueOf()
                await Timer.updateOne({ _id }, { start_date })
                return await ctx.reply('Таймер изменен ✅')
                break;
            }

            case 'idt': {
                const [_id, message] = value.split(' ')
                await Timer.updateOne({ _id }, { message })
                return await ctx.reply('Таймер изменен ✅')
                break;
            }

            case 'del': {
                const ids = value.split(',').map(id => new mongoose.Types.ObjectId(id.trim()))
                await Timer.deleteMany({ _id: { $in: ids } })
                return await ctx.reply('Таймер(ы) удален(ы) ✅')
                break;
            }

            case 'res': {
                await Timer.updateOne({ _id: value.trim() }, { start_date: moment().valueOf() })
                return await ctx.reply('Время таймера сброшено ✅')
                break;
            }

            default:
                break;
        }
    } catch (error) {
        await ctx.reply('Ошибка ⛔️')
        console.log(error);
    }
})

export default timerScene