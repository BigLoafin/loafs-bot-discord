const { rules, roleMap, RULES_MESSAGE_ID, SELECTROLES_MESSAGE_ID } = require('../config.json');

module.exports.add = async (reaction, user) => {
	if (reaction.message.id === SELECTROLES_MESSAGE_ID) {
		const roleName = roleMap[reaction.emoji.name];
		if (!roleName) return;
		const guild = reaction.message.guild;
		const member = await guild.members.fetch(user.id);
		console.log('Reaction added:', reaction.emoji.name, 'by', user.tag);
		const role = guild.roles.cache.find(r => r.name === roleName);
		if (role && member) {
			await member.roles.add(role);
			if (roleName === 'Challenger') {
				const owner = await guild.fetchOwner();
				const channelId = "1348384273450664007";
				const channel = guild.channels.cache.get(channelId);
				console.log('added Challenger')
				if (channel) {
					await channel.send(`{owner.user}, ${user.globalName || user.tag} has started the Super Wizard Challenge!\nGood luck, ${user.globalName || user.tag}!`);
				}
			}
			console.log(`Added role ${roleName} to ${user.tag}`);
		}
	}
	else if (reaction.message.id === RULES_MESSAGE_ID) {
	    // Agreeing to terms assigns the role to the user
		if (user.bot) return;
		const roleName = rules.map[reaction.emoji.name];
		if (!roleName) return;
		const guild = reaction.message.guild;
		const member = await guild.members.fetch(user.id);
		const role = guild.roles.cache.find(r => r.name === roleName);
		if (role && member) {
			await member.roles.add(role);
			console.log(`Added role ${roleName} to ${user.tag}`);
		}
	}
	else {
		return;
	}
};

module.exports.remove = async (reaction, user) => {
	if (reaction.message.id === SELECTROLES_MESSAGE_ID) {
		const roleName = roleMap[reaction.emoji.name];
		if (!roleName) return;
		const guild = reaction.message.guild;
		const member = await guild.members.fetch(user.id);
		console.log('Reaction removed:', reaction.emoji.name, 'by', user.tag);
		const role = guild.roles.cache.find(r => r.name === roleName);
		if (role && member) {
			await member.roles.remove(role);
			console.log(`Removed role ${roleName} from ${user.tag}`);
		}
	}
	else if (reaction.message.id === RULES_MESSAGE_ID) {
	    // Disagreeing to terms assigns the role to the user
		if (user.bot) return;
		const roleName = rules.map[reaction.emoji.name];
		if (!roleName) return;
		const guild = reaction.message.guild;
		const member = await guild.members.fetch(user.id);
		const role = guild.roles.cache.find(r => r.name === roleName);
		if (role && member) {
			await member.roles.remove(role);
			console.log(`Removed role ${roleName} from ${user.tag}`);
		}
	}
	else {
		return;
	}
};

// Map of emoji to role names in config.json
// Example: { '🧭': 'Adventurer', '🤺': 'Guardian', '🧙': 'Magic wielder' }

/* NOTE: Discord supports limited Markdown formatting in messages:
 - Bold: **text** or __text__
 - Italic: *text* or _text_
 - Underline: __text__
 - Strikethrough: ~~text~~
 - Headers: # Header, ## Header, etc.
 - Code blocks: ```code``` or `inline code`
 - Bullet points: - text or * text
 - Numbered lists: 1. text, 2. text

 Discord does NOT support HTML or Markdown tables
 For structured information, use bullet points, 
 code blocks or emoji + text formatting
*/

// Example posts:
/*

## Choose your roles by reacting to the message!
- You can choose multiple roles, and you can remove them by removing your reaction.

- 🤼: Adventurer
- 🤺: Guardian
- 🧙: Magic wielder

*/

/*

## Rules
- No spamming or trolling
- No NSFW content
- No hate speech or harassment
- No cheating or exploiting in games
- Be excellent to each other

Agree by reacting with ✅ to the message below:

*/