'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function DisqualificationPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set a timeout to simulate evaluation time (3 seconds)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        // Cleanup the timer if the component unmounts before timeout
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "20vh" }}>
            {loading ? (
                <div>
                    <h2>Evaluating your application...</h2>
                    {/* Loading spinner */}
                    <div style={spinnerStyle}></div>
                </div>
            ) : (
                <div>
                    <h2>Sorry, you do not qualify for our seller finance program.</h2>
                </div>
            )}
        </div>
    );
}

// Inline style for loading spinner
const spinnerStyle = {
    width: "40px",
    height: "40px",
    border: "5px solid #f3f3f3",
    borderTop: "5px solid #3498db",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
};

// Add CSS keyframes for spinner animation
const spinnerCSS = `
<style>
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
`;

if (typeof window !== "undefined") {
    document.head.innerHTML += spinnerCSS;
}
