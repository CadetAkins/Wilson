import { Command } from "./commandHandler/index.js";

class Formats extends Command {
  constructor(bot) {
    this.bot = bot;
    super("formats", "Displays a list of bot available debate formats.", "Displays a list of bot available debate formsts, including LD, SD, PD, and EXTMP")
  }
}
