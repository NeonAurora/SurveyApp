'use client';

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";

export default function VerifyIncomeEmployedPage() {
    const router = useRouter();
    const { updateSurveyData, surveyData } = useSurvey();

    const surveyJson = {
        title: "Income Verification for Employed",
        pages: [
            {
                elements: [
                    {
                        type: "radiogroup",
                        name: "verify_income_employed",
                        title: "Can you verify your income and provide last year's W-2 and two most recent pay stubs?",
                        isRequired: true,
                        colCount: 1,
                        choices: [
                            "Yes, of course",
                            "I am unable to at the moment"
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
        if(results.verify_income_employed == "I am unable to at the moment") {
            disqualificationFlag = true;
        }
        updateSurveyData("verify_income_employed", results.verify_income_employed);
        updateSurveyData("disqualificationFlag", disqualificationFlag );
        console.log("Income Verification for Employed: ", results.verify_income_employed);

        if (results.verify_income_employed === "Yes, of course") {
            router.push("/survey/income-history");
        } else {
            router.push("/survey/unable-to-verify-income");
        }
    });

    return (
        <div style={{ width: "50%", margin: "0 auto", marginTop: "50px" }}>
            <Survey model={survey} />
        </div>
    );
}
