import { Markup, Scenes } from "telegraf"
import Convertor from "../../services/convertor/index.js"
import messages from "../../assets/messages/index.js";

const convertorScene = new Scenes.BaseScene('convertor-scene')

convertorScene.enter(async (ctx) => {
    await ctx.reply(messages.convertorInfo, { parse_mode: 'MarkdownV2' })
})

convertorScene.hears(/ytm:\s*([^\s].*)/gi, async (ctx) => {
    const url = ctx.match[1]

    const downloadVideo = await ctx.reply('Скачиваю видео...');

    const { outputPath, folder } = await Convertor.fromYoutubeToMp3(url)

    await ctx.deleteMessage(downloadVideo.message_id)

    const loadingMessage = await ctx.reply('Загружаю аудио...');

    await ctx.replyWithAudio({ source: outputPath })

    await ctx.deleteMessage(loadingMessage.message_id)

    await Convertor.deleteFile(folder)
})

export default convertorScene