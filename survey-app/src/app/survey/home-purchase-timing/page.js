'use client';

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";

export default function HomePurchaseTimingPage() {
    const router = useRouter();
    const { updateSurveyData } = useSurvey();

    const surveyJson = {
        title: "Home Purchase Timing",
        pages: [
            {
                elements: [
                    {
                        type: "radiogroup",
                        name: "home_purchase_timing",
                        title: "When are you planning to make your home purchase?",
                        isRequired: true,
                        colCount: 1,
                        choices: [
                            "Immediately: I have a signed purchase agreement",
                            "ASAP: I have found a house / Offer pending",
                            "Within 30 Days",
                            "2-3 Months",
                            "3-6 months",
                            "6+ months",
                            "I don't know",
                        ],
                    },
                ],
            },
        ],
    };

    const survey = new Model(surveyJson);

    survey.onComplete.add((sender) => {
        const results = sender.data;
        updateSurveyData("home_purchase_timing", results.home_purchase_timing);

        console.log("Home Purchase Timing:", results.home_purchase_timing);
        router.push("/survey/current-home-ownership");
    })

    return (
        <div style={{ width: "50%", margin: "0 auto", marginTop: "50px"}}>
            <Survey model={survey} />
        </div>
    )
}