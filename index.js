const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv").config();
const axios = require("axios");

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

// bot.on("message", (option) => {
//   console.log("message recieved on the bot", option);
//   bot.sendMessage(
//     option.chat.id,
//     "Hello, I am a bot. I am here to help you with your queries. Please type /help to know more about me.",
//   );
// });

bot.onText(/\/joke/, async (option) => {
  const response = await axios.get(
    "https://official-joke-api.appspot.com/random_joke",
  );
  const setup = response.data.setup;
  const punchline = response.data.punchline;
  bot.sendMessage(option.chat.id, setup + " ,  " + punchline);
});
