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
    ctx.reply("What would you like to do?", optionButtons);
});
bot.hears('Want To Bet?', (ctx) => {
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
bot.hears('Want To Claim Your Money?', (ctx) => ctx.reply('Do That'));
bot.hears('How To Bet?', (ctx) => ctx.reply('Do This Shit'));
bot.on('chat_member', ctx => {
    ctx.reply("What would you like to do?", optionButtons);
});
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
