'use client';

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";
import { useEffect } from "react";

export default function PropertyPricePage() {
    const router = useRouter();
    const { updateSurveyData, surveyData } = useSurvey();

    const surveyJson = {
        title: "Property Price",
        pages: [
            {
                elements: [
                    {
                        type: "text",
                        name: "property_price",
                        title: "Enter the price of your desired property: ",
                        isRequired: true,
                        inputType: "text", // Keep this as "text" to allow for formatting
                        placeholder: "Enter amount in USD", // Placeholder hint
                    },
                ],
            },
        ],
    };

    const survey = new Model(surveyJson);

    // Formatting function to add dollar sign and commas
    const formatCurrency = (value) => {
        if (!value) return "";
        // Remove any non-numeric characters except digits
        value = value.replace(/[^0-9]/g, "");
        // Format the value with dollar sign and commas
        return "$" + parseFloat(value).toLocaleString();
    };

    // Function to get raw numeric value without formatting
    const getRawValue = (value) => {
        return value.replace(/[^0-9]/g, "");
    };

    // Handle value changes while typing
    survey.onValueChanging.add((sender, options) => {
        if (options.name === "property_price") {
            const formattedValue = formatCurrency(options.value);
            options.value = formattedValue; // Set the formatted value to display in the input
        }
    });

    survey.onComplete.add((sender) => {
        const results = sender.data;

        // Store raw value for backend or further processing
        const rawValue = getRawValue(results.property_price);
        updateSurveyData("property_price", rawValue);

        console.log("Current Survey Data:", { ...surveyData, property_price: rawValue });
        router.push("/survey/home-usage");
    });

    return (
        <div style={{ width: "50%", margin: "0 auto", marginTop: "50px" }}>
            <Survey model={survey} />
        </div>
    );
};
