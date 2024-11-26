'use client';

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";

export default function CurrentCreditScorePage() {
    const router = useRouter();
    const { updateSurveyData } = useSurvey();

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
        console.log("Current Credit Score: ", results.current_credit_score);

        router.push("/survey/liens-or-judgments"); // Replace with the actual next page path
        
    });

    return (
        <div style={{ width: "50%", margin: "0 auto", marginTop: "50px" }}>
            <Survey model={survey} />
        </div>
    );
}
