import { Scenes } from "telegraf"
import { startKeyboard } from "./keyboards.js"

const startScene = new Scenes.BaseScene('start-scene')

startScene.enter(async (ctx) => {
    await ctx.reply('Привет!', startKeyboard)
})



export default startScene