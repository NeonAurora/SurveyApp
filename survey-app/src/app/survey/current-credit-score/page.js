'use client';

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";

export default function CurrentCreditScorePage() {
    const router = useRouter();
    const { updateSurveyData, surveyData } = useSurvey();

    const surveyJson = {
        title: "Current Credit Score",
        pages: [
            {
                elements: [
                    {
                        type: "radiogroup",
                        name: "current_credit_score",
                        title: "What is your current credit score?",
                        isRequired: true,
                        colCount: 2,
                        choices: [
                            "Excellent (720+)",
                            "Good (680-719)",
                            "Fair (660-679)",
                            "Below average (620-659)",
                            "Poor (580-619)",
                            "Bad (Below 580)"
                        ],
                    },
                ],
            },
        ],
    };

    const survey = new Model(surveyJson);

    survey.onComplete.add((sender) => {
        const results = sender.data;
        updateSurveyData("current_credit_score", results.current_credit_score);

        // Retrieve the current value of disqualificationFlag
        let disqualificationFlag = surveyData.disqualificationFlag || false;

        // Update the disqualification flag based on the user's answer
        if (results.current_credit_score === "Poor (580-619)" || results.current_credit_score === "Bad (Below 580)" || results.current_credit_score === "Below average (620-659)") {
            disqualificationFlag = true; // Set flag to true if the credit score is poor or bad
        }

        // Update the disqualification flag in the survey context
        updateSurveyData("disqualificationFlag", disqualificationFlag);

        // Log the updated flag for debugging
        console.log("Disqualification Flag: ", disqualificationFlag);
        console.log("Current Credit Score: ", results.current_credit_score);

        // Route to the next page
        router.push("/survey/liens-or-judgments");
    });

    return (
        <div style={{ width: "50%", margin: "0 auto", marginTop: "50px" }}>
            <Survey model={survey} />
        </div>
    );
}
