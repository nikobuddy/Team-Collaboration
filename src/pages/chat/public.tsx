import {
  DocumentData,
  QueryDocumentSnapshot,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase';

import { signOut } from 'firebase/auth';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp?: {
      seconds: number;
      nanoseconds: number;
  };
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isPublicChat, setIsPublicChat] = useState(true);
  const publicMessagesRef = collection(db, 'publicMessages');
  const privateMessagesRef = collection(db, 'privateMessages');

  useEffect(() => {
      const messagesRef = isPublicChat ? publicMessagesRef : privateMessagesRef;
      const q = query(messagesRef, orderBy('timestamp', 'asc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
          setMessages(
              snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
                  id: doc.id,
                  ...doc.data(),
              })) as Message[]
          );
      });
      return unsubscribe;
  }, [isPublicChat]);

  const sendMessage = async (e: React.FormEvent) => {
      e.preventDefault();
      if (newMessage.trim() && auth.currentUser) {
          const messagesRef = isPublicChat ? publicMessagesRef : privateMessagesRef;

          await addDoc(messagesRef, {
              text: newMessage,
              sender: auth.currentUser.displayName || 'Anonymous',
              timestamp: serverTimestamp(),
              ...(isPublicChat ? {} : { recipientId: 'userIDOfRecipient' }), // replace with recipient ID for private messages
          });
          setNewMessage('');
      }
  };

  const formatTimestamp = (timestamp: Message['timestamp']) => {
      if (!timestamp) return '';
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
          month: 'short',
          day: 'numeric',
          year: 'numeric',
      });
  };

  return (
      <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <header className="flex justify-between items-center p-4 bg-indigo-700 shadow-md text-white">
              <h2 className="text-xl font-semibold">
                  {isPublicChat ? 'Public Chat' : 'Private Chat'}
              </h2>
              <button
                  onClick={() => setIsPublicChat(!isPublicChat)}
                  className="text-sm bg-blue-500 px-4 py-1 rounded-lg hover:bg-blue-600 transition"
              >
                  Switch to {isPublicChat ? 'Private' : 'Public'} Chat
              </button>
              <button
                  onClick={() => signOut(auth)}
                  className="text-sm bg-red-500 px-4 py-1 rounded-lg hover:bg-red-600 transition ml-2"
              >
                  Logout
              </button>
          </header>

          <div className="flex flex-col flex-grow">
              <div className="flex-grow p-4 overflow-y-auto space-y-4">
                  {messages.map((message) => (
                      <div
                          key={message.id}
                          className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl shadow-md ${
                              message.sender === auth.currentUser?.displayName
                                  ? 'bg-indigo-600 text-white self-end ml-auto'
                                  : 'bg-white text-gray-800'
                          }`}
                      >
                          <p className="text-xs font-semibold mb-1">{message.sender}</p>
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs text-gray-400 mt-1">
                              {formatTimestamp(message.timestamp)}
                          </p>
                      </div>
                  ))}
              </div>

              <form onSubmit={sendMessage} className="flex items-center p-4 bg-gray-100 border-t border-gray-300">
                  <input
                      type="text"
                      placeholder={`Type a message in ${isPublicChat ? 'public' : 'private'} chat...`}
                      className="flex-grow p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button
                      type="submit"
                      className="ml-3 p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                  >
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-5 h-5"
                      >
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 4v8"
                          />
                      </svg>
                  </button>
              </form>
          </div>
      </div>
  );
};

export default Chat;
