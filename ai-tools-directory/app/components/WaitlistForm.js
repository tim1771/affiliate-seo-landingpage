'use client';
import { useState } from 'react';

export default function WaitlistForm() {
    const [email, setEmail] = useState('');
    const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error
    const [formMessage, setFormMessage] = useState('');

    const handleWaitlistSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('submitting');

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    'form-name': 'waitlist',
                    'email': email,
                }).toString(),
            });

            if (response.ok) {
                setFormStatus('success');
                setFormMessage('You\'re on the list! We\'ll be in touch soon.');
                setEmail('');
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            setFormStatus('error');
            setFormMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="cta-section">
            <h2>Join the Early Access List</h2>
            <p className="cta-intro">I'm launching this service to a small group first to make sure every recommendation is genuinely useful.</p>

            <ul className="benefits">
                <li>✦ Free personalized recommendations when we launch</li>
                <li>✦ Early access before public availability</li>
                <li>✦ A short survey that helps shape the service</li>
            </ul>

            {formStatus === 'success' ? (
                <div style={{
                    padding: '1.5rem',
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '8px',
                    color: '#22c55e',
                    textAlign: 'center'
                }}>
                    <p style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>🎉 {formMessage}</p>
                </div>
            ) : (
                <form
                    className="form-group"
                    name="waitlist"
                    onSubmit={handleWaitlistSubmit}
                >
                    <input
                        type="email"
                        name="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={formStatus === 'submitting'}
                    />
                    <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        style={{ opacity: formStatus === 'submitting' ? 0.7 : 1 }}
                    >
                        {formStatus === 'submitting' ? 'Joining...' : 'Join the Waitlist'}
                    </button>
                    {formStatus === 'error' && (
                        <p style={{ color: '#ef4444', fontSize: '0.9rem', margin: '0.5rem 0 0' }}>{formMessage}</p>
                    )}
                </form>
            )}

            <p className="privacy-note">No spam. Just a heads up when your recommendations are ready.</p>
        </div>
    );
}
