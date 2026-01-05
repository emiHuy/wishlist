import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../../api/auth';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const data = await signup({ email, name, password });
            const token = data.user.token;
            if (token) {
                sessionStorage.setItem('token', token);
            }
            navigate('/wishlist');
        } catch (err) {
            console.error(err);
            setError(err.message || 'Signup failed.');
        }
    };

    return (
        <div className="signup-page">
            <form className="signup-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Name/Nickname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign up</button>
            </form>
            <Link to="/login">Link to Login</Link>
        </div>
    )
}