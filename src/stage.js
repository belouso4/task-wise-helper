import { Scenes } from 'telegraf'

import { startKeyboard } from './controller/start/keyboards.js';

import startScene from './controller/start/index.js';
import calculateScene from './controller/calculate/index.js';
import cryptoScene from './controller/crypto/index.js';
import notificationScene from './controller/notification/index.js';
import currencyScene from './controller/currency/index.js';
import settingsScene from './controller/settings/index.js';

import averageCalculateScene from './controller/calculate/scene/averageScene.js';
import currencyCalculateScene from './controller/calculate/scene/currencyScene.js';
import * as allNotificationWizards from './controller/notification/wizards/index.js';
import timerScene from './controller/timer/index.js';
import convertorScene from './controller/convertor/index.js';

const stage = new Scenes.Stage([
    startScene,
    calculateScene,
    averageCalculateScene,
    currencyCalculateScene,
    cryptoScene,
    notificationScene,
    currencyScene,
    settingsScene,
    timerScene,
    convertorScene,

    ...Object.values(allNotificationWizards)
]);

stage.action('cancel', async (ctx) => {
    await ctx.reply('*Действие Отменено*', { parse_mode: 'Markdown' })
    await ctx.reply('Главное меню', startKeyboard)
    await ctx.scene.leave();
});

export default stage