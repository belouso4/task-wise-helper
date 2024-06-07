import { Markup } from "telegraf";

export const editKeyboard = Markup.inlineKeyboard([
    [Markup.button.callback('Удалить', 'delete'),
    Markup.button.callback('Изменить текст', 'changeTextNotify')],
    [Markup.button.callback('Изменить дату', 'changeDate'),
    Markup.button.callback('Изменить повторения', 'changeRepeat')],
    [Markup.button.callback('Отмена', 'cancel')],
])

export const notificationAddeKeyboard = Markup.inlineKeyboard([
    Markup.button.callback('Отмена', 'cancel')])

export const cancelAndSaveKeyboard = Markup.inlineKeyboard([
    Markup.button.callback('Отмена', 'cancel'),
    Markup.button.callback('Сохранить', 'save')
])

export const cancelNotificationKeyboard = Markup.inlineKeyboard([
    Markup.button.callback('Отмена', 'cancel')])