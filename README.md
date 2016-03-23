#CMD++
#####An incremental game formed around a console.
Welcome to CMD++. This game is still in extremely early development, so if anything is not perfect, or features are missing, be patient, or add them yourself by contributing! If you have any ideas, questions, bugs, suggestions, etc. post them in the [CMD++ Subreddit](https://www.reddit.com/r/cmdplusplus). The only way this will get better is with your feedback and contributions!

######Attention:
If your save does not work after an update, try clearing your local storage on your browser. I'll try my best to make sure this does not happen though.

#####Todo:
- Add storage sizes
- Add save and load function
- Add upgrades
- Add virus and antivirus
- Add upgrades, both those bought with data or money
- Add a `dataStream` command that is more funny than useful. Example: [Name] likes [noun]: Jeremy likes shwarma. This would be so the user can "sample" their data.
- PLEASE COMMIT MORE TODOS

#####Version History

######V0.3
- Added storage sizes
- New commands: `upgradeStorage`, `currentStorage` and added `help [function]` for both
- Added version number
- Added the functions `CMD.formatLargeData()` and `CMD.nFormat()`
- Prices may need balancing

######V0.2
- Added `save` and `load`
- Fixed history buffer to not do repeat commands (thanks /u/crownie88)
- The game now autosaves every 10 seconds
- Fixed the money count not showing up in the top left

######V0.1
- Added `buyCommand` function
- Added `help` function with specific command help
- Added data sizes of byte->kb->mb etc
- Added `buyData` and `sellData`
- Removed the auto unlocking of commands

#####How you can help
You can help by reading through the code and adding things from the Todos, formatting code, or adding comments! But if you are unsure how to do this, I'll give a basic rundown:

The game is structured under an object called `CMD`. This means, to access any function, you must use `CMD.[function to use]`. This meanas this is also where you add your functions. The actual in-game functions are located under `CMD.commands.[function to use]`. Examples of these functions would be `CMD.commands.help`,  `CMD.commands.mineData`, etc. The exact commands a user types into the console in the game.

Some basic commands or vars you will need are:
- `CMD.respond()`: Outputs something the the user console
- `CMD.commandList` and `CMD.commandUnlocked`: Here is where you list the commands before you add them to `CMD.commands.[command]()`
- `CMD.commands.goals` Here is where you add commands the user can buy. If you add here you MUST also add to the base command list, and set the base command availability (located under `CMD.commandUnlocked`) to false.
- `CMD.b`: this is where your bytes are stored
- `CMD.increment` and `CMD.autoIncrement`: these vars both indicate the increment amount of mineData and autoMine.


