'use client';

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";

export default function ForeclosureForbearancePage() {
    const router = useRouter();
    const { updateSurveyData } = useSurvey();

    const surveyJson = {
        title: "Foreclosure or Forbearance Status",
        pages: [
            {
                elements: [
                    {
                        type: "radiogroup",
                        name: "foreclosure_forbearance",
                        title: "Are you currently in foreclosure or forbearance?",
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
        updateSurveyData("foreclosure_forbearance", results.foreclosure_forbearance);
        console.log("Foreclosure or Forbearance Status: ", results.foreclosure_forbearance);

        // if (results.foreclosure_forbearance === "Yes") {
            router.push("/survey/declared-bankruptcy"); // Placeholder path for users in foreclosure or forbearance
        // } else {
        //     router.push("/survey/next-step-no-foreclosure"); // Placeholder path for users not in foreclosure or forbearance
        // }
    });

    return (
        <div style={{ width: "50%", margin: "0 auto", marginTop: "50px" }}>
            <Survey model={survey} />
        </div>
    );
}
