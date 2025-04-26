import React from 'react';

function Footer() {
    return (
        <div className="bg-gray-800 text-white py-6 mt-12 w-full">
            <div className="max-w-4xl mx-auto text-center">
                <p className="text-sm">
                    <strong>대표자명:</strong> 한대규
                </p>
                <p className="text-sm">
                    <strong>이메일:</strong> contact@piggyai.com
                </p>
                <p className="text-sm mt-2">
                    © {new Date().getFullYear()} Piggy AI. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default Footer;
