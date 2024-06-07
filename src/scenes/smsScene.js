import { session, Markup, Scenes } from 'telegraf'


const smsScene = new Scenes.BaseScene('smsScene')

smsScene.enter(async (ctx) => {
    ctx.session.data = {}
    ctx.reply('Бот уведомляет каждые 2.5 месяца о том что заблокируют симку.', Markup.inlineKeyboard([
        Markup.button.callback('Sent SMS!', 'send'),
        Markup.button.callback('Time?', 'time')
    ]));
});

smsScene.action('send', async (ctx) => {
    const currentDate = new Date()
    currentDate.setMonth(currentDate.getMonth() + 2);
    currentDate.setDate(currentDate.getDate() + 15); // Добавляем половину месяца

    await db.push("/settings/mts/time", currentDate);
    await ctx.reply("Время обнавлено. Уведомим через 2.5 месяца о блокировки симки.")
    await ctx.answerCbQuery()
});

smsScene.action('time', async (ctx) => {
    const currentDate = new Date()
    const futureDate = await db.getData("/settings/mts/time");
    let difference = futureDate.getTime() - currentDate.getTime();
    let daysDifference = Math.ceil(difference / (1000 * 60 * 60 * 24));

    await ctx.reply("Осталось дней: " + daysDifference)
    await ctx.answerCbQuery()
});

export default smsScene