import { Markup } from "telegraf";
import { CURRENCY_SYMBOLS } from "../../utils/consts.js";

export const timerKeyboard = Markup.inlineKeyboard([Markup.button.callback('Обновить', 'timer-update')])