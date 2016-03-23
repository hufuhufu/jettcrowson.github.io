//All game values and functions will be stored here.
var CMD = {
  //The currency variables
  money: 0,
  increment: 1,
  autoIncrement: 0,
  historyBufferEnabled: true,
  historyBuffer: [],
  historyBufferCurrentIdx: -1,
  historyLastDirection: null,
  unit: "byte",
  dataShow: 0,
  data: 0,
  counter:0,
  currStorage: "selectronTube",
  storages: ["selectronTube","floppyDisk", "zipDrive", "DVD", "sdCard", "flashDrive", "SSD", "ssdArray", "serverRack", "serverRoom", "serverWarehouse", "multipleLocations", "multipleCountries", "smallAfricanCountry", "alienSpaceArray", "enslaveHumans"],
  storageCapacities: ["512Bytes", "1509949Bytes", "100MB", "5GB", "32GB", "512GB", "1TB", "16TB", "100TB", "1PB", "512PB", "128EB", "1ZB", "512ZB", "100000YB", "9999999999999999YB"],
  storagePricing: [0, 2500, 170000, 500000, 1500000, 8000000, 25000000, 75000000, 1750000000, 5250000000, 14000000000, 10000000000000, 40000000000000, 400000000000000, 3000000000000000, 9007199254740991],
  //Creates a new line in the CMD
  respond: function(text) {
    //Add a new table row, used as a line in the CMD
    $("#responses").append("<tr class='response'><td class='response'>> " +
      text + "</td></tr>");
  },
  gameLoop: setInterval(function() {
    CMD.counter++;
    if(CMD.counter%10===0){
      CMD.commands.save(false);
    }
    if(CMD.checkStorage()){
      CMD.addData(CMD.autoIncrement);
    }else{
      CMD.update();
      if(CMD.counter%10===0){
      CMD.respond("Please upgrade your storage with upgradeStorage.");
    }
    }

  }, 1000),
  //When the user enters a command, this is run to check if they typed anything, and if they did, submit it to CMD.runCommand().
  command: function() {
    if ($("#input").val() !== "") {
      //Submit the command
      var command = $("#input").val();
      CMD.runCommand(command);
      // Add command to history
      if (CMD.historyBufferEnabled) {
        if (CMD.historyBuffer[0] != command){
            CMD.historyBuffer.unshift(command);
        }
        if (CMD.historyBuffer.length > 10) { // Ensure we have a circular history
          CMD.historyBuffer.pop();
        }
      }
      //Reset the imput field
      $("#input").val("");
    }
  },
  //Check if the command exists, and if it does, run it.
  runCommand: function(commandToRun) {
    //REMEMBER: ALWAYS ADD YOUR COMMANDS TO THE COMMANDLIST ARRAY AND THE COMMAND OBJECT
    //Secret command to add 10% of your storage capacity. This is mostly just for testing what works. I'll remove this before release.
    if(commandToRun==="poppies"){
      CMD.data+=CMD.formatLargeData(CMD.storageCapacities[CMD.storages.indexOf(CMD.currStorage)])/10;
    }
    //Break away args
    if (commandToRun.indexOf(" ") !== -1 && commandToRun[commandToRun.indexOf(
      " ") + 1] === undefined) {
      CMD.respond("Command not found.");
      console.log("Command not found.");
    } else {
      //Seperate the command and the argument
      var commandAndArgs = commandToRun.split(" ");
      //Check if it exists
      if (CMD.commandList.indexOf(commandAndArgs[0]) === -1) {
        CMD.respond("Command not found.");
      } else {
        console.log(commandAndArgs);
        var commandIndex = CMD.commandList.indexOf(commandAndArgs[0]);
        if (CMD.commandUnlocked[commandIndex]){
            CMD.commands[commandAndArgs[0]](commandAndArgs[1]);
        }else{
            CMD.respond("Command locked. Use buyCommand to unlock new commands.");
        }
      }
    }
  },
  //Update the data count
  update: function() {
    $("#dataCount").html(CMD.formatBytes(CMD.data));
    $("#moneyCount").html("$" + CMD.nFormat(CMD.money));
    var per = Math.floor(100*CMD.data/CMD.formatLargeData(CMD.storageCapacities[CMD.storages.indexOf(CMD.currStorage)]));
    $("#capac").html(per+"%");
  },
  checkStorage: function(){
    if(CMD.data<=CMD.formatLargeData(CMD.storageCapacities[CMD.storages.indexOf(CMD.currStorage)])){
      return true;
    }else{
      return false;
    }
  },
  //Convert bytes->->kb->mb->gb->etc
  formatBytes: function(bytes,decimals) {
   if(bytes === 0) return '0 Byte';
   var k = 1024;
   var dm = decimals + 1 || 2;
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
   var i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },
  formatLargeData: function(str){
    var digits = str.replace(/\D/g, "");
    var letters = str.replace(/[^a-z]/gi, "");

    switch(letters){
      case "Bytes":
        return digits;
      break;
      case "MB":
        return digits*1024*1024;
      break;
      case "GB":
        return digits*1024*1024*1024;
      break;
      case "TB":
        return digits*1024*1024*1024*1024;
      break;
      case "PB":
        return digits*1024*1024*1024*1024*1024;
      break;
      case "EB":
        return digits*1024*1024*1024*1024*1024*1024;
      break;
      case "ZB":
        return digits*1024*1024*1024*1024*1024*1024*1024;
      break;
      case "YB":
        return digits*1024*1024*1024*1024*1024*1024*1024*1024;
      break;
    }
  },
  //Add data
  addData: function(amount) {
    CMD.data += amount;
    CMD.update();
  },
  //Add money
  addMoney: function(amount) {
    CMD.money += amount;
    CMD.update();
  },
  nLog: Math.log(10),
  nArray: ["", "k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "UnD", "DuD", "TrD", "QaD", "QiD", "SeD", "SpD", "OcD", "NoD", "Vi", "UnV"],
  floor: function(n) {
  return (Math.abs(Math.abs(n) - Math.abs(Math.floor(n))) >= 0.999999991) ? ((n >= 0) ? Math.ceil(n) : Math.floor(n)) : ((n >= 0) ? Math.floor(n) : Math.ceil(n));
  },
 nFormat: function(n, d) {
  var l = (CMD.floor(Math.log(Math.abs(n)) / CMD.nLog) <= 0) ? 0 : CMD.floor(Math.log(Math.abs(n)) / CMD.nLog),
  p = (l % 3 === 0) ? 2 : (((l - 1) % 3 === 0) ? 1 : 0),
  r = (Math.abs(n) < 1000) ? ((typeof d === "number") ? n.toFixed(d) : CMD.floor(n)) : (CMD.floor(n / (Math.pow(10, CMD.floor(l / 3) * 3 - p))) / Math.pow(10, p));
  return (r + CMD.nArray[CMD.floor(l / 3)] + ((CMD.floor(r) === 42) ? "~" : "")) || "Infinite";
},

  //LIST ALL COMMANDS HERE, OTHERWISE THEY WILL RETURN AS NOT EXISTING
  commandList: ["help", "mineData", "save", "autoMine", "sellData", "buyData", "buyCommand", "upgradeStorage", "currentStorage", "load", "cls"],
  //SET EACH FUNCTION TO WHETHER IT IS UNLOCKED
  commandUnlocked: [true, true, true, false, false, false, true, true, true, true, true],
  //Command object stores all game functions, not the actual engine functions
  commands: {
    help: function(toHelp) {
      //Check if help was passed with an argument or not. If it was, do the command specific help, otherwise do the command list generic help.
      if(toHelp!==undefined){
        switch(toHelp){
          case "help":
            CMD.respond(toHelp+": Gives list of commands or specific instructions for commands.");
            CMD.respond("To use: help, help [command]");
          break;
          case "mineData":
            CMD.respond(toHelp+": Increments data by your increment amount. The default is 1 byte.");
            CMD.respond("To use: mineData");
          break;
          case "save":
            CMD.respond(toHelp+": Saves files to your browser so you can load the game.");
            CMD.respond("To use: save");
          break;
          case "load":
            CMD.respond(toHelp+": Loads previously saved files.");
            CMD.respond("To use: load");
          break;
          case "autoMine":
            CMD.respond(toHelp+": Every second, increments your data by the auto increment amount. Default is 1 byte per second.");
            CMD.respond("To use: autoMine");
          break;
          case "sellData":
            CMD.respond(toHelp+": Converts data to money. The conversion is 1 byte for $1, but the data deteriorates during transfer.");
            CMD.respond("To use: sellData [amount]");
          break;
          case "buyData":
            CMD.respond(toHelp+": Converts money to data. The conversion is 1 byte for $2.");
            CMD.respond("To use: buyData [amount]");
          break;
          case "buyCommand":
            var listOfAvailable = [];
            CMD.respond(toHelp+": Purchases and unlocks a command.");
            for(var b=0; b<CMD.commands.goals[0].length;b++){
              if(CMD.commands.goals[2][b]===false){
                listOfAvailable.push(CMD.commands.goals[0][b] + ": "+(CMD.formatBytes(CMD.commands.goals[1][b])));
              }
            }
            CMD.respond("Available commands: "+listOfAvailable.join(", "));
            CMD.respond("To use: buyCommand [command]");
          break;
          case "cls":
            CMD.respond(toHelp+": Clears the screen.");
            CMD.respond("To use: cls");
          break;
          case "upgradeStorage":
            var li = [];
              for(var q = 0; q<CMD.storages.length;q++){
                if(q>CMD.storages.indexOf(CMD.currStorage)){
                li.push(CMD.storages[q]+": "+CMD.storageCapacities[q]+" - $"+CMD.nFormat(CMD.storagePricing[q]));
              }
            }
            CMD.respond(toHelp+": Upgrades the max amount of data you can hold.");
            CMD.respond("Available upgrades: "+li.join(",    "));
            CMD.respond("To use: upgradeStorage [storage device]");
          break;
          case "currentStorage":
            CMD.respond(toHelp+": Check how much data you can hold.");
            CMD.respond("Usage: currentStorage");
          break;
          default:
            CMD.respond("Command not found or no help is available. Type 'help' with no arguments to see a list of commands.");
        }
      }else{
      CMD.respond("########################################");
      CMD.respond("List of commands:");
      var availableCommands = [];
      //Only view commands that are available under the CMD.commandUnlocked array
      for (var r = 0; r < CMD.commandList.length; r++) {
        if (CMD.commandUnlocked[r] === true) {
          availableCommands.push(CMD.commandList[r]);
        }
      }
      CMD.respond(availableCommands.join(
        ", "));
      CMD.respond(" ");
      CMD.respond("For specific command help type, 'help [command]'");
      CMD.respond("########################################");
    }
    },
      //list commands to buy in corresponding spots of the three arrays
    goals: [
    ["autoMine", "buyData", "sellData"],
    [20, 150, 250],
    [false, false, false]],

    buyCommand: function(toBuy) {
    if(toBuy!==undefined){
      //Make sure that the command exists
      var commandIndex = CMD.commands.goals[0].indexOf(toBuy);
      if(commandIndex >= 0){
        //Make sure there is enough data to buy the command.
        if (CMD.data >= CMD.commands.goals[1][commandIndex]){
            //Make sure it hasn't been unlocked already
            if(CMD.commands.goals[2][commandIndex]!==true){
                //Unlock the command under the CMD.commandUnlocked array
                CMD.commandUnlocked[CMD.commandList.indexOf(toBuy)]=true;
                //Unlock the command so you can't buy it multiple times
                CMD.commands.goals[2][commandIndex]=true;
                //Spend data on unlocking this command
                CMD.addData(CMD.commands.goals[1][commandIndex]*-1);
                CMD.respond("Command unlocked: "+toBuy);
            }else{
                CMD.respond("Command already unlocked.");
            }
        }else{
            CMD.respond("You don't have enough data to buy this command.");
        }
      }else{
        CMD.respond("Command not found for purchase.");
      }
    }else{
      CMD.respond("Please enter a command to buy, or type, 'help buyCommand' to see available commands.");
    }
  },
  upgradeStorage: function(toUpgrade){
    if(toUpgrade !== undefined){
      for(var r = 0; r < CMD.storages.length; r++){
        if(CMD.storages[r]===toUpgrade){
          if(CMD.money>=CMD.storagePricing[CMD.storages.indexOf(toUpgrade)]&& CMD.storages.indexOf(toUpgrade)>CMD.storages.indexOf(CMD.currStorage)){
            CMD.money-=CMD.storagePricing[CMD.storages.indexOf(toUpgrade)];
            CMD.currStorage=CMD.storages[CMD.storages.indexOf(toUpgrade)];
            CMD.respond("Storage upgraded to "+CMD.currStorage+" with a capacity of "+CMD.storageCapacities[CMD.storages.indexOf(CMD.currStorage)]);
          }else{
            CMD.respond("Not enough money or you may have already unlocked this storage device.");
          }
        }
      }
    }else{
      CMD.respond("Please enter an argument. For help type 'help upgradeStorage'");
    }
  },
    //Amount mined is determined by the CMD.increment variable. Default is 1
    mineData: function() {
      if(CMD.checkStorage()){
        CMD.respond("Data mined.");
        CMD.addData(CMD.increment);
      }else{
        CMD.respond("Please upgrade your storage with upgradeStorage.");
      }

    },
    //Set CMD.autoIncrement to the amount needed
    autoMine: function() {
      CMD.autoIncrement = 1;
      CMD.respond("Automatic mining begining at a rate of "+CMD.autoIncrement+" byte per second.");
    },
    //Buy data with money. Data cost $2 per 1 data
    buyData: function(amountToBuy) {
      //For some reason the amount to buy was turning into a string, so I added Number() to convert it back
      Number(amountToBuy);
      if (amountToBuy !== undefined) {
        //1 byte cost $2
        var cost = amountToBuy * 2;
        if (CMD.money >= cost && typeof amountToBuy !== "number") {
          CMD.money -= cost;
          CMD.data += Number(amountToBuy);
          CMD.respond("" + amountToBuy + " data bought with $" + cost + ".");
        } else {
          CMD.respond("You do not have enough money.");
        }
      } else {
        CMD.respond("Argument needed. Try: " + "buyData [amount]");
      }
    },
    currentStorage: function(){
      CMD.respond("Your "+CMD.currStorage+" can hold "+CMD.storageCapacities[CMD.storages.indexOf(CMD.currStorage)]);
    },
    //Sell data. Data is 1:$1 with money but deteriorates randomly (see var loss below)
    sellData: function(amount) {
      if (amount !== undefined) {
        Number(amount);
        //You must sell at least 100, and you must have enough to sell
        if (CMD.data >= amount && CMD.data >= 100 && typeof amount !== "number") {
          //Here is where we deteriorate the data. Too much?
          var loss = Math.floor(Math.random() * 15 + 10);
          console.log(loss);
          //Apply the loss to the total money received
          var transfer = Math.round(amount * (1 - loss / 100));
          CMD.money += transfer;
          CMD.data -= amount;
          //No idea what data integrity is but it sounded right.
          CMD.respond(loss + "% data integrity lost in transfer. Data sold: " +
            amount + ". Money gained: $" + transfer + ".");
        } else {
          CMD.respond(
            "You must sell at least 100 data. Please make sure you have 100 data."
          );
        }
      } else {
        CMD.respond("Argument needed. Try: " + "sellData [amount]");
      }
    },
    load:function(){
      if(localStorage.getItem("data")!=="null"&&localStorage.getItem("increment")!=="null"){
        //Load save.
        CMD.data = JSON.parse(localStorage.getItem("data"));
        CMD.money = JSON.parse(localStorage.getItem("money"));
        CMD.increment = JSON.parse(localStorage.getItem("increment"));
        CMD.autoIncrement = JSON.parse(localStorage.getItem("autoIncrement"));
        CMD.commandUnlocked = JSON.parse(localStorage.getItem("unlocked"));
        CMD.commands.goals[2] = JSON.parse(localStorage.getItem("bought"));
        CMD.currStorage = JSON.parse(localStorage.getItem("storage"));
        CMD.respond("Save loaded.");
      }else{
        CMD.commands.save();
        CMD.respond("No save found.");
      }
    },
    save: function(respondSave) {
      if(typeof(Storage) !== "undefined") {
        //Store variables in local storage
        localStorage.setItem("data", JSON.stringify(CMD.data));
        localStorage.setItem("money", JSON.stringify(CMD.money));
        localStorage.setItem("increment", JSON.stringify(CMD.increment));
        localStorage.setItem("autoIncrement", JSON.stringify(CMD.autoIncrement));
        localStorage.setItem("unlocked", JSON.stringify(CMD.commandUnlocked));
        localStorage.setItem("storage", JSON.stringify(CMD.currStorage));
        localStorage.setItem("bought", JSON.stringify(CMD.commands.goals[2]));

        //Gives the option to respond "Data saved" if you pass a variable. This is used so it doesn't output this every 10 seconds when the game is saved.
        if(respondSave===undefined){
        CMD.respond("Data saved.");
      }
      } else {
        CMD.respond("Local storage is not supported on your browser.");
      }
    },
    cls: function() {
      $("#responses").text("");
      CMD.respond("");
    }
  }
};
//Check if the Enter key was pressed
$(document).keypress(function(e) {
  if (e.which == 13) {
    CMD.command();
    CMD.historyBufferCurrentIdx = -1; // Reset history index
    $('#cmdWindow').scrollTop($('#cmdWindow')[0].scrollHeight);
  }
});
//Make the console act more like a real one by adding the arrow key up goes to the last command.
$('#input').keyup(function(e) {
    if (CMD.historyBufferEnabled && (e.which == 38 || e.which == 40)) { // Handling command history
      var iCurrentBufferSize = CMD.historyBuffer.length;
      var sSelectedCommand = '';
      if (e.which == 38) { // up = previous cmd in history
        CMD.historyBufferCurrentIdx++;
        if (CMD.historyBufferCurrentIdx > iCurrentBufferSize) CMD.historyBufferCurrentIdx =
          0;
        sSelectedCommand = CMD.historyBuffer[CMD.historyBufferCurrentIdx];
        CMD.historyLastDirection = 'up';
      }
      if (e.which == 40) { // down = next cmd in history
        CMD.historyBufferCurrentIdx--;
        if (CMD.historyBufferCurrentIdx < 0) {
          CMD.historyBufferCurrentIdx = -1; // Should empty the prompt
          sSelectedCommand = '';
        } else {
          sSelectedCommand = CMD.historyBuffer[CMD.historyBufferCurrentIdx];
        }
        CMD.historyLastDirection = 'down';
      }
      $('#input').val(sSelectedCommand);
    }
});
  //Called when the user first enters the page.
$(document).ready(function() {
  CMD.respond("Welcome to CMD++");
  CMD.respond("Your goal here is to mine data.");
  if(localStorage.getItem("storage")===null||localStorage.getItem("data")===null||localStorage.getItem("money")===null){
    CMD.commands.save();
  }else{
  CMD.commands.load();
  }

  CMD.respond("Type 'help' to get started.");

});
