'use client';

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";

export default function DeclaredBankruptcyPage() {
    const router = useRouter();
    const { updateSurveyData } = useSurvey();

    const surveyJson = {
        title: "Declared Bankruptcy",
        pages: [
            {
                elements: [
                    {
                        type: "radiogroup",
                        name: "declared_bankruptcy",
                        title: "Have you declared bankruptcy in the last 4 years?",
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
        updateSurveyData("declared_bankruptcy", results.declared_bankruptcy);
        console.log("Declared Bankruptcy Status: ", results.declared_bankruptcy);

        // if (results.declared_bankruptcy === "Yes") {
            router.push("/survey/current-credit-score"); // Placeholder path for users who declared bankruptcy
        // } else {
        //     router.push("/survey/current-credit-score"); // Redirect to the current credit score page
        // }
    });

    return (
        <div style={{ width: "50%", margin: "0 auto", marginTop: "50px" }}>
            <Survey model={survey} />
        </div>
    );
}
