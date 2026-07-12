// app.js - Command Line Application
import readline from 'readline';
import { getBotResponse } from './chatbot.js';

// Setup readline interface for terminal input/output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('---------------------------------------------------');
console.log(' Welcome to the IT Tech Support Chatbot CLI!');
console.log('   (Type "exit" or "quit" to leave)');
console.log('---------------------------------------------------\n');

function askQuestion() {
    rl.question('\nYou: ', (userInput) => {
        // Exit condition
        if (userInput.toLowerCase().trim() === 'exit' || userInput.toLowerCase().trim() === 'quit') {
            console.log('\nBot: Goodbye! Hope your tech issues are resolved!\n');
            rl.close();
            return;
        }

        // Pass input to the domain module and log response
        const botReply = getBotResponse(userInput);
        console.log(`Bot: ${botReply}`);

        // Loop back to ask another question
        askQuestion();
    });
}

// Start prompt loop
askQuestion();