'use client';

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";

export default function IncomeHistoryPage() {
    const router = useRouter();
    const { updateSurveyData } = useSurvey();

    const surveyJson = {
        title: "Credit Line Clarification",
        pages: [
            {
                elements: [
                    {
                        type: "radiogroup",
                        name: "open_credit",
                        title: "Do you have any open credit lines on your credit report? (Car payment, credit card etc.)",
                        isRequired: true,
                        colCount: 1,
                        choices: [
                            "Yes, I do",
                            "No, I don't"
                        ],
                    },
                ],
            },
        ],
    };

    const survey = new Model(surveyJson);

    survey.onComplete.add((sender) => {
        const results = sender.data;
        updateSurveyData("open_credit", results.open_credit);

        console.log("Credit Lines : ", results.open_credit);

        if (results.open_credit === "Yes, I do") {
            router.push("/survey/total-monthly-payments");
        } else {
            router.push("/survey/gross-annual-income"); 
        }
    });

    return (
        <div style={{ width: "50%", margin: "0 auto", marginTop: "50px" }}>
            <Survey model={survey} />
        </div>
    );
}
