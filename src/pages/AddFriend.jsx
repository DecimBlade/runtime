import React, { useRef, useState } from 'react';
import '../App.css';
import { useAuth } from "./auth/contexts/AuthContext";
import { auth, db } from '../firebase';

export default function AddFriend() {
    const usersRef = db.users;
    const currentUser = useAuth();
