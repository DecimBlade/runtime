import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import '../../App.css';
import { useAuth } from "../../pages/auth/contexts/AuthContext.js";
import { auth, db } from '../../firebase.js';
import Channel from './Channel';

function ChatApp() {

    const {currentUser} = useAuth();

    return (
        <div>
            <p>Welcome to the chat</p>
            <Channel currentUser={currentUser} />
        </div>
    );
}

export default ChatApp;
