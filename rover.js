const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   // Write code here!
   constructor(position, mode, generatorWatts) {
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
   }

   receiveMessage(message) {
      let roverStatuses = {
         message: message.name,
         results: []
      }

      for (let index = 0; index < message.commands.length; index++) {
         if (message.commands[index].commandType === "STATUS_CHECK") {
            roverStatuses.results.push({
               completed: true,
               roverStatus: { mode: this.mode, generatorWatts: this.generatorWatts, position: this.position }
            })
         }
         if (message.commands[index].commandType === "MODE_CHANGE" && message.commands[index].value === "NORMAL") {
            roverStatuses.results.push({completed : true})
         }
         if (message.commands[index].commandType === "MODE_CHANGE" && message.commands[index].value === "LOW_POWER") {
            roverStatuses.results.push({completed : false})
         }
         if(message.commands[index].commandType === "MOVE" && this.mode === "LOW_POWER"){
            roverStatuses.results.push({completed : false})
         }
         if(message.commands[index].commandType === "MOVE" && this.mode === "NORMAL"){
            roverStatuses.results.push({completed : true, position: this.position = message.commands[index].value})
         }
      }

      return roverStatuses;
   };

};



module.exports = Rover;
