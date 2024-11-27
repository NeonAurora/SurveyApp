'use client';

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";

export default function GrossAnnualIncomePage() {
    const router = useRouter();
    const { updateSurveyData, surveyData } = useSurvey();

    const surveyJson = {
        title: "Household Gross Annual Income",
        pages: [
            {
                elements: [
                    {
                        type: "radiogroup",
                        name: "gross_annual_income",
                        title: "What is your household gross (before taxes) annual income?",
                        isRequired: true,
                        colCount: 1,
                        choices: [
                            "Less than $30,000",
                            "$30,000 - $50,000",
                            "$50,000 - $75,000",
                            "$75,000 - $100,000",
                            "$100,000 - $150,000",
                            "$150,000 - $200,000",
                            "Over $200,000",
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
        if(results.gross_annual_income == "$30,000 - $50,000" || results.gross_annual_income == "Less than $30,000"){
            disqualificationFlag = true;
        }


        updateSurveyData("gross_annual_income", results.gross_annual_income);
        updateSurveyData("disqualificationFlag", disqualificationFlag);
        console.log("Gross Annual Income: ", results.gross_annual_income);

        router.push("/survey/foreclosure-forbearance"); // Replace with the actual next page path
    });

    return (
        <div style={{ width: "50%", margin: "0 auto", marginTop: "50px" }}>
            <Survey model={survey} />
        </div>
    );
}
