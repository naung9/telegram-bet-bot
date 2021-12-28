const { Telegraf, Markup } = require('telegraf')
const botAPIKey = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Telegraf(botAPIKey);
const optionButtons = Markup.keyboard([
    "Want To Bet?",
    "Want To Claim Your Money?",
    "How To Bet?"
]);
bot.use((ctx, next) => {
    next();
});
bot.start((ctx) => {
    ctx.reply("သင်ဘာလုပ်ချင်ပါသလဲ?", optionButtons);
});
bot.hears('လောင်းချင်ပါသလား?', (ctx) => {
    ctx.getChatAdministrators().then(admins => {
        // let adminTxt = "";
        // admins.forEach(admin => {
        //     adminTxt+= `@${admin.user.first_name}, `;
        // });
        console.log(admins);
    }, error => {
        console.log(error);
    });
    ctx.reply(`Contact admins`);
    ctx.replyWithContact('+95 9977432056', 'Naung Nine');
});
bot.hears('ပိုက်ဆံထုတ်ချင်ပါသလား?', (ctx) => ctx.reply('Do That'));
bot.hears('ဘယ်လိုလောင်းရမလဲ?', (ctx) => ctx.reply('Do This Shit'));
bot.on('chat_member', ctx => {
    ctx.reply("သင်ဘာလုပ်ချင်ပါသလဲ?", optionButtons);
});
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
