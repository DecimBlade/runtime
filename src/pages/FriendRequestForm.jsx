import firebase from 'firebase/app';
import 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase.js';


// send friend request function
const sendFriendRequest = async (senderUsername, receiverUsername) => {
  try {
    // get sender and receiver user objects
    const [senderUser, receiverUser] = await Promise.all([
      db.collection('users').where('username', '==', senderUsername).get(),
      db.collection('users').where('username', '==', receiverUsername).get()
    ]);

    // check if sender and receiver exist
    if (senderUser.empty) {
      throw new Error('Sender user does not exist');
    }
    if (receiverUser.empty) {
      throw new Error('Receiver user does not exist');
    }

    // get sender and receiver user IDs
    const senderUserId = senderUser.docs[0].id;
    const receiverUserId = receiverUser.docs[0].id;

    // add friend request to receiver's pending-friends subcollection
    await db.collection('users').doc(receiverUserId).collection('pending-friends').add({
      sender: senderUserId,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    console.log('Friend request sent successfully!');
  } catch (error) {
    console.error(error);
  }
};

// form component that retrieves friend's username
export const FriendRequestForm = () => {
  const [friendUsername, setFriendUsername] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    sendFriendRequest('senderUsername', friendUsername);
  };

  const handleChange = (event) => {
    setFriendUsername(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Friend username:
        <input type="text" value={friendUsername} onChange={handleChange} />
      </label>
      <button type="submit">Send friend request</button>
    </form>
  );
};


