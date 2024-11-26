'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";
import axios from "axios";

export default function SurveyFinishPage() {
    const router = useRouter();
    const { surveyData } = useSurvey();

    useEffect(() => {
        // Function to send the survey data
        const sendSurveyData = async () => {
            try {
                // Send POST request to your API route to send email
                await axios.post("/api/send-survey-result", { surveyData });
                console.log("Survey data sent successfully!");
            } catch (error) {
                console.error("Failed to send survey data:", error);
            }
        };

        // Trigger the sendSurveyData function when the component mounts
        if (surveyData) {
            sendSurveyData();
        }
    }, [surveyData]);

    return (
        <div style={{ width: "50%", margin: "0 auto", marginTop: "50px", textAlign: "center" }}>
            <h2>Thank you for completing the survey!</h2>
            <p>Your responses have been recorded and sent to our team for review.</p>
        </div>
    );
}
