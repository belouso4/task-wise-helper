import { Markup } from "telegraf";
import { CURRENCY_SYMBOLS } from "../../utils/consts.js";

export const currencyKeyboard = (currencies) => {
    const keyboards = []

    for (const [key, value] of Object.entries(currencies.rates)) {
        const { base } = currencies
        const text = `${CURRENCY_SYMBOLS[base]} ${currencies.rates[base]} ${base} -> ${value} ${key} ${CURRENCY_SYMBOLS[key]}`
        if (key === base) {
            keyboards.unshift([Markup.button.callback(`${value} ${key} ${CURRENCY_SYMBOLS[key]}`, key)])
            continue
        }
        keyboards.push([Markup.button.callback(text, key)])
    }

    return Markup.inlineKeyboard(keyboards)
}