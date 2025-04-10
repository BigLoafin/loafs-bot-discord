module.exports.messageHandler = (message) => {
    if (message.content.match(/^\//)) {
    // Check for all possible line break characters
    if (message.content.match(/[\r\n\v\f]/)) {
      message.reply('Looks like you included a line break there. The slash commands won\'t work that way.');
    }
    else {
      message.reply('That command isn\'t registered.');
    }
    message.react('🫣');
  }
 
  if (message.content.match(/^dm me(,|) loaf('|)(s|)( |)bot$/i)){
    message.author.send('Ping!');
    message.react('📩');
    return;
  }

    
	if (message.content.toLowerCase().trim() === 'ping') {
		message.reply('pong');
	}
	else if (message.content.toLowerCase().trim() === 'test') {
		message.reply('Test successful.');
	}
	else if (message.content.toLowerCase().trim() === 'tag me') {
		message.reply('<@!' + message.author + '>');
	}
	
  // Replace the multiple greeting/farewell checks with this more structured approach
  if (message.content.match(/\loaf('|)(s|)( |)bot\b/i)) {
    // Loaf's Bot was directly addressed
    
    // Check for greetings
    if (message.content.match(/\b(h(e|a)llo|hi|hey|howdy|greetings|good morning|good day)[\s,.!?]?/i)) {
      const randomGreetings = [
        "Hello there!",
        "Hi! How are you today?",
        "Hey! Nice to see you!",
        "Greetings! How can I help?",
        "Good day to you too!"
      ];
      message.reply(randomGreetings[Math.floor(Math.random() * randomGreetings.length)]);
      message.react('👋');
      return; // Prevent further processing
    }
    
	// Check for the George Burns joke pattern
    else if (message.content
		.replace(/["',.!?]/g, "") // Remove quotes, commas, periods, exclamation marks, question marks
		.replace(/\s+/g, " ")     // Normalize spaces
		.toLowerCase()
		.includes("say good night")) 
	  {
		message.reply("Good night, Loaf's Bot. 🙄");
		message.react('😒');
		return;
	  }
	  
    // Check for farewells
    else if (message.content.match(/\b(goodbye|bye|see ya|good night|farewell|later)\b/i)) {
      const randomFarewells = [
        "See you later!",
        "Goodbye for now!",
        "Take care!",
        "Until next time!",
      ];
      message.reply(randomFarewells[Math.floor(Math.random() * randomFarewells.length)]);
      message.react('👋');
      return; // Prevent further processing
    }

    // If Loaf's Bot is addressed but not with a greeting/farewell/joke
    else {
      message.react('👀');
    }
  } else {
    // Loaf's Bot wasn't directly addressed, but we can still react to general greetings
    if (message.content.match(/\b(hello|hi|hey)[\s,.!?]?/i) && 
        !message.content.includes('@') &&  // Avoid reacting to greetings for others
        Math.random() < 0.3) {  // Only react 30% of the time to avoid being annoying
      message.react('👋');
    }
  }
};