'use client';

import { Survey, Model } from "survey-react-ui";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";

export default function TotalMonthlyPaymentsPage() {
    const router = useRouter();
    const { updateSurveyData } = useSurvey();

    const surveyJson = {
        title: "Give us a way to reach you",
        pages: [
            {
                elements: [
                    {
                        type: "text",
                        name: "first_name",
                        title: "First Name",
                        isRequired: true,
                    },
                    {
                        type: "text",
                        name: "last_name",
                        title: "Last Name",
                        isRequired: true,
                    },
                    {
                        type: "text",
                        name: "email",
                        title: "Email Address",
                        isRequired: true,
                        inputType: "email", // Validate email input
                    },
                    {
                        type: "text",
                        name: "phone",
                        title: "Phone Number",
                        isRequired: true,
                        inputType: "tel", // Input type for telephone number
                    },
                ],
            },
        ],
    };

    const survey = new Model(surveyJson);

    survey.onComplete.add((sender) => {
        const results = sender.data;
        
        // Update the survey context with all collected data
        updateSurveyData("first_name", results.first_name);
        updateSurveyData("last_name", results.last_name);
        updateSurveyData("email", results.email);
        updateSurveyData("phone", results.phone);
        
        console.log("Collected Personal Information: ", results);

        // Redirect to the next page, e.g., gross annual income page
        router.push("/survey/survey-finish");
    });

    return (
        <div style={{ width: "50%", margin: "0 auto", marginTop: "50px" }}>
            <Survey model={survey} />
        </div>
    );
}