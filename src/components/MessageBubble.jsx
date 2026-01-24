const MessageBubble = ({ message }) => {
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center">
        <div className="bg-yellow-100 border border-yellow-200 rounded-lg px-4 py-2 max-w-md">
          <span className="text-sm text-yellow-800">{message.text}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-md rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-blue-600 text-white'
            : message.isError
            ? 'bg-red-100 text-red-800'
            : 'bg-white text-gray-800 shadow-sm border'
        }`}
      >
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default MessageBubble;