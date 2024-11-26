'use client';

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";

export default function CurrentOnAllPaymentsPage() {
    const router = useRouter();
    const { updateSurveyData } = useSurvey();

    const surveyJson = {
        tile: "Current On All Payments",
        pages: [
            {
                elements: [
                    {
                        type: "radiogroup",
                        name: "current_on_all_payments",
                        title: "Have you been current on all rent or housing payments over the last 12 months?",
                        isRequired: true,
                        colCount: 1,
                        choices: [
                            "Yes",
                            "No",
                        ],
                    },
                ]
            },
        ],
    };

    const survey = new Model(surveyJson);
  

    survey.onComplete.add((sender) => {
        const results = sender.data;
        updateSurveyData("current_on_all_payments", results.current_on_all_payments);
        console.log("Current on all payments: ", results.current_on_all_payments);

        router.push("/survey/down-payment");

        // let pqualify = true;

        // if (results.current_on_all_payments === "No") {
        //     pqualify = false;
        // }
    });

    return (
        <div>
            <Survey model={survey} />
        </div>
    );
}