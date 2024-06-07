import 'dotenv/config'
import { Telegraf, session, Markup } from 'telegraf'
import express from 'express';

// import debug from "debug";
// debug.enable("telegraf:*");

import stage from './stage.js'
// import './telegram.js'


// import { calculateAverage } from './utils/logic.js'
import scheduleBot from './utils/schedul.js'
import { adminMiddleware } from './middleware.js';

const PORT = process.env.PORT || 3001;
const app = express();
// const bot = new Telegraf(process.env.BOT_TOKEN)
import bot from './telegram.js'
import { startKeyboard } from './controller/start/keyboards.js';

bot.use(session());
app.use(bot.webhookCallback('/secret-path'));
bot.use(stage.middleware());

/* -------------------------- bot events --------------------------- */

bot.context.getUserId = function () {
    return this.update.callback_query?.from?.id || this.from.id
}

bot.use(adminMiddleware)

bot.command('start', async (ctx) => await ctx.scene.enter('start-scene'))

bot.hears('💼 Уведомления', async (ctx) => await ctx.scene.enter('notification-scene'))
bot.hears('🧮 Посчитать', async (ctx) => await ctx.scene.enter('calculate-scene'))
bot.hears('🌐 Валюта', async (ctx) => await ctx.scene.enter('currency-scene'))
bot.hears('Крипта', async (ctx) => await ctx.scene.enter('crypto-scene'))
bot.hears('Таймер', async (ctx) => await ctx.scene.enter('timer-scene'))
bot.hears('⚙️ Настройки', async (ctx) => await ctx.scene.enter('settings-scene'))
bot.hears('Конвертор', async (ctx) => await ctx.scene.enter('convertor-scene'))

bot.hears('Среднее значение', async (ctx) => ctx.scene.enter('average-calculate-wizard'));
bot.hears('Обменный курс', async (ctx) => ctx.scene.enter('currency-calculate-scene'));
bot.hears('Назад', async (ctx) => ctx.reply('Главное меню', startKeyboard));


// bot.hears('🌐 Валюта', async (ctx) => ctx.scene.enter('average-currency'));


scheduleBot(bot)

export async function start() {
    // The commands you set here will be shown as /commands like /start or /magic in your telegram client.
    await bot.telegram.setMyCommands([
        { command: 'start', description: 'open the menu' },
        { command: 'help', description: 'open the commands' },
        { command: 'average', description: 'calculates the average. Template average value: {price}:{amount}|{price}:{amount}...' },
        { command: 'notification', description: 'Manage notifications.' },
    ]);

    return bot;
    console.log(new Date(), 'Bot started as', bot.botInfo?.username);
}


