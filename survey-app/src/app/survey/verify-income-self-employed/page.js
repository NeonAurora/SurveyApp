'use client';

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";

export default function VerifyIncomeSelfEmployedPage() {
    const router = useRouter();
    const { updateSurveyData, surveyData } = useSurvey();

    const surveyJson = {
        title: "Income Verification for Self-Employed",
        pages: [
            {
                elements: [
                    {
                        type: "radiogroup",
                        name: "verify_income_self_employed",
                        title: "Can you verify your income by providing tax returns for the previous two years or 12 months of current bank statements showing deposits?",
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
        if(results.verify_income_self_employed === "I am unable to at the moment") {
            disqualificationFlag = true;
        }
        updateSurveyData("verify_income_self_employed", results.verify_income_self_employed);
        updateSurveyData("disqualificationFlag", disqualificationFlag);
        console.log("Income Verification for Self-Employed: ", results.verify_income_self_employed);

        if (results.verify_income_self_employed === "Yes, of course") {
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
