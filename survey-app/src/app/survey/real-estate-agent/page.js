"use client";

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";

export default function RealEstateAgentPage() {
    const router = useRouter();
    const { updateSurveyData } = useSurvey();

    const surveyJson = {
        title: "Real Estate Agent",
        pages: [
            {
                elements: [
                    {
                        type: "radiogroup",
                        name: "real_estate_agent",
                        title: "Do you have a Real Estate Agent",
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
        updateSurveyData('real_estate_agent', results.real_estate_agent);

        console.log("Real Estate Agent: ", results.real_estate_agent);
        router.push("/survey/home-purchase-timing");
    });

    return (
        <div style={{width: "50%", margin: "0 auto", marginTop: "50 px"}}>
            <Survey model={survey} />
        </div>
    )


}