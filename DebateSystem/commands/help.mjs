import { Command } from "./commandHandler/index.mjs";

class Help extends Command {
  constructor(bot) {
    super("help", "Returns a list of commands.", "Returns a list of commands and descriptions.", "<command> optional.");
  }
  
  exec() {
    return True
  }
}
