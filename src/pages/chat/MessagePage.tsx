import React, { useEffect, useState } from 'react';
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

import { useParams } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Timestamp; // Use Firestore's Timestamp type
}

const MessagePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) return;

    const messagesRef = collection(db, 'messages');
    const q = query(
      messagesRef,
      where('participants', 'array-contains', currentUser.uid),
      orderBy('timestamp')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs
        .filter((doc) => doc.data().participants.includes(userId))
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[];
      setMessages(msgs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId, currentUser]);

  const sendMessage = async () => {
    if (newMessage.trim() === '' || !currentUser) return;

    const messageData = {
      text: newMessage,
      senderId: currentUser.uid,
      participants: [currentUser.uid, userId],
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'messages'), messageData);
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-100 to-blue-200">
      <header className="bg-indigo-600 text-white p-4 text-lg font-semibold flex justify-center">
        Chat with User
      </header>
      <div className="flex-grow p-4 overflow-y-auto">
        {loading ? (
          <p className="text-gray-700 text-center">Loading messages...</p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.senderId === currentUser?.uid ? 'justify-end' : 'justify-start'
                }`}
              >
                <p
                  className={`${
                    msg.senderId === currentUser?.uid ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-900'
                  } p-3 rounded-lg max-w-xs shadow-md`}
                >
                  {msg.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <footer className="p-4 bg-white border-t flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
        />
        <button
          onClick={sendMessage}
          className="ml-2 p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-200"
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default MessagePage;
