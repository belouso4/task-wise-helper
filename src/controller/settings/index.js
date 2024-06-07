import { Scenes } from "telegraf"
import { settingsKeyboard, currencyKeyboard } from "./keyboards.js"
import jsonDB from "../../../jsonDB.js"
import { CURRENCY_SYMBOLS } from "../../utils/consts.js"

const settingsScene = new Scenes.BaseScene('settings-scene')

settingsScene.enter(async (ctx) => {
    await ctx.reply('⚙️ Настройки', settingsKeyboard)
})

settingsScene.action(['changeCurrency', ...Object.keys(CURRENCY_SYMBOLS)], async (ctx) => {
    if (CURRENCY_SYMBOLS[ctx.callbackQuery.data]) {
        await jsonDB.push('/cerrencyBase', ctx.callbackQuery.data)
        return await ctx.editMessageReplyMarkup(currencyKeyboard(ctx.callbackQuery.data).reply_markup)
    }
    let cerrencyBase

    try {
        cerrencyBase = await jsonDB.getData('/cerrencyBase')
    } catch (error) { console.log(error); }

    if (!cerrencyBase) {
        await jsonDB.push('/cerrencyBase', 'USD')
        cerrencyBase = 'USD'
    }

    await ctx.reply(
        'Выберите валюту по default',
        currencyKeyboard(cerrencyBase)
    )
    await ctx.answerCbQuery()
})


export default settingsScene