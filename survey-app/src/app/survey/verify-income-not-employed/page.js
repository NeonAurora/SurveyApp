'use client';

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";

export default function VerifyIncomeSelfEmployedPage() {
    const router = useRouter();
    const { updateSurveyData, surveyData } = useSurvey();

    const surveyJson = {
        title: "Income Verification for Non-Employed",
        pages: [
            {
                elements: [
                    {
                        type: "radiogroup",
                        name: "verify_income_non_employed",
                        title: "Do you have another source of income?",
                        isRequired: true,
                        colCount: 1,
                        choices: [
                            "Yes, I do",
                            "No, I don't"
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
        if(results.verify_income_non_employed == "No, I don't") {
            disqualificationFlag = true;
        }
        updateSurveyData("verify_income_non_employed", results.verify_income_non_employed);
        updateSurveyData("disqualificationFlag", disqualificationFlag);
        console.log("Income Verification for Self-Employed: ", results.verify_income_non_employed);

        if (results.verify_income_non_employed === "Yes, I do") {
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
