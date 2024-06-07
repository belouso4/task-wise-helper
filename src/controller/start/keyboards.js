import { Markup } from "telegraf";

export const startKeyboard =
    Markup.keyboard([['💼 Уведомления', '🧮 Посчитать', '🌐 Валюта'], ['Таймер', 'Крипта', '⚙️ Настройки'], ['Конвертор']]).oneTime().resize()


