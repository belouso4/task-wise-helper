import { Scenes } from 'telegraf'
import { calcKeyboard } from './keyboards.js';

const calculateScene = new Scenes.BaseScene('calculate-scene')

calculateScene.enter(async (ctx) => ctx.reply('?', calcKeyboard));

export default calculateScene