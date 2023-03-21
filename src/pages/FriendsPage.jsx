import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import React, { useRef, useState } from 'react';
import '../App.css';
import { useAuth } from "./auth/contexts/AuthContext";
import { auth, db } from '../firebase';
import FriendsList from './FriendsList';
import Chat from '../components/chat/Chat.jsx';

export default function FriendsPage() {
    const friendRef = useState('');
    const user = useAuth();
    const messagesRef = {
        db
        .users
        .where("username", "==", user.username)
        .get()
        .collection("friends")
        .where("username", "==", friendRef)
        .get()
        .collection("messages")
    }


    return (
        <div>
        <h1>Friends</h1>
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

