module.exports.DMHandler = (message) => {
    // console.log('DM received:', message.content);
        // console.log(`Received DM from ${message.author.tag}: ${message.content}`);
        
        if (message.content.toLowerCase() === 'help') {
          message.reply("Here are commands you can use in DMs:\n• help - Shows this message\n• ping - Check if I'm online\n• about - Learn more about me");
        } else if (message.content.toLowerCase() === 'ping') {
          message.reply("Pong! I'm here and listening.");
        } else if (message.content.toLowerCase() === 'about') {
          message.reply("I'm Loaf's Bot, a friendly Discord bot. I help manage servers and respond to various commands.");
        } else {
          message.reply("Hello! I'm Loaf's Bot. You can type 'help' to see what commands I support in DMs.");
        }
        
        return; // Exit the function to avoid processing server-specific commands
};