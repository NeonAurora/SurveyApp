'use client';

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";

export default function CurrentHomeOwnershipPage() {
    const router = useRouter();
    const { updateSurveyData } = useSurvey();

    const surveyJson = {
        title: "Current Home Ownership",
        pages: [
            {
                elements: [
                    {
                        type: "radiogroup",
                        name: "current_home_ownership",
                        title: "Do you currently own a home?",
                        isRequired: true,
                        colCount: 1,
                        choices: [
                            "Yes. I currently own a home",
                            "No. I am currently renting",
                            "No. I have other living arrangements",
                        ],
                    },
                ],
            },
        ],
    };

    const survey = new Model(surveyJson);

    survey.onComplete.add((sender) => {
        const results = sender.data;
        updateSurveyData("current_home_ownership", results.current_home_ownership);

        console.log("Current Home Ownership: ", results.current_home_ownership);

        if(results.current_home_ownership == "Yes. I currently own a home") {
            router.push("/survey/plan-to-sell-home");
        }
        else {
            router.push("/survey/current-on-all-payments");
        }     
    })

    return (
        <div style={{width:"50 px", margin: "0 auto", marginTop: "50 px"}}>
            <Survey model={survey} />
        </div>
    )

}