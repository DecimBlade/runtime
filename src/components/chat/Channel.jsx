import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { useAuth } from '../../pages/auth/contexts/AuthContext.js';
import Message from './/Message';

const Channel = ({ user = null, db = null}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState([]);

    const { currentUser } = useAuth();

    useEffect(() => {
        if (db) {
            const unsubscribe = db
                .collection('messages')
                .orderBy('createdAt')
                .limit(100)
                .onSnapshot(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => ({
                        ... doc.data(),
                        id: doc.id,
                    }));
                })

            return unsubscribe;
        }
    }, [db]);

    const handleOnChange = e => {
        setNewMessage(e.target.value);
    };

    const handleOnSubmit = e => {
        e.preventDefault();

        if (db) {
            db.collection('messages').add({
                text: newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                currentUser,
            })
        }
    }

    return (
        <>
        <ul>
            {messages.map(message => (
                <li key={message.id}>
                    <Message {...message} />
                </li>
            ))}
        </ul>
        <form onSubmit={handleOnSubmit}>
        <input
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            placeholder="Type your message here..."
        />
        <button type="Submit" disabled={!newMessage}>
            Send
        </button>
        </form>
        </>
    );
};
/*
Channel.propTypes = {
    currentUser: PropTypes.shape({
        uid: PropTypes.string,
        displayName: PropTypes.string,
    }),
};
*/
export default Channel;
