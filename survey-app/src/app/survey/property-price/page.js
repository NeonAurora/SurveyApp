'use client';

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";

export default function PropertyPricePage() {
    const router = useRouter();
    const { updateSurveyData, surveyData } = useSurvey();

    const surveyJson = {
        title: "Property Price",
        pages: [
            {
                elements: [
                    {
                        type: "text",
                        name: "property_price",
                        title: "Enter the price of your desired property: ",
                        isRequired: true,
                        inputType: "number",
                    },
                ],
            },
        ],
    };

    const survey = new Model(surveyJson);

    survey.onComplete.add((sender) => {
        const results = sender.data;
        updateSurveyData("property_price", results.property_price);

        console.log("Current Survey Data:", { ...surveyData, ...results});
        router.push("/survey/home-usage");
    });

    return (
        <div style={{ width: "50%", margin: "0 auto", marginTop: "50px" }}>
            <Survey model={survey} />
        </div>
    );

};