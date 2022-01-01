const fs = require('fs');
let admins = [];
let howToBetVideo = "Sorry. No video currently available";
try {
    const data = fs.readFileSync('config.json', 'utf8');
    const config = JSON.parse(data);
    admins = config.admins;
    if (config.videoLink)howToBetVideo = config.videoLink;
    console.log(config);
} catch (err) {
    console.error(err)
}
const { Telegraf, Markup } = require('telegraf');
const botAPIKey = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Telegraf(botAPIKey);
const optionButtons = Markup.keyboard([
    "ငွေသွင်းချင်တယ်",
    "ငွေထုတ်ချင်တယ်",
    "ဘယ်လိုလောင်းရမလဲ?"
]);
bot.use((ctx, next) => {
    next();
});
bot.start((ctx) => {
    ctx.reply("သင်ဘာလုပ်ချင်ပါသလဲ?", optionButtons);
});
bot.hears('ငွေသွင်းချင်တယ်', (ctx) => {
    ctx.reply(`Contact admins`);
    setTimeout(()=>{
        admins.forEach(admin => {
            ctx.replyWithContact(admin.phone, admin.name);
        });
    }, 200);
});
bot.hears('ငွေထုတ်ချင်တယ်', (ctx) => {
    ctx.reply(`Contact admins`);
    setTimeout(()=>{
        admins.forEach(admin => {
            ctx.replyWithContact(admin.phone, admin.name);
        });
    }, 200);
});
bot.hears('ဘယ်လိုလောင်းရမလဲ?', (ctx) => ctx.reply(howToBetVideo ?? 'Sorry. No video currently available'));
bot.on('new_chat_members', ctx => {
    console.log("Chat Member Updated")
    ctx.reply("သင်ဘာလုပ်ချင်ပါသလဲ?", optionButtons);
});
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
