'use client';

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";

export default function TotalMonthlyPaymentsPage() {
    const router = useRouter();
    const { updateSurveyData } = useSurvey();

    const surveyJson = {
        title: "Total Monthly Payments",
        pages: [
            {
                elements: [
                    {
                        type: "text",
                        name: "total_monthly_payments",
                        title: "What are the total monthly payments?",
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
        updateSurveyData("total_monthly_payments", results.total_monthly_payments);
        console.log("Total Monthly Payments: ", results.total_monthly_payments);

        router.push("/survey/gross-annual-income"); // Redirect to the gross annual income page
    });

    return (
        <div style={{ width: "50%", margin: "0 auto", marginTop: "50px" }}>
            <Survey model={survey} />
        </div>
    );
}
