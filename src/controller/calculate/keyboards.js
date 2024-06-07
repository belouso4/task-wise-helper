import { Markup } from "telegraf";

export const calcKeyboard =
    Markup.keyboard([['Среднее значение', 'Обменный курс'], ['Назад']]).oneTime().resize()