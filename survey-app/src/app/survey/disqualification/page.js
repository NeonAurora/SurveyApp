'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./DisqualificationPage.module.css"; // Import CSS module

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
                    <div className={styles.spinner}></div>
                </div>
            ) : (
                <div>
                    <h2>Sorry, you do not qualify for our seller finance program.</h2>
                </div>
            )}
        </div>
    );
}
