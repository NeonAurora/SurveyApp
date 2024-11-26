'use client';

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";
import { useEffect, useState } from "react";
export default function QualifyPage({ pqualify }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading period of 3 seconds
        const timer = setTimeout(() => {
            setLoading(false);

            if (pqualify) {
                // Redirect to the survey finish page if the user qualifies
                router.push("/survey/survey-finish");
            }
        }, 3000);

        // Cleanup the timer on component unmount
        return () => clearTimeout(timer);
    }, [pqualify, router]);

    return (
        <div style={{ textAlign: "center", marginTop: "20vh" }}>
            {loading ? (
                <div>
                    <h2>Evaluating your application...</h2>
                    {/* Loading spinner */}
                    <div className="spinner" style={spinnerStyle}></div>
                </div>
            ) : (
                !pqualify && (
                    <div>
                        <h2>Sorry, you do not qualify for our seller finance program.</h2>
                    </div>
                )
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
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}`;

// Inject CSS styles for spinner into the page head
if (typeof window !== "undefined") {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = spinnerCSS;
    document.head.appendChild(styleTag);
}
