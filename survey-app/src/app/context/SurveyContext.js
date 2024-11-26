'use client';

import React, {createContext, useState, useContext} from "react";

const SurveyContext = createContext();

export const SurveyProvider = ({ children }) => {
    const [ surveyData, setSurveyData ] = useState({});

    const updateSurveyData = (key, value) => {
        setSurveyData((prevData) => ({
            ...prevData,
            [key]: value,
        }))
    };

    return (
        <SurveyContext.Provider value={{surveyData, updateSurveyData}}>
            {children}
        </SurveyContext.Provider>
    )
};

export const useSurvey = () => useContext(SurveyContext);

