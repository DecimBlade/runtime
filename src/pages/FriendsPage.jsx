import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import React, { useRef, useState } from 'react';
import '../App.css';
import { useAuth } from "./auth/contexts/AuthContext";
import { auth, db } from '../firebase';
import FriendsList from './FriendsList';
import ChatApp from '../components/chat/Chat.jsx';

export default function FriendsPage() {
    const usernameRef = useRef()
    const {currentUser} = useAuth()
    const [inputValue, setInputValue] = useState('')

    const [username, setUsername] = useState('');

    const [addFriendError, setAddFriendError] = useState('')
    const user = auth.currentUser;

    const friendRequestRef = db.users.doc(currentUser.uid).collection("pending-friends");
    console.log(friendRequestRef.doc('hctDaUDb76xGdiy6tRMh').get());

    const [error, setError] = useState('')

    //new 
    const [friendUsername, setFriendUsername] = useState('');

    const handleClearClick = () =>
    {
        setInputValue('')
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const usersRef = db.users;
        const querySnapshot = await usersRef.where('username', '==', username).get();

        if (querySnapshot.empty) {
            setAddFriendError('No user found with that username.');
            return;
        }

        
        const otherUserDoc = querySnapshot.docs[0];
        console.log(querySnapshot.get());

        console.log(otherUserDoc.uid);
        const otherUserId = otherUserDoc.uid;
        // idk if this is right^
        
        const otherUserRef = usersRef.doc(otherUserId);
        const pendingFriendsCollectionRef = otherUserRef.collection('pending-friends');

        const newFriend = {
            username : friendUsername,
        };

        try {
            await pendingFriendsCollectionRef.add(newFriend);
            setAddFriendError('Friend added successfully!');
            setFriendUsername('');
        } catch (error) {
            setAddFriendError('Error adding friend');
        }
    };

    return (
      <div>
    {/* Render the friends list */}
    <h1>
    Friends
    </h1>
    <div>
      <button type='show' class='btn' onClick={RenderFriendsList}>Show Friends List</button>
        <RenderFriendsList/>
       
    </div>
    <div>
        {addFriendError}
        <form onSubmit={handleSubmit}>
        <h3>Add a new friend</h3>
        <label>
        Name:
        <input
            type="text"
            placeholder="Friend's Username"
            value={friendUsername}
            onChange={(e) => setFriendUsername(e.target.value)}
        />
        </label>
        <button type="submit">Add Friend</button>
        </form>
        </div>

        <div>
        <ChatApp />
        </div>

        </div>
    );
}

export function RenderFriendsList() {

    const {currentUser} = useAuth();
    const userId = currentUser.uid;
    
    return (
        <div>
        <FriendsList userId={userId} />
        </div>
    );
}

