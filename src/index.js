const { Client, IntentsBitField, ChannelType, Collection, Events, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('../config.json');
const messageReactions = require('../events/messageReactions.js');
const { interactionHandler } = require('../events/interactionHandler.js');
const { messageHandler } = require('../events/messageHandler.js');
const { DMHandler } = require('../events/DMHandler.js');
const fs = require('node:fs');
const path = require('node:path');


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMembers,
    IntentsBitField.Flags.DirectMessages, 
    IntentsBitField.Flags.DirectMessageTyping,
    IntentsBitField.Flags.DirectMessageReactions
  ],
	partials: [Partials.Message, Partials.Reaction, Partials.User],
});


client.on('ready', () => {
  console.log(`Client logged in as ${client.user.tag}!`);
});

client.on('messageReactionAdd', async (reaction, user) => {
	await messageReactions.add(reaction, user);
});

client.on('messageReactionRemove', async (reaction, user) => {
	await messageReactions.remove(reaction, user);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  // console.log('Raw message received:', message.content);
  /* console.log('Message event received:', {
    author: message.author.tag,
    content: message.content,
    isDM: !message.guild,
    channel: message.channel.type
  });*/

  // Check explicitly for DM channel type
  if (message.channel.type === ChannelType.DM) {
    return DMHandler(message);
  }
  
  // Existing server message handling code continues below
  messageHandler(message);
});

client.on('interactionCreate', async (interaction) => {
	// console.log('interaction', interaction);
	await interactionHandler(interaction);
});

client.login(token);

client.commands = new Collection();
const foldersPath = path.join(__dirname, '../commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
			// Register aliases if they exist
			if (command.aliases) {
				for (const alias of command.aliases) {
					client.commands.set(alias, command);
				}
			}
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
