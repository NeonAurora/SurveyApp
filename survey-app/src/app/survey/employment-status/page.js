'use client';

import { Survey, Model } from "survey-react-ui";
import { useSurvey } from "@/app/context/SurveyContext";
import { useRouter } from "next/navigation";

export default function DownPaymentPage() {
    const router = useRouter();
    const { updateSurveyData } = useSurvey();

    const surveyJson = {
        title: "Employment Status",
        pages: [
            {
                elements: [
                    {
                        type: "radiogroup",
                        name: "employment_status",
                        title: "What is your current employment status?",
                        isRequired: true,
                        colCount: 1,
                        choices: [
                            "Employed",
                            "Not Employed",
                            "Self-Employed 1099",
                            "Retired",
                        ],
                    },
                ],
            },
        ],
    };

    const survey = new Model(surveyJson);
    survey.onComplete.add((sender) => {
        const results = sender.data;
        updateSurveyData("employment_status", results.employment_status);
        console.log("Employment Status is: ", results.employment_status);

        // Handle different employment statuses using a switch-case statement
        switch (results.employment_status) {
            case "Employed":
                router.push("/survey/verify-income-employed"); 
                break;

            case "Self-Employed 1099":
                router.push("/survey/verify-income-self-employed");
                break;

            case "Not Employed":
                router.push("/survey/verify-income-not-employed");
                break;

            case "Retired":
                router.push("/survey/verify-income-retired");
                break;

            default:
                console.log("Invalid employment status selected.");
        }
    });

    return  (
        <div style={{ width: "50%", margin: "0 auto", marginTop: "50px"}}>
            <Survey model={survey} />
        </div>
    )
}