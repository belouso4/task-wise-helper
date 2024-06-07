import moment from "moment";
import Timer from "../../models/Timer.js";

export const getTimers = async (ctx) => {
    const timers = await Timer.find()
    let text = ''
    text += 'Таймер\n\n'

    if (timers.length > 0) {
        let count = 0
        for (const timer of timers) {
            const dayAgo = moment().diff(moment(+timer.start_date), 'days')
            text += `*${timer.message}*\n`
            text += `*ID:* \`${timer._id}\` \n`
            text += `*Старт:* ${dayAgo} дн(ей/я) назад\n`
            text += `*Дата:* ${moment(+timer.start_date).format('DD.MM.YYYY')} \n`
            count++
            text += count === timers.length ? '------------------\n' : '-----\n'
        }

    } else {
        text += 'Нет таймеров'
    }

    text += '*Чтобы добавить* - `add: text\n`'
    text += '*Чтобы изменить текс* - `idt: id text`\n'
    text += '*Чтобы изменить дату* - `idd: id date`\n'
    text += '*Чтобы удалить* - `del: id,id,id`\n'
    text += '*Чтобы сбросить время* - `res: id`'

    return text
        .replace(/\./g, '\\.')
        .replace(/\-/g, '\\-')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
}