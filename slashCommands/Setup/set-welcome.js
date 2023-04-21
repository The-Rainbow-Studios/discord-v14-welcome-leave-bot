const {
	EmbedBuilder, ActionRowBuilder, TextInputBuilder, ModalBuilder, TextInputStyle, ButtonBuilder, ButtonStyle, ComponentType 
} = require("discord.js");
const config = require("../../botconfig/config.js");
const ee = require("../../botconfig/embed.js");
const settings = require("../../botconfig/settings.js");
module.exports = {
	name: "set-welcome", //the command name for the Slash Command
  category: "Setup",
	description: "Setup the welcome plugin", //the command description for Slash Command Overview
	cooldown: 1,
	memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	options: [ //OPTIONAL OPTIONS, make the array empty / dont add this option if you don't need options!	
		//INFORMATIONS! You can add Options, but mind that the NAME MUST BE LOWERCASED! AND NO SPACES!!!, for the CHOCIES you need to add a array of arrays; [ ["",""] , ["",""] ] 
		//{"Integer": { name: "ping_amount", description: "How many times do you want to ping?", required: true }}, //to use in the code: options.getInteger("ping_amount")
		
		//{"User": { name: "ping_a_user", description: "To Ping a user lol", required: false }}, //to use in the code: options.getUser("ping_a_user")
		{"Channel": { name: "what_channel", description: "Which channel should I send welcome messages?", required: true }}, //to use in the code: options.getChannel("what_channel")
		//{"Role": { name: "what_role", description: "To Ping a Role lol", required: false }}, //to use in the code: options.getRole("what_role")
		//{"IntChoices": { name: "what_ping", description: "What Ping do you want to get?", required: true, choices: [["Bot", 1], ["Discord Api", 2]] }, //here the second array input MUST BE A NUMBER // TO USE IN THE CODE: options.getInteger("what_ping")
		{
			"StringChoices": {
				name: "image_enabled",
				description: "Do you want to send an image?",
				required: true,
				choices: [
					["Yes", "true"],
					["No", "false"]
				]
			}
		},
		{
			"StringChoices": {
				name: "embed_image",
				description: "Do you want to send the image in the embed or without it?",
				required: true,
				choices: [
					["Yes", "true"],
					["No", "false"]
				]
			}
		},
    {
			"StringChoices": {
				name: "embed_enabled",
				description: "Do you want to send the message in the embed or without it?",
				required: true,
				choices: [
					["Yes", "true"],
					["No", "false"]
				]
			}
		},//here the second array input MUST BE A STRING // TO USE IN THE CODE: interaction.getString("what_ping")
    {"String": { name: "avatar_profile_hex", description: "What should be the color of the avatar border? only hex accepted", required: false }}, //to use in the code: interaction.getString("ping_amount")
    {"String": { name: "color_text_hex", description: "What should be the color of the text in the image? only hex accepted", required: false }}, //to use in the code: interaction.getString("ping_amount")
     {"String": { name: "embed_hex", description: "What should be the color of the embed? only hex accepted", required: false }},
    {"Attachment": { name: "background_image", description: "Send the background image", required: false }},
	],
	run: async (client, interaction) => {
		try {
			//things u can directly access in an interaction!
			const {
				member,
				channelId,
				guildId,
				applicationId,
				commandName,
				deferred,
				replied,
				ephemeral,
				options,
				id,
				createdTimestamp
			} = interaction;
			const {
				guild
			} = member; 
      //gathering data

      const to_send_channel = options.getChannel("what_channel")
      const image_enabled = options.getString("image_enabled")
      const embed_image = options.getString("embed_image")
      const embed_enabled = options.getString("embed_enabled")
      const avatar_profile_hex = options.getString("avatar_profile_hex")
      const color_text_hex = options.getString("color_text_hex")
      const embed_hex = options.getString("embed_hex")
      const backgrund_url_input = options.getAttachment("background_image").url

            if(!isImageUrl(backgrund_url_input)) {
        return interaction.reply({
          content: `Not an image URL`
        })
      }
      if(!isHexColor(avatar_profile_hex) || !isHexColor(color_text_hex) || !isHexColor(embed_hex)) {
        return interaction.reply({
          content: `Not a HEX Color`
        })
      }

      const message_input = new TextInputBuilder().setCustomId('message').setLabel('The message to send when someone joins').setStyle(TextInputStyle.Paragraph)
        .setValue('Welcome to {server}, {user} [{username}]! You are member number {membercount}.')
          .setRequired(false)
          .setMinLength(1)

      const heading_text_input = new TextInputBuilder().setCustomId('heading_text').setStyle(TextInputStyle.Paragraph).setLabel('The first line in the image')
          .setRequired(false)
          .setValue('Welcome')
          .setMinLength(1)
       const username_text_input = new TextInputBuilder().setCustomId('username_text').setStyle(TextInputStyle.Paragraph).setLabel('The second line in the image')
          .setRequired(false)
          .setValue('{username}')
          .setMinLength(1)

       const tagline_text_input = new TextInputBuilder().setCustomId('tagline_text').setStyle(TextInputStyle.Paragraph).setLabel('The third line in the image')
          .setRequired(false)
          .setValue('You are member number {membercount}')
          .setMinLength(1)
        // const backgrund_url_input = new TextInputBuilder().setCustomId('backgrund_url').setStyle(TextInputStyle.Paragraph).setLabel('The third line in the image')
        //   .setPlaceholder(`https://image.png`)
        //   .setRequired(false)
        //   .setValue('https://media.istockphoto.com/id/1248619427/photo/retro-futuristic-city-flythrough-background-80s-sci-fi-landscape-in-space.jpg?b=1&s=170667a&w=0&k=20&c=hLmRgItKjP0h5IboMbZC-TSp63ThuncI9880Glb1m_Y=')
        //   .setMinLength(1)
 const actionRows = [message_input].map((input) =>
    new ActionRowBuilder().addComponents(input)
  )
      if (isAccepted(image_enabled)) {
  actionRows.push(
    new ActionRowBuilder().addComponents(heading_text_input),
    new ActionRowBuilder().addComponents(username_text_input),
    new ActionRowBuilder().addComponents(tagline_text_input)
  );
}
      const modal = new ModalBuilder()
        .setCustomId('welcome_modal')
        .setTitle('Setup Welcomer!')
        .addComponents(actionRows);

      await interaction.showModal(modal);
       const filter_modal = (interaction) => interaction.customId === 'welcome_modal';
      const submit = await interaction.awaitModalSubmit({ filter_modal, time: 5 * 60 * 1000 });
      const message_input_data = submit.fields.getTextInputValue('message');
      const heading_text_data = submit.fields.getTextInputValue('heading_text');
      const username_text_data = submit.fields.getTextInputValue('username_text');
      const tagline_text_data = submit.fields.getTextInputValue('tagline_text');




               let data = await client.db.get(`data_${guild.id}`);
if (data) {
  data.welcome_enabled = isAccepted('true');
  if (!data.welcome_data) {
    data.welcome_data = {};
  }
  data.welcome_data.message = message_input_data;
  data.welcome_data.channel_id = to_send_channel.id;
  data.welcome_data.image_enabled = isAccepted(image_enabled);
  if (!data.welcome_data.image_data) {
    data.welcome_data.image_data = {};
  }
  data.welcome_data.image_data.heading_text = heading_text_data;
  data.welcome_data.image_data.username_text = username_text_data;
  data.welcome_data.image_data.tagline_text = tagline_text_data;
  data.welcome_data.image_data.backgrund_url = backgrund_url_input;
  data.welcome_data.image_data.avatar_profile_hex = parseHexColor(avatar_profile_hex) || 'FFFFFF';
  data.welcome_data.image_data.color_text_hex = parseHexColor(color_text_hex) || 'FFFFFF';
  data.welcome_data.embed = isAccepted(embed_enabled);
  data.welcome_data.embed_color = parseHexColor(embed_hex) || 'FFFFFF';
  data.welcome_data.image_embed = isAccepted(embed_image);
  await client.db.set(`data_${guild.id}`, data);
} else {
 await client.db.set(`data_${guild.id}`, {
    "guild_id": String(member.guild.id),
    "welcome_enabled": isAccepted('true'),
    "welcome_data": {
      "message": message_input_data, 
      "channel_id": to_send_channel.id,
      "image_enabled": isAccepted(image_enabled),
      "image_data": {
        "heading_text": heading_text_data,
        "username_text": username_text_data,
        "tagline_text": tagline_text_data,
        "backgrund_url": backgrund_url_input,
        "avatar_profile_hex": parseHexColor(avatar_profile_hex) || 'FFFFFF',
        "color_text_hex": parseHexColor(color_text_hex) || 'FFFFFF'
      },
      "embed": isAccepted(embed_enabled),
      "embed_color": parseHexColor(embed_hex) || 'FFFFFF',
      "image_embed": isAccepted(embed_image)
    }
  });
}


 

      const confirm_embed = new EmbedBuilder()
           .setTitle(`Welcome Setup Success`)
        .setColor(`#${embed_hex}`)
        .setFooter({ text: ee.footertext, iconURL: ee.footericon})
      .setDescription("This will be the message if someone joins the server \n \n" + `> ${await replaceMessagePlaceholders(message_input_data, member)}`)
      .addFields({
        name: "Welcome Channel",
        value: `<#${to_send_channel.id}>`,
        inline: true
      },
                 {
        name: "Image",
        value: isAccepted(image_enabled) ? `Enabled ${client.emojis.cache.get("1098471096107405392").toString()}` : `Disabled ${client.emojis.cache.get("1098471341893623900").toString()}`,
        inline: true
      },
                {
        name: "Embed",
        value: isAccepted(embed_enabled) ? `Enabled ${client.emojis.cache.get("1098471096107405392").toString()}` : `Disabled ${client.emojis.cache.get("1098471341893623900").toString()}`,
        inline: true
      },
                {
        name: "Image Embed",
        value: isAccepted(embed_image) ? `Enabled ${client.emojis.cache.get("1098471096107405392").toString()}` : `Disabled ${client.emojis.cache.get("1098471341893623900").toString()}`,
        inline: true
      }, 
                 {
                   name: `Image Example`,
                   value: `[Go to Image](https://api.tejas404.xyz/image/custom_card_v1?mainText=${encodeURIComponent(await replaceMessagePlaceholders(heading_text_data, member))}&nicknameText=${encodeURIComponent(await replaceMessagePlaceholders(username_text_data, member ))}&secondText=${encodeURIComponent(await replaceMessagePlaceholders(tagline_text_data, member))}&backgroundImgURL=${backgrund_url_input}&avatarImgURL=${member.user.displayAvatarURL({ extension: 'png' })}&avatarBorderColor=${parseHexColor(avatar_profile_hex) || "FFFFFF"}&colorTextDefault=${parseHexColor(color_text_hex) || "FFFFFF"})`,
                   inline: false
                 })
      .setImage(`https://api.tejas404.xyz/image/custom_card_v1?mainText=${encodeURIComponent(await replaceMessagePlaceholders(heading_text_data, member))}&nicknameText=${encodeURIComponent(await replaceMessagePlaceholders(username_text_data, member ))}&secondText=${encodeURIComponent(await replaceMessagePlaceholders(tagline_text_data, member))}&backgroundImgURL=${backgrund_url_input}&avatarImgURL=${member.user.displayAvatarURL({ extension: 'png' })}&avatarBorderColor=${parseHexColor(avatar_profile_hex) || "FFFFFF"}&colorTextDefault=${parseHexColor(color_text_hex) || "FFFFFF"}`)
      
      const xd = await submit.reply({
        embeds: [confirm_embed]
      })

		} catch (e) {
			console.log(String(e.stack).bgRed)
		}
	}
}

async function replaceMessagePlaceholders(message, member) {
  message = message.replace(/{user}/g, `${member}`);
  message = message.replace(/{server}/g, member.guild.name);
  message = message.replace(/{membercount}/g, member.guild.memberCount);
  message = message.replace(/{username}/g, member.user.tag);

  let emoji_check = message.match(/{:([a-zA-Z0-9-_~]+)}/g);
  if (emoji_check) {
    for (const emoji of emoji_check) {
      const rep = await member.guild.emojis.cache.find(
        e => e.name === emoji.substring(2, emoji.length - 1)
      );
      if (rep) {
        message = message.replace(emoji, rep.toString());
      }
    }
  }
  return message;
}

function isAccepted(input) {
  const acceptedWords = ['y', 'yes', 'true', '1'];
  const deniedWords = ['n', 'no', 'false', '0'];

  if (acceptedWords.includes(input.toLowerCase())) {
    return true;
  } else if (deniedWords.includes(input.toLowerCase())) {
    return false;
  } else {
    throw new Error('Invalid input');
  }
}

const http = require('http');
const https = require('https');
const url = require('url');

async function isImageUrl(inputUrl) {
  try {
    const options = url.parse(inputUrl);

    const protocol = options.protocol === 'https:' ? https : http;

    const res = await new Promise((resolve, reject) => {
      protocol.get(options, (res) => {
        resolve(res);
      }).on('error', (error) => {
        reject(error);
      });
    });

    const contentType = res.headers['content-type'];
    return contentType && contentType.startsWith('image/');
  } catch (error) {
    return false;
  }
}

function isHexColor(inputString) {
  // Remove '#' prefix if present
  const hex = inputString.replace(/^#/, '');

  // Check if hex string contains only valid hex characters (0-9 and A-F)
  const isOnlyHexCharacters = /^[0-9A-F]{6}$/i.test(hex);

  return isOnlyHexCharacters;
}

function parseHexColor(inputString) {
  // Remove '#' prefix if present
  const hex = inputString.replace(/^#/, '');

  // Check if hex string contains only valid hex characters (0-9 and A-F)
  const isOnlyHexCharacters = /^[0-9A-F]{6}$/i.test(hex);

  if (isOnlyHexCharacters) {
    return hex.toUpperCase();
  } else {
    return null;
  }
}


