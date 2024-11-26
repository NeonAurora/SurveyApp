'use client';

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";

export default function LiensOrJudgmentsPage() {
    const router = useRouter();
    const { updateSurveyData, surveyData } = useSurvey();

    // Initialize the survey JSON
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

        // Update survey data
        updateSurveyData("liens_or_judgments", results.liens_or_judgments);

        // Determine if the user should be disqualified
        let disqualificationFlag = surveyData.disqualificationFlag || false;

        // If the answer is "Yes", set disqualification flag to true
        if (results.liens_or_judgments === "Yes") {
            disqualificationFlag = true;
        }

        // Update the disqualification flag in the survey context
        updateSurveyData("disqualificationFlag", disqualificationFlag);

        // Log current state for debugging purposes
        console.log("Outstanding Liens or Judgments: ", results.liens_or_judgments);
        console.log("Disqualification Flag: ", disqualificationFlag);

        // Route based on disqualification flag
        if (disqualificationFlag) {
            router.push("/survey/disqualification"); // Redirect to disqualification page if the user does not qualify
        } else {
            router.push("/survey/info"); // Redirect to the next qualifying step
        }
    });

    return (
        <div style={{ width: "50%", margin: "0 auto", marginTop: "50px" }}>
            <Survey model={survey} />
        </div>
    );
}
