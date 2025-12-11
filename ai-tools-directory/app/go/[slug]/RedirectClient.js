'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectClient({ destination }) {
    const router = useRouter();

    useEffect(() => {
        if (destination) {
            window.location.href = destination;
        } else {
            router.push('/');
        }
    }, [destination, router]);

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: 'white' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Redirecting to official site...</h2>
                <p>Please wait.</p>
            </div>
        </div>
    );
}
