import React, { useState, useEffect } from 'react';
import { db } from '../../firebase.js';
import { useAuth } from '../../pages/auth/contexts/AuthContext.js';

const Chat = ({ currentUser }) => {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .users
      .doc(currentUser.uid)
      .collection('friends')
      .onSnapshot((snapshot) => {
        const friendsList = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setFriends(friendsList);
      });
    return unsubscribe;
  }, [db, currentUser.uid]);

  useEffect(() => {
    const unsubscribe = db
      .users
      .doc(currentUser.uid)
      .collection('friends')
      .doc(selectedFriend?.id)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const messagesList = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setMessages(messagesList);
      });
    return unsubscribe;
  }, [db, currentUser.uid, selectedFriend?.id]);

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
  };

  const handleSendMessage = (message) => {
    const { uid, displayName, photoURL } = currentUser;
    db.collection('users')
      .doc(currentUser.uid)
      .collection('messages')
      .doc(selectedFriend.id)
      .collection('messages')
      .add({
        text: message,
        createdAt: db.FieldValue.serverTimestamp(),
        senderId: uid,
        senderName: displayName,
        senderPhotoURL: photoURL,
      });
  };

  return (
    <div>
      <h2>Direct Messages</h2>
      <div>
        <h3>Friends</h3>
        <ul>
          {friends.map((friend) => (
            <li key={friend.id} onClick={() => handleSelectFriend(friend)}>
              {friend.displayName}
            </li>
          ))}
        </ul>
      </div>
      {selectedFriend && (
        <div>
          <h3>Conversation with {selectedFriend.displayName}</h3>
          <ul>
            {messages.map((message) => (
              <li key={message.id}>
                <strong>{message.senderName}: </strong>
                {message.text}
              </li>
            ))}
          </ul>
          <form onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(e.target.elements.message.value);
              e.target.reset();
            }}>
            <input type="text" name="message" placeholder="Type your message here" />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;

