import { format } from 'date-fns';
import { addDoc, collection, getDocs, onSnapshot, orderBy, query, serverTimestamp, Timestamp, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';

interface Message {
    id: string;
    text: string;
    senderId: string;
    recipientId: string;
    timestamp: Timestamp | null;
}

interface User {
    uid: string;
    name: string;
}

const PrivateChatPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const currentUser = auth.currentUser;

    useEffect(() => {
        const fetchUsers = async () => {
            const usersCollection = await getDocs(collection(db, 'users'));
            const fetchedUsers = usersCollection.docs.map((doc) => ({
                uid: doc.id,
                ...doc.data(),
            })) as User[];
            setUsers(fetchedUsers);
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        if (!selectedUser || !currentUser) return;

        const messagesRef = collection(db, 'privateMessages');
        const q = query(
            messagesRef,
            where('participants', 'array-contains', currentUser.uid),
            orderBy('timestamp', 'asc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedMessages = snapshot.docs
                .filter((doc) => {
                    const data = doc.data();
                    return (
                        (data.senderId === currentUser.uid && data.recipientId === selectedUser.uid) ||
                        (data.senderId === selectedUser.uid && data.recipientId === currentUser.uid)
                    );
                })
                .map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Message[];
            setMessages(fetchedMessages);
        });

        return () => unsubscribe();
    }, [selectedUser, currentUser]);

    const sendMessage = async () => {
        if (newMessage.trim() === '' || !currentUser || !selectedUser) return;

        const messageData = {
            text: newMessage,
            senderId: currentUser.uid,
            recipientId: selectedUser.uid,
            timestamp: serverTimestamp(),
            participants: [currentUser.uid, selectedUser.uid],
        };

        await addDoc(collection(db, 'privateMessages'), messageData);
        setNewMessage('');
    };

    const getInitials = (name: string) => name ? name.charAt(0).toUpperCase() : '';

    return (
        <div className="flex h-screen bg-gray-100">
            {/* User List Sidebar */}
            <div className="w-1/4 bg-white border-r overflow-y-auto">
                <h2 className="p-4 font-bold text-gray-700 border-b">Users</h2>
                <div>
                    {users.map((user) => (
                        <div
                            key={user.uid}
                            className={`flex items-center p-4 cursor-pointer hover:bg-indigo-100 ${
                                selectedUser?.uid === user.uid ? 'bg-indigo-200' : ''
                            }`}
                            onClick={() => setSelectedUser(user)}
                        >
                            <div className="w-8 h-8 flex items-center justify-center bg-indigo-500 text-white rounded-full mr-3">
                                {getInitials(user.name)}
                            </div>
                            <p className="font-semibold text-gray-800">{user.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex flex-col w-3/4">
                <header className="flex items-center p-4 bg-indigo-600 text-white">
                    <h2 className="text-lg font-semibold">{selectedUser ? `Chat with ${selectedUser.name}` : 'Select a user to chat'}</h2>
                </header>

                {/* Messages Display */}
                <div className="flex-grow p-4 overflow-y-auto bg-gray-50 space-y-4">
                    {messages.map((message) => {
                        const isCurrentUser = message.senderId === currentUser?.uid;
                        return (
                            <div
                                key={message.id}
                                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex ${isCurrentUser ? 'flex-row-reverse' : ''} items-end`}>
                                    <div className={`w-8 h-8 flex items-center justify-center bg-indigo-500 text-white rounded-full ${isCurrentUser ? 'ml-2' : 'mr-2'}`}>
                                        {getInitials(isCurrentUser ? currentUser.displayName || '' : selectedUser?.name || '')}
                                    </div>
                                    <div
                                        className={`max-w-xs md:max-w-md p-3 rounded-lg shadow-md ${
                                            isCurrentUser ? 'bg-indigo-500 text-white' : 'bg-white text-gray-800'
                                        }`}
                                    >
                                        <p>{message.text}</p>
                                        <span className="block text-xs text-gray-400 mt-1">
                                            {message.timestamp ? format(message.timestamp.toDate(), 'PPpp') : 'Sending...'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Message Input */}
                {selectedUser && (
                    <footer className="p-4 border-t bg-white">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                sendMessage();
                            }}
                            className="flex"
                        >
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-grow p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                type="submit"
                                className="ml-3 p-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-200"
                            >
                                Send
                            </button>
                        </form>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default PrivateChatPage;
