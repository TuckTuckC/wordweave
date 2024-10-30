'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from "./SignUp.module.css";
// import './SignUp.css';

interface SignUpProps {
    isOpen: boolean;
}

const SignUp: React.FC<SignUpProps> = ({ isOpen }) => {
    console.log(isOpen);
    
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.signUp}>
        {/* Conditional rendering: if no user is logged in */}
        <h1>Please Sign In or Sign Up</h1>
        <div>
          <button onClick={() => {console.log('hello') /* Add sign up logic here */ }}>
            Sign Up
          </button>
          <button onClick={() => { console.log('hello')/* Add sign in logic here */ }}>
            Sign In
          </button>
        </div>
  
        {/* Conditional rendering: if the user is logged in */}
        <div>
          <button onClick={() => { console.log('hello')/* Add log out logic here */ }}>
            Log Out
          </button>
        </div>
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={() => isOpen = false}>&times;</span>
                <h2>Sign Up</h2>
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
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
      </div>
    );
};

export default SignUp;