//Import Modules
const config = require(`../../botconfig/config.js`);
const ee = require(`../../botconfig/embed.js`);
const settings = require(`../../botconfig/settings.js`);
const Discord = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = async (client, member) => {
  try {
const data = await client.db.get(`data_${member.guild.id}`)
// If there is no welcome data for this guild or if the guild doesn't exist, return.
if (!data || !client.guilds.cache.get(data.guild_id)) {
  return;
}

// If welcome messages are not enabled for this guild, return.
if (!data.leave_enabled) {
  return;
}
// If welcome channel is not found for this guild, return.
if(!data.leave_data.channel_id) {
  return;
}

 const leave_channel = client.channels.cache.get(data.leave_data.channel_id)
// If leave channel is not found for this guild, return.
if(!leave_channel) {
  return;
}
// If there is leave data for this guild, format the message.
if (data.leave_data) {
  let leave_msg = await replaceMessagePlaceholders(data.leave_data.message, member);
 let nicknameText = data.leave_data.image_data.username_text || `{username}`;
 

    let secondText = data.leave_data.image_data.tagline_text || `{membercount}`;

  // Create an image attachment for the leave message if enabled.
  let image_toBuffer;
  if (data.leave_data.image_enabled) {
   

    image_toBuffer = new Discord.AttachmentBuilder(
      `https://api.tejas404.xyz/image/custom_card_v1?mainText=${encodeURIComponent(await replaceMessagePlaceholders(data.leave_data.image_data.heading_text, member) || "Welcome!")}&nicknameText=${encodeURIComponent(await replaceMessagePlaceholders(nicknameText, member))}&secondText=${encodeURIComponent(await replaceMessagePlaceholders(secondText, member) || `You lllll`)}&backgroundImgURL=${data.leave_data.image_data.backgrund_url || "https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F1248619427%2Fphoto%2Fretro-futuristic-city-flythrough-background-80s-sci-fi-landscape-in-space.jpg%3Fb%3D1%26s%3D170667a%26w%3D0%26k%3D20%26c%3DhLmRgItKjP0h5IboMbZC-TSp63ThuncI9880Glb1m_Y%3D"}&avatarImgURL=${member.user.displayAvatarURL({ 
extension: 'png' })}&avatarBorderColor=${data.leave_data.image_data.avatar_profile_hex || "FFFFFF"}&colorTextDefault=${data.leave_data.image_data.color_text_hex || "FFFFFF"}`
    ).setDescription(`Leave Image for member`).setName(`Tejas404_Leave.png`);
  } else {
    image_toBuffer = null;
  }
// check if embed should be used or not
if(!data.leave_data.embed) {
  // send message with content and file
  return leave_channel.send({
    content: leave_msg,
    files: [image_toBuffer]
  });
} else {
  // create new embed with description
  const leave_embed = new Discord.EmbedBuilder()
  .setDescription(leave_msg)
  .setColor(`#${data.leave_data.embed_color || 'FFFFFF'}`)
  // check if image should be embedded
  if(data.leave_data.image_embed) {
    // generate image URL with parameters
    leave_embed.setImage(`https://api.tejas404.xyz/image/custom_card_v1?mainText=${encodeURIComponent(await replaceMessagePlaceholders(data.leave_data.image_data.heading_text, member) || "Leave!")}&nicknameText=${encodeURIComponent(await replaceMessagePlaceholders(nicknameText, member))}&secondText=${encodeURIComponent(await replaceMessagePlaceholders(secondText, member) || `You are the member number #${member.guild.memberCount}`)}&backgroundImgURL=${data.welcome_data.image_data.backgrund_url || "https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F1248619427%2Fphoto%2Fretro-futuristic-city-flythrough-background-80s-sci-fi-landscape-in-space.jpg%3Fb%3D1%26s%3D170667a%26w%3D0%26k%3D20%26c%3DhLmRgItKjP0h5IboMbZC-TSp63ThuncI9880Glb1m_Y%3D"}&avatarImgURL=${member.user.displayAvatarURL({ 
extension: 'png' })}&avatarBorderColor=${data.leave_data.image_data.avatar_profile_hex || "FFFFFF"}&colorTextDefault=${data.leave_data.image_data.color_text_hex || "FFFFFF"}`
    )
    // send message with embed
    return leave_channel.send({
      embeds: [leave_embed]
    });
  } else {
    // send message with embed and file
    return leave_channel.send({
      embeds: [leave_embed],
      files: [image_toBuffer]
    });
  }
}

} else {
  // If there is no welcome message for this guild, return.
  return;
}
} catch(e) {
    console.log(e)
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
