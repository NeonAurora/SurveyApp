'use client';

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";

export default function LiensOrJudgmentsPage() {
    const router = useRouter();
    const { updateSurveyData } = useSurvey();

    const surveyJson = {
        title: "Outstanding Liens or Judgments",
        pages: [
            {
                elements: [
                    {
                        type: "radiogroup",
                        name: "liens_or_judgments",
                        title: "Are there any outstanding liens or judgments that will appear on your credit?",
                        isRequired: true,
                        colCount: 1,
                        choices: [
                            "Yes",
                            "No"
                        ],
                    },
                ],
            },
        ],
    };

    const survey = new Model(surveyJson);
    

    survey.onComplete.add((sender) => {
        const results = sender.data;
        updateSurveyData("liens_or_judgments", results.liens_or_judgments);
        console.log("Outstanding Liens or Judgments: ", results.liens_or_judgments);

        if (results.liens_or_judgments === "No") {
            router.push("/survey/info"); // Replace with the correct next step for users with liens or judgments
        } else {
            router.push("/survey/qualify"); // Replace with the correct next step for users without liens or judgments
        }
    });

    return (
        <div style={{ width: "50%", margin: "0 auto", marginTop: "50px" }}>
            <Survey model={survey} />
        </div>
    );
}
