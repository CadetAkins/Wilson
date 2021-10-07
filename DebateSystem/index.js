import { Bot } from "./commandHandler/index.mjs";

import { Help } from "./commands/help.mjs";

bot = Bot(
  "$",
  "A discord debate system.",
  "Wilson",
  true
)
.addCategory("Help");

//load commands

commands = [
  Help(bot);
];

commands.forEach(command => {
  bot.addCommand(command);
});

bot.once('ready', () => {
  console.log("Wilson Debate System Online!");
});

bot.on('message', (message) => {
  bot.parseCommands(message)
});
