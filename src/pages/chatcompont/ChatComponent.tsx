import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { BsSend } from 'react-icons/bs';
import { auth, db } from '../firebase/firebase'; // Firebase setup file

interface Message {
  sender: string;  // Sender's name (e.g., user.displayName)
  text: string;    // Message text
  timestamp: string; // Timestamp of message
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const userName = auth.currentUser?.displayName || 'Unknown User'; // Fetch the current user's name

  // UseEffect to load messages from Firebase Firestore in real-time
  useEffect(() => {
    const q = query(collection(db, 'chat'), orderBy('timestamp', 'asc')); // Ordering messages by timestamp
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => doc.data() as Message);
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();  // Clean up listener when component unmounts
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) return;  // Prevent empty messages from being sent

    const newMessage: Message = {
      sender: userName,  // Use the current user's name
      text: input,
      timestamp: new Date().toISOString(),  // Timestamp to order messages
    };

    setLoading(true);
    
    try {
      // Save the message to Firestore
      await addDoc(collection(db, 'chat'), newMessage);
      setInput(''); // Clear input after message is sent
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#1d1e26] text-white">
      <header className="p-4 bg-[#292b38] text-xl font-semibold text-center">User Chat</header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === userName ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-3 max-w-xs md:max-w-md text-sm rounded-lg ${
                msg.sender === userName ? 'bg-[#ff5e84] text-white' : 'bg-[#292b38] text-gray-300'
              }`}
            >
              <div className="font-semibold text-sm">{msg.sender}</div> {/* Display sender's name */}
              <div>{msg.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-[#292b38] flex items-center space-x-4">
        <input
          type="text"
          className="flex-1 p-3 bg-transparent border border-gray-500 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e84]"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          onClick={handleSendMessage}
          className="p-3 bg-[#ff5e84] rounded-full text-white hover:bg-[#ff6a92] transition duration-200"
          disabled={loading || !input.trim()}
        >
          <BsSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
