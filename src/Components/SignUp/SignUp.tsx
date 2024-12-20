'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config'
import styles from "./SignUp.module.css";

const SignUp = () => {

    //Sign In/Up Modal State
    const [isOpen, setIsOpen] = useState(false);
    const [authAction, setAuthAction] = useState('');

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    //Closes modal and resets input values
    const handleClose = () => {
        setIsOpen(false); setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
    };
    const handleOpen = () => { setIsOpen(true) };

    //Listens for escape key to close modal
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

    //Keep form data live and reactive
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //Either registers the user or signs them in
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
                    console.log(`Encountered Error: (${error.code}) with message: "${error.message}"`);
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
            <div>
                <button className={styles.btn} onClick={() => { handleOpen(); setAuthAction('signIn') }}>
                    Sign In / Sign Up
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
                        <div className={styles.formContainer}>
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
                                {authAction === 'signIn' && (
                                    <button className={`${styles.btn} ${styles.tan}`} onClick={() => { handleOpen(); setAuthAction('signUp') }}>
                                        Sign Up Instead
                                    </button>
                                )}
                                {authAction === 'signUp' && (
                                    <button className={`${styles.btn} ${styles.tan}`} onClick={() => { handleOpen(); setAuthAction('signIn') }}>
                                        Sign In Instead
                                    </button>
                                )}
                                <button type="submit">{authAction === 'signUp' ? 'Sign Up' : 'Sign In'}</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignUp;