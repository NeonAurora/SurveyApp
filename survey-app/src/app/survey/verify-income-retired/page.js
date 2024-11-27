'use client';

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";

export default function VerifyIncomeRetiredPage() {
    const router = useRouter();
    const { updateSurveyData, surveyData } = useSurvey();

    const surveyJson = {
        title: "Income Verification for Retired",
        pages: [
            {
                elements: [
                    {
                        type: "radiogroup",
                        name: "verify_income_retired",
                        title: "Can you verify your income by providing last year's 1099 form or a current award letter?",
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
        const disqualificationFlag = surveyData.disqualificationFlag;
        if(results.verify_income_retired === "I am unable to at the moment") {
            disqualificationFlag = true;
        }
    
        updateSurveyData("verify_income_retired", results.verify_income_retired);
        updateSurveyData("disqualificationFlag", disqualificationFlag);
        console.log("Income Verification for Retired: ", results.verify_income_retired);

        if (results.verify_income_retired === "Yes, of course") {
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
