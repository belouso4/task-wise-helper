import { Markup, Scenes } from "telegraf"
import { currencyKeyboard } from "./keyboards.js"

import { CURRENCY_SYMBOLS } from "../../utils/consts.js"

import { getCurrency } from "./helpers.js"

const currencyScene = new Scenes.BaseScene('currency-scene')

currencyScene.enter(async (ctx) => {
    try {
        await jsonDB.getData("/cerrencyBase");
    } catch (error) {
        return await ctx.reply('Установите базовую валюту в настройках')
    }

    const { base, currencies } = await getCurrency(ctx,)

    await ctx.reply(
        'Base: ' + base + '\n\nSet quantity - ch: 1000',
        currencyKeyboard(currencies
        ))
})

currencyScene.action(Object.keys(CURRENCY_SYMBOLS), async (ctx) => {
    if (ctx.callbackQuery.data === ctx.session.baseCurrency) return ctx.answerCbQuery('Текущая валюта.')
    const { base, currencies } = await getCurrency(ctx, ctx.callbackQuery.data)

    if (ctx.callbackQuery.data === base) return ctx.answerCbQuery('Текущая валюта.')

    await ctx.editMessageText(
        'Base: ' + base + '\n\nSet quantity - ch: 1000',
        currencyKeyboard(currencies)
    )
})

currencyScene.hears(/^ch: (.+)$/i, async (ctx) => {
    if (Number.isNaN(+ctx.match[1])) return ctx.reply('only numbers')
    if (ctx.session.numberCurrency === +ctx.match[1]) return

    ctx.session.lastmsgid = ctx.session.lastmsgid ? ctx.session.lastmsgid : ctx.message.message_id - 1
    const { currencies } = await getCurrency(ctx, ctx.session.baseCurrency, +ctx.match[1])
    await ctx.deleteMessage()


    await ctx.telegram.editMessageReplyMarkup(
        ctx.chat.id, ctx.session.lastmsgid, undefined,
        currencyKeyboard(currencies).reply_markup
    );
})

currencyScene.leave(ctx => {
    delete ctx.session.lastmsgid
})

export default currencyScene