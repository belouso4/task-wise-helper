import { Markup } from "telegraf";
import { CURRENCY_SYMBOLS } from "../../utils/consts.js";

export const settingsKeyboard =
    Markup.inlineKeyboard([
        Markup.button.callback('Изменить base валюту', 'changeCurrency'),
    ])

export const currencyKeyboard = (cerrencyBase) =>
    Markup.inlineKeyboard(Object.entries(CURRENCY_SYMBOLS)
        .map(el => Markup.button.callback(`${el[0] === cerrencyBase ? el[1] + ' ✅' : el[1]}`, el[0]))
        .reduce((acc, el, index) => {
            const indexRow = Math.floor(index / 3)
            if (!acc[indexRow]) acc[indexRow] = []
            acc[indexRow].push(el)
            return acc
        }, []))

