
var TelegramBot = require('node-telegram-bot-api');

var token = '907526211:AAHdR8GCDZ6rHXVCTAS-4rX04bOcf3oa4WU';


var bot = new TelegramBot(token, { polling: true });


bot.onText(/\/echo (.+)/, function (msg, match) {
    var fromId = msg.from.id; 
    var resp = match[1]; 
    bot.sendMessage(fromId, resp);
});



const SerhId = "309124685";

bot.on('message', function (msg) {
    var chatId = msg.chat.id; 
    //console.log(chatId);
    //console.log(msg);
    var message = msg.text;
    //bot.sendSticker(chatId, "sticker.webp", {reply_to_message_id:msg.message_id});
    //bot.sendMessage(chatId, "sticker.webp", {reply_to_message_id:msg.message_id});
    var photo = 'sticker.webp'; 
    //if(msg.from.id == SerhId){
     //   bot.sendSticker(chatId, "sticker.webp", {reply_to_message_id:msg.message_id});
    //}
});

