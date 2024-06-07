import { Telegraf } from 'telegraf'

class TelegrafDB extends Telegraf {
    constructor(BOT_TOKEN) {
        super(BOT_TOKEN)
    }
}
// https://github.com/telegraf/telegraf/issues/398
const bot = new TelegrafDB(process.env.BOT_TOKEN)

export default bot