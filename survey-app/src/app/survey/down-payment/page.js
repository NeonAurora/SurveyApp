'use client';

import { Survey, Model } from "survey-react-ui";
import { useSurvey } from "@/app/context/SurveyContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DownPaymentPage() {
    const router = useRouter();
    const { surveyData, updateSurveyData } = useSurvey();
    const [surveyJson, setSurveyJson] = useState(null);

    useEffect(() => {
        // Extract the property price from survey data
        const propertyPrice = surveyData.property_price;

        // If property price is undefined, redirect back to an appropriate page
        if (!propertyPrice) {
            console.error("Property price is not available. Redirecting...");
            router.push("/survey/property-price"); // Adjust this route as needed
            return;
        }

        // Calculate different down payment percentages
        const downPayments = [
            { percentage: 10, value: (propertyPrice * 0.1).toFixed(2) },
            { percentage: 15, value: (propertyPrice * 0.15).toFixed(2) },
            { percentage: 20, value: (propertyPrice * 0.2).toFixed(2) },
            { percentage: 25, value: (propertyPrice * 0.25).toFixed(2) },
            { percentage: "More than 25%", value: "More than 25%" }
        ];

        // Create choice labels dynamically using the property price
        const choices = downPayments.map((downPayment) => {
            if (typeof downPayment.percentage === "number") {
                return `${downPayment.percentage}% ($${downPayment.value})`;
            }
            return downPayment.value; // For "More than 25%" option
        });

        // Update the survey JSON with dynamic choices
        setSurveyJson({
            title: "Making Down Payment",
            pages: [
                {
                    elements: [
                        {
                            type: "radiogroup",
                            name: "down_payment",
                            title: "How much of down payment are you able to make?",
                            isRequired: true,
                            colCount: 1,
                            choices: choices,
                        },
                    ],
                },
            ],
        });
    }, [surveyData, router]);

    // Render the survey only if surveyJson is available
    if (!surveyJson) {
        return <div>Loading...</div>;
    }

    const survey = new Model(surveyJson);
    survey.onComplete.add((sender) => {
        const results = sender.data;
        const downPaymentSelection = results.down_payment;

        // Extract percentage value using regular expression
        const match = downPaymentSelection.match(/^(\d+)%/);
        let disqualificationFlag = surveyData.disqualificationFlag || false;

        if (match) {
            const percentage = parseInt(match[1], 10);
            if (percentage === 10) {
                disqualificationFlag = true;
            }
        }

        // Update the survey data with down payment and disqualification flag
        updateSurveyData("down_payment", downPaymentSelection);
        updateSurveyData("disqualificationFlag", disqualificationFlag);

        console.log("Down payment calculation is: ", downPaymentSelection);
        console.log("Disqualification Flag: ", disqualificationFlag);

        // Navigate to the next page
        router.push("/survey/employment-status");
    });

    return (
        <div style={{ width: "50%", margin: "0 auto", marginTop: "50px" }}>
            <Survey model={survey} />
        </div>
    );
}
