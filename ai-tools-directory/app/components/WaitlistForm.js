'use client';
import { useState } from 'react';

export default function WaitlistForm() {
    const [email, setEmail] = useState('');
    const [botField, setBotField] = useState('');
    const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error
    const [formMessage, setFormMessage] = useState('');

    const handleWaitlistSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('submitting');
        setFormMessage('');

        // Check if we are on localhost
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            setFormStatus('error');
            setFormMessage('Netlify Forms do not work on localhost. Use the live URL to test!');
            return;
        }

        try {
            // Standard encoding for Netlify forms
            const formData = new URLSearchParams();
            formData.append('form-name', 'waitlist');
            formData.append('email', email.trim().toLowerCase());
            formData.append('bot-field', botField);

            console.log('Final submission check:', Object.fromEntries(formData));

            const response = await fetch('/__forms.html', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            if (response.ok) {
                console.log('Netlify submission successful!');
                setFormStatus('success');
                setFormMessage('You\'re on the list! We\'ll be in touch soon.');
                setEmail('');
            } else {
                const errorText = await response.text();
                console.error('Netlify Form Error details:', {
                    status: response.status,
                    statusText: response.statusText,
                    url: response.url,
                    body: errorText
                });
                throw new Error(`Server returned ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Submission catch block:', error);
            setFormStatus('error');
            setFormMessage(`Error: ${error.message}. Please try again.`);
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
                    {/* Hidden fields for Netlify identification */}
                    <input type="hidden" name="form-name" value="waitlist" />
                    <div style={{ display: 'none' }}>
                        <label>Don't fill this out: <input name="bot-field" value={botField} onChange={(e) => setBotField(e.target.value)} tabIndex="-1" autoComplete="off" /></label>
                    </div>

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
                        <p style={{ color: '#ef4444', fontSize: '0.9rem', margin: '1rem 0 0', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '4px' }}>
                            {formMessage}
                        </p>
                    )}
                </form>
            )}

            <p className="privacy-note">No spam. Just a heads up when your recommendations are ready.</p>
        </div>
    );
}
