module.exports = {
  "token": process.env.TOKEN,
 "expressServer": true, //true or false boolean
  "dbType": "MONGO", //quick.db OR MONGO
  "MONGOtype": "quickmongo", //quickmongo only
  "MongoURL": "", //if dbType = MONGO, this is required else skip
  "loadSlashsGlobal": true,
  "dirSetup": [{
    "Folder": "Info", "CmdName": "info",
    "CmdDescription": "Grant specific Information about something!"
  },
              {
    "Folder": "Setup", "CmdName": "Setup",
    "CmdDescription": "Setup the welcome plugin in the server"
  }]
}
