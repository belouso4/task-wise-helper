import { Scenes } from "telegraf"

const cryptoScene = new Scenes.BaseScene('crypto-scene')

cryptoScene.enter(async (ctx) => {
    await ctx.reply('hello!')
})


export default cryptoScene