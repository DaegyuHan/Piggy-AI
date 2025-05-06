"use client";

import {useEffect, useRef} from 'react';

export default function AdBanner({ slot = '7010780807' }) {
    const adRef = useRef(null);

    useEffect(() => {
        if (!adRef.current) return;
        if (adRef.current.getAttribute('data-ad-loaded')) return;

        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error('AdSense error:', e);
        }
    }, []);

    return (
        <div style={{width: '100%', minHeight: '100px'}}>
            <ins
                className="adsbygoogle"
                style={{display: 'block'}}
                data-ad-client="ca-pub-4773424574264862"
                data-ad-slot={slot}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>

    );
}
