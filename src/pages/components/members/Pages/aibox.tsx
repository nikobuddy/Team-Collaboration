import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const AIBox: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
  
    // Add user message to chat
    const newMessages = [
      ...messages,
      { sender: 'user' as 'user', text: input },
    ]; // Explicitly cast sender to the required type
    setMessages(newMessages);
    setInput('');
    setLoading(true);
  
    try {
      // Replace with your API call logic
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await response.json();
  
      // Add AI response to chat
      setMessages((prev) => [
        ...prev,
        { sender: 'ai' as 'ai', text: data.response || 'Error processing request.' },
      ]); // Explicitly cast sender to 'ai'
    } catch (error) {
      console.error('Error communicating with AI:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'ai' as 'ai', text: 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen bg-[#1d1e26] text-white">
      {/* Header */}
      <div className="bg-[#292b38] p-4 shadow-md">
        <h1 className="text-xl font-bold text-center">AI Chat Assistant</h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-center text-gray-400">Start a conversation with AI...</p>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-lg ${
                message.sender === 'user'
                  ? 'bg-[#ff5e84] ml-auto text-white'
                  : 'bg-[#292b38] text-gray-300'
              }`}
            >
              {message.text}
            </div>
          ))
        )}
        {loading && <p className="text-center text-gray-400">AI is typing...</p>}
      </div>

      {/* Input Section */}
      <div className="bg-[#292b38] p-4">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e84]"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || loading}
            className="p-3 bg-[#ff5e84] rounded-full text-white hover:bg-[#ff6a92] transition duration-200"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIBox;
