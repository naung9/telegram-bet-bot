const fs = require('fs');
let admins = [];
let keyWords = [];
let groups = {};
try {
    const data = fs.readFileSync('config.json', 'utf8');
    const config = JSON.parse(data);
    admins = config.admins;
    keyWords = config.keywords;
    groups = config.groups;
    // console.log(config);
} catch (err) {
    console.error(err)
}
const { Telegraf, Markup } = require('telegraf');
const botAPIKey = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Telegraf(botAPIKey);
const optionButtons = Markup.keyboard([
    "ငွေသွင်းချင်တယ်",
    "ငွေထုတ်ချင်တယ်",
    "Account ဖွင့်နည်း"
]);
bot.use((ctx, next) => {
    next();
});
bot.start((ctx) => {
    ctx.reply("သင်ဘာလုပ်ချင်ပါသလဲ?", optionButtons);
});
bot.hears('ငွေသွင်းချင်တယ်', (ctx) => {
    // setTimeout(()=>{
    //     let replyPromises = [];
    //     admins.forEach(admin => {
    //         ctx.replyWithContact(admin.phone, admin.name);
    //     });
    //     Promise.all(replyPromises).then(_=>{
    //
    //     });
    // }, 200);
    if(ctx.chat.type === "group"){
        if(groups[ctx.chat.title]){
            ctx.reply(groups[ctx.chat.title].depositText);
        }
    }
});
bot.hears('ငွေထုတ်ချင်တယ်', (ctx) => {
    // ctx.reply(`Contact admins`);
    // setTimeout(()=>{
    //     admins.forEach(admin => {
    //         ctx.replyWithContact(admin.phone, admin.name);
    //     });
    // }, 200);
    if(ctx.chat.type === "group"){
        if(groups[ctx.chat.title]){
            ctx.reply(groups[ctx.chat.title].withdrawText);
        }
    }
});
bot.hears('Account ဖွင့်နည်း', (ctx) => {
    let videoLink = "Sorry. No video currently available";
    if(ctx.chat.type === "group"){
        if(groups[ctx.chat.title])videoLink = groups[ctx.chat.title].video;
    }
    ctx.reply(videoLink);
});
bot.on('new_chat_members', ctx => {
    console.log("Chat Member Updated");
    ctx.reply("သင်ဘာလုပ်ချင်ပါသလဲ?", optionButtons);
});
bot.on('text', ctx => {
    for(let i=0; i<keyWords.length; i++){
        if(ctx.message.text.toLowerCase().includes(keyWords[i])){
            ctx.reply("သင်ဘာလုပ်ချင်ပါသလဲ?", optionButtons);
            break;
        }
    }
});
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
