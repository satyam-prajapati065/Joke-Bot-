const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/start/, (option) => {
  bot.sendMessage(
    option.chat.id,
    `Hello ${option.from.first_name}, I am a bot. I am here to help you with your queries. Please type /joke to get a funny joke!`,
  );
  console.log(option);
});

bot.onText(/\/joke/, async (option) => {
  try {
    const response = await axios.get(
      "https://official-joke-api.appspot.com/random_joke",
    );
    console.log(response);
    const setup = response.data.setup;
    const punchline = response.data.punchline;
    bot.sendMessage(option.chat.id, `${setup}\n\n😂 ${punchline}`);
  } catch (error) {
    console.error("Joke fetch karne me error aaya:", error.message);
    bot.sendMessage(
      option.chat.id,
      "Sorry bhai, abhi mood nahi hai joke sunane ka. (API Error)",
    );
  }
});
