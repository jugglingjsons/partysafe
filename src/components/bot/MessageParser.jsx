// MessageParser.jsx
const MessageParser = ({ actionProvider }) => {
  const parse = (message) => {
    const userMessage = message.content.toLowerCase();

    // Check for specific keywords or patterns in user input and call relevant actions
    if (userMessage.includes("tell me about")) {
      actionProvider.answerQuestion(message);
    } else if (userMessage.includes("hello")) {
      actionProvider.greetUser();
    } else if (userMessage.includes("help")) {
      actionProvider.showHelp();
    } else {
      actionProvider.defaultResponse();
    }
  };

  return <div>{parse}</div>;
};

export default MessageParser;
