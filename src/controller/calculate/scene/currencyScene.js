import { Scenes } from 'telegraf'
import Currency from '../../../services/currency/index.js';

const currencyCalculateScene = new Scenes.BaseScene('currency-calculate-scene')

currencyCalculateScene.enter(async (ctx) => {
    let text = 'Template:\n\ncur: RUB: 10000 VND: 2600000';
    await ctx.reply(text)
})

currencyCalculateScene.hears(/cur:\s*([^\s].*)/gi, async (ctx) => {
    const msg = ctx.match[1].toUpperCase()
    const parts = msg.split(' ')
    const result = {}

    for (let i = 0; i < parts.length; i += 2) {
        const currency = parts[i].slice(0, -1);
        const amount = parseInt(parts[i + 1], 10);

        result[currency] = amount;
    }

    const [fromSymbol, toSymbol] = Object.keys(result)
    const [fromValue, toValue] = Object.values(result)

    const currency = await (new Currency().fetch())
    const exchangeКates = currency.rates[toSymbol] / currency.rates[fromSymbol]
    const inputExchangeКates = toValue / fromValue

    const percent = (exchangeКates - inputExchangeКates) / exchangeКates * 100

    const text = `
        Обменный курс за 1 ${fromSymbol}:\n
        Обменный курс: ${inputExchangeКates} ${toSymbol}\n
        Настоящий курс : ${exchangeКates} ${toSymbol}\n
        Процент потери: ${percent.toFixed(2)}%
    `.trim().replace(/^\s+/gm, '')

    ctx.reply(text)
    await ctx.scene.leave()
})

export default currencyCalculateScene