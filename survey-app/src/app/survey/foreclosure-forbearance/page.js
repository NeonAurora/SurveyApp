'use client';

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";

export default function ForeclosureForbearancePage() {
    const router = useRouter();
    const { updateSurveyData, surveyData } = useSurvey();

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

        const disqualificationFlag = surveyData.disqualificationFlag || false;
        if(results.foreclosure_forbearance == "Yes") {
            disqualificationFlag = true;
        }
        
        updateSurveyData("foreclosure_forbearance", results.foreclosure_forbearance);
        updateSurveyData("disqualificationFlag", disqualificationFlag);
        console.log("Foreclosure or Forbearance Status: ", results.foreclosure_forbearance);
        router.push("/survey/declared-bankruptcy");
    });

    return (
        <div style={{ width: "50%", margin: "0 auto", marginTop: "50px" }}>
            <Survey model={survey} />
        </div>
    );
}
