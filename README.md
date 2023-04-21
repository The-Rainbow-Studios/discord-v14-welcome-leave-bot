![We](https://user-images.githubusercontent.com/73745640/233626591-d9984c34-c3d4-41d5-9cd9-531f5b85744b.png)


# Welcomer and Leave Bot
Some Images to preview the bot
![Image 1](https://cdn.discordapp.com/attachments/1086263742892884009/1098594704599306300/image.png)
![Image 2](https://cdn.discordapp.com/attachments/1093490906587467838/1098594978407661618/image.png)
![Image 2](https://cdn.discordapp.com/attachments/1086263742892884009/1098595096494096424/image.png)
![Image 2](https://cdn.discordapp.com/attachments/897020852426653716/1098595367836205147/image.png)

## Can I use this handler in my bot or run this?

> Sure you can! You **cannot remove credits** if you want!

#### For People making a youtube video on it

> There should be a line in your video description <br>

```
Credits to visa2code - https://youtube.com/@visa2code
His discord server - https://discord.gg/rainbow-studios-free-codes-869916537610448897
```

> Any video not following this will be taken down!<br>

## Setup this sweet bot

- Step 1 <br>
  Create a `.env` file with this template

```
TOKEN=secret
```

Fore replit users<br>
[click here](https://replit.com/github/The-Rainbow-Studios/discord-v14-welcome-leave-bot) <br>

- Step 2 <br>
  Fill `./botconfig/config.js` file with this template

```js
module.exports = {
  "token": process.env.TOKEN,
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


```

Tip: [How to get a mongodb URL?](https://www.youtube.com/watch?v=RQMWKRlMtH0 "YouTube Video") <br>


- Step 3 
  Now the final step. Run `npm install` and it will install all necessary packages. At last run `npm run start` or `node .`
  
  **And your bot should be up and running!**<br>
**For Emojis [Click here](https://discord.gg/rainbow-studios-free-codes-869916537610448897 "Rainbow Studios")**

## Problems? or cant host it?

You can ask help in my support server by clicking [here](https://discord.gg/rainbow-studios-free-codes-869916537610448897 "Rainbow Studios")

## Contributing

Steps to contribute:<br>

![Contirbute](https://i.imgur.com/qN2RoJF.png)<br>

That's it Thanks for contributing!<br>

# License

[DBAD License](https://github.com/The-Rainbow-Studios/discord.js-v14-handler/blob/main/LICENSE.md)

# Support

For support join our [discord support server](https://discord.gg/rainbow-studios-free-codes-869916537610448897).

# Owners

- [@TejasLamba2006](https://github.com/TejasLamba2006)
- [@OpOggy](https://github.com/OpOggy)
