const Discord = require("discord.js");



class Bot extends Discord.Client {
  constructor(prefix = "!", description = "A discord bot.", name = "", caseInsensitive = true, ...args) {
    super([args]);
    this.category = {};
    this.command = {};
    this.prefix - prefix;
    this.description=description;
    this.name=name;
    this.caseInsensitive = caseInsensitive;
  }
  
  addCategory(name) {
    if (name in this.category) {
      console.error(new Error("The category you're attempting to register already exists."));
    } else {
      if (this.CaseInsensitive) {
        for(var i = 0; i< name.length; i++){
          name[i] = name[i][0].toUpperCase() + name[i].slice(1);
        }
        
        this.category[name] = {};
      } else {
        this.category[name] = {};
      }
    }
  }
  
  removeCategory() {
    if (name in this.category) {
      console.error(new Error("The category you're attempting to register already exists."));
    } else {
      if (this.CaseInsensitive) {
        for(var i = 0; i< name.length; i++){
          name[i] = name[i][0].toUpperCase() + name[i].slice(1);
        }
        
        delete this.category[name];
      } else {
        delete this.category[name];
      }
    }
  }
  
  addCommand(commandClass) {
    if (!commandClass.category) {
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
    } else {
      if (this.CaseInsensitive) {
        for(var i = 0; i< commandClass.category.length; i++){
         commandClass.category[i] = commandClass.category[i][0].toUpperCase() + commandClass.category[i].slice(1);
        }
      }
      if (!commandClass.category in this.category) {
        console.error(new Error("The category you provided in regsitering command '" + commandClass.name.toLowerCase() + "' does not exist. You may create one using the method commandHandler.Bot.addCategory()"));    
      }
      
      if (commandClass.name == null) {
        commandClass.setName(commandClass.exec.name);
      }
    
      if (this.caseInsensitive) {
        if (commandClass.name.toLowerCase() in this.command) {
          console.error(new Error("The command name you passed is already a command."));
          return False  
        }
        this.category[commandClass.category][commandClass.name.toLowerCase()] = {};
        this.category[commandClass.category][commandClass.name.toLowerCase()]['brief'] = commandClass.brief;
        this.category[commandClass.category][commandClass.name.toLowerCase()]['description'] = commandClass.description;
        this.category[commandClass.category][commandClass.name.toLowerCase()]['exec'] = commandClass.exec;
        this.category[commandClass.category][commandClass.name.toLowerCase()]['usage'] = commandClass.usage;
      } else {
        if (commandClass.name in this.command) {
          console.error(new Error("The command name you passed is already a command."));
          return False  
        }
        this.category[commandClass.category][commandClass.name] = {};
        this.category[commandClass.category][commandClass.name]['brief'] = commandClass.brief;
        this.category[commandClass.category][commandClass.name]['description'] = commandClass.description;
        this.category[commandClass.category][commandClass.name]['exec'] = commandClass.exec;
        this.category[commandClass.category][commandClass.name]['usage'] = commandClass.usage;
      }
    
    }
    
   
    
    return True
    
  }
  
  removeCommand(commandName) {
    
    if (this.caseInsensitve) {
      commands = []
      this.category.keys().forEach(key => {
        this.category[key]['commands'].keys().forEach(command => {
          commands.push(command);
        })
      });
      this.command.keys().forEach(command => {
        commands.push(command);
      });
      
      if (!commandName.toLowerCase() in commands) {
        console.error(new Error("The command name you passed is not already a command."));
        return False  
      }
      try{
        delete this.command[commandName.toLowerCase()];
      } catch {
        this.category.keys().forEach(key => {
          try {
           delete this.category[key]['commands'][commandName.toLowerCase()];
          } catch {
            return;
          }
        }) 
      }
    } else {
      if (!commandClass.name in commands) {
        console.error(new Error("The command name you passed is not already a command."));
        return False  
      }
      
    } else {
      commands = []
      this.category.keys().forEach(key => {
        this.category[key]['commands'].keys().forEach(command => {
          commands.push(command);
        })
      });
      this.command.keys().forEach(command => {
        commands.push(command);
      });
      
      if (!commandName in commands) {
        console.error(new Error("The command name you passed is not already a command."));
        return False  
      }
      try{
        delete this.command[commandName];
      } catch {
        this.category.keys().forEach(key => {
          try {
           delete this.category[key]['commands'][commandName];
          } catch {
            return;
          }
        }) 
      }
    } else {
      if (!commandClass.name in commands) {
        console.error(new Error("The command name you passed is not already a command."));
        return False  
      }
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
          this.command[name]['exec'](message, ...message.content.replace(this.prefix, "").replace(this.commandName).strip().split(" "));
        }
      });
    }
  }
}

class Command {
  constuctor(name = null, brief = "", description = "", usage = "", category=False) {
    this.name = name;
    this.brief=brief;
    this.description=description;
    this.usage=usage;
    this.category=category;
  }
  
  setName(name) {
    this.name = name;
  }
}
