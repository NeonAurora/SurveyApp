'use client';

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";

export default function HomeUsagePage () {
    const router = useRouter();
    const { updateSurveyData } = useSurvey();

    const surveyJson = {
        title: "Home Usage",
        pages: [
            {
                elements: [
                    {
                        type: "radioGroup",
                        name: "home_usage",
                        title: "How will you use your new home?",
                        isRequired: true,
                        colCount: 1,
                        choices: [
                            "Secondary/Vacation Home",
                            "Primary Residence",
                            "Investment Property",
                        ],
                    },
                ],
            },
        ],
    };

    const survey = new Model(surveyJson);

    survey.onComplete.add((sender) => {
        const results = sender.data;
        updateSurveyData("home_usage", results.home_usage);

        console.log("Home Usage Answer: ", results.home_usage);
        router.push("/survey/real-estate-agent");
    });

    return (
        <div style={{ width: "50%", margin: "0 auto", marginTop: "50px"}}>
            <Survey model={survey} />
        </div>
    );
}