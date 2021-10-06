const Discord = require("discord.js");



class Bot extends Discord.Client {
  constructor(prefix = "!", description = "A discord bot.", name = "", caseInsensitive = true, ...args) {
    super([args]);
    this.command = {};
    this.prefix - prefix;
    this.description=description;
    this.name=name;
    this.caseInsensitive = caseInsensitive;
  }
  
  addCommand(commandClass) {
    if (commandClass.name == null) {
      commandClass.setName(commandClass.exec.name);
    }
    
    if (this.caseInsensitive) {
      if (commandClass.name.toLowerCase() in this.command) {
        console.error(new Error("The command name you passed is already a command."));
        return False  
      }
      this.command[commandClass.name.toLowerCase()] = {};
      this.command[commandClass.name.toLowerCase()]['brief'] = commandClass.brief;
      this.command[commandClass.name.toLowerCase()]['description'] = commandClass.description;
      this.command[commandClass.name.toLowerCase()]['exec'] = commandClass.exec;
      this.command[commandClass.name.toLowerCase()]['usage'] = commandClass.usage;
    } else {
      if (commandClass.name in this.command) {
        console.error(new Error("The command name you passed is already a command."));
        return False  
      }
      this.command[commandClass.name] = {};
      this.command[commandClass.name]['brief'] = commandClass.brief;
      this.command[commandClass.name]['description'] = commandClass.description;
      this.command[commandClass.name]['exec'] = commandClass.exec;
      this.command[commandClass.name]['usage'] = commandClass.usage;
    }
    
    return True
    
  }
  
  removeCommand(commandName) {
    
    if (this.caseInsensitve) {
      if (!commandClass.name.toLowerCase() in this.command) {
        console.error(new Error("The command name you passed is not already a command."));
        return False  
      }
      delete this.command[commandName.toLowerCase()];
    } else {
      if (!commandClass.name in this.command) {
        console.error(new Error("The command name you passed is not already a command."));
        return False  
      }
      delete this.command[commandName] 
    }
    
    return True
  }
  
  parseCommands(message) {
    if message.content.startsWith(this.prefix) {
      if (this.caseInsensitive) {
        var name = message.Content.replace(this.prefix, "").strip().split(" ")[0].toLowerCase();
      } else {
        var name = message.Content.replace(this.prefix, "").strip().split(" ")[0];
      }
      this.command.keys().forEach(name => {
        if (message.content.startsWith(name)) {
          this.command[name]['exec'](...message.content.replace(this.prefix, "").replace(this.commandName).strip().split(" "));
        }
      });
    }
  }
}

class Command {
  constuctor(name = null, brief = "", description = "", usage = "") {
    this.name = name;
    this.brief=brief;
    this.description=description;
    this.usage=usage;
  }
  
  setName(name) {
    this.name = name;
  }
}