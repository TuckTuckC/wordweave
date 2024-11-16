'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { auth } from '../../firebase/config'
import styles from "./SignUp.module.css";
// import './SignUp.css';

const SignUp = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [authAction, setAuthAction] = useState('');

    const handleClose = () => {
        setIsOpen(false); setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
    };
    const handleOpen = () => { setIsOpen(true) };

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // const [createUserWithEmailAndPassword] = createUserWithEmailAndPassword(auth);

    useEffect(() => {
        if (isOpen) {
            const handleEscape = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    handleClose();
                }
            };

            document.addEventListener('keydown', handleEscape);

            return () => {
                document.removeEventListener('keydown', handleEscape);
            };
        }
    }, [isOpen]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (authAction === 'signUp') {
            console.log('Signing Up: ', formData)

            createUserWithEmailAndPassword(auth, formData.email, formData.password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user);
                    
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });

        } else {
            console.log('Signing In: ', formData)

            signInWithEmailAndPassword(auth, formData.email, formData.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }
    };

    return (
        <div className={styles.signUp}>
            {/* Conditional rendering: if no user is logged in */}
            <div>
                <button onClick={() => { handleOpen(); setAuthAction('signUp') }}>
                    Sign Up
                </button>
                <button onClick={() => { handleOpen(); setAuthAction('signIn') }}>
                    Sign In
                </button>
            </div>

            {/* Conditional rendering: if the user is logged in */}
            <div>
                <button onClick={() => { console.log('hello')/* Add log out logic here */ }}>
                    Log Out
                </button>
            </div>
            {isOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={handleClose}>&times;</span>
                        <h2>{authAction === 'signUp' ? 'Sign Up' : 'Sign In'}</h2>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <label>
                                Username:
                                <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                            </label>
                            <label>
                                Email:
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </label>
                            <label>
                                Password:
                                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                            </label>
                            {authAction === 'signUp' && (
                                <label>
                                    Confirm Password:
                                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                                </label>
                            )}
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignUp;