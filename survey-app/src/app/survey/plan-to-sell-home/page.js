'use client';

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";

export default function PlanToSellHomePage() {
    const router = useRouter();
    const { updateSurveyData } = useSurvey();

    const surveyJson = {
        title: "Plan to Sell Home",
        pages: [
            {
                elements: [
                    {
                        type: "radiogroup",
                        name: "plan_to_sell_home",
                        title: "Do you plan to sell your home?",
                        isRequired: true,
                        colCount: 1,
                        choices: [
                            "Yes",
                            "No", 
                        ],
                    },
                ],
            },
        ],

    };

    const survey = new Model(surveyJson);
    
    survey.onComplete.add((sender) => {
        const results = sender.data;
        updateSurveyData("plan_to_sell_home", results.plan_to_sell_home);
        console.log("Plan to sell home: ", results.plan_to_sell_home);

        router.push("/survey/current-on-all-payments");
    });

    return (
        <div style={{ width:"50%", margin:"0 auto", marginTop:"50 px"}}>
            <Survey model={survey} />
        </div>
    );
}
