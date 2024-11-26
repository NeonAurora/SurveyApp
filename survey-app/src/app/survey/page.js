'use client';

import { Survey, Model } from "survey-react-ui"
import { useRouter } from "next/navigation";
import { useSurvey } from "../context/SurveyContext";

export default function SurveyPage() {
    const router = useRouter();
    const { updateSurveyData }= useSurvey();

    const surveyJson = {
        title: "Survey",
        pages: [
            {
                elements: [
                    {
                        type: "radiogroup",
                        name: "language",
                        title: "Choose your language",
                        isRequired: true,
                        colCount: 2,
                        choices: ["English", "Spanish"]
                    }
                ]
            }
        ]
    };

    const survey = new Model(surveyJson);

    survey.onComplete.add((sender) => {
        const results = sender.data;
        updateSurveyData('language', results.language);

        if(results.language == "English") {
            router.push("/survey/property-price");
            console.log("Language: ", results.language);
        } else {
            alert("Currently, Spanish is not Supported");
        }
    });

    return (
        <div>
            <Survey model={survey} />
        </div>
    )
}

