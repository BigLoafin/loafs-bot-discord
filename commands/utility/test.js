const { SlashCommandBuilder } = require('discord.js');
const { botName } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription(`Test ${botName}'s connection`),
	async execute(interaction) {
		await interaction.reply({ content: `PING ${botName} (127.0.0.1) 56(84) bytes of data.`, flags: 64 });
		await interaction.followUp({ content: `64 bytes from ${botName} (127.0.1.1): icmp_seq=${0 + 1} ttl=106 time=${Date.now()} ms`, flags: 64 });
	},
};
