'use client';

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";

export default function IncomeHistoryPage() {
    const router = useRouter();
    const { updateSurveyData, surveyData } = useSurvey();

    const surveyJson = {
        title: "Income History Documentation",
        pages: [
            {
                elements: [
                    {
                        type: "radiogroup",
                        name: "income_history",
                        title: "Do you have a 2-year income history and can it be documented?",
                        isRequired: true,
                        colCount: 1,
                        choices: [
                            "Yes, of course",
                            "I am unable to at the moment"
                        ],
                    },
                ],
            },
        ],
    };

    const survey = new Model(surveyJson);

    survey.onComplete.add((sender) => {
        const results = sender.data;
        const disqualificationFlag = surveyData.disqualificationFlag || false;

        if(results.income_history === "I am unable to at the moment"){
            disqualificationFlag = true;
        }
        console.log("Income History Documentation: ", results.income_history);
        updateSurveyData("income_history", results.income_history);
        updateSurveyData("disqualificationFlag", disqualificationFlag);

        if (results.income_history === "Yes, of course") {
            router.push("/survey/open-credit-lines"); // Replace with the actual next page path
        } else {
            router.push("/survey/unable-to-verify-income"); // Redirects to the 'unable to verify' page
        }
    });

    return (
        <div style={{ width: "50%", margin: "0 auto", marginTop: "50px" }}>
            <Survey model={survey} />
        </div>
    );
}
