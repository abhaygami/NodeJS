const knowledgeBase = [
    {
        keywords: ['wifi', 'internet', 'network', 'connection'],
        response: "Try resetting your router by unplugging it for 30 seconds. If that doesn't work, verify your network settings."
    },
    {
        keywords: ['password', 'login', 'reset', 'account'],
        response: "You can reset your password at https://arthapulse.app/user/login or contact admin."
    },
    {
        keywords: ['slow', 'lag', 'freeze', 'performance'],
        response: "Close unused background applications and check Task Manager / Activity Monitor to see if high CPU or RAM memory is being used."
    },
    {
        keywords: ['okay', 'thanks', 'appreciate'],
        response: "You're welcome! Is there anything else I can help you with?"
    }
];

export function getBotResponse(input) {
    const text = input.toLowerCase().trim();

    if (['hi', 'hello', 'hey'].includes(text)) {
        return "Hello! I am your IT Support Bot. What technical issue are you facing today?";
    }

    // Check input against domain keywords
    for (const item of knowledgeBase) {
        const matched = item.keywords.some(keyword => text.includes(keyword));
        if (matched) {
            return item.response;
        }
    }

    // if no keywords match
    return "I'm not sure about that technical issue. Please email IT Support at support@company.com.";
}