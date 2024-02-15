import React from 'react'
import Passed from "./Passed";
import Failed from "./Failed";
import {useLocation} from "react-router-dom";
import {getTotalMark} from "../../utils";

const ExamStatus = () => {

    const {state} = useLocation()

    return (
        getTotalMark(state?.data?.mark, state?.data?.total_mark) >= 50 ?
            <Passed mark={state?.data?.mark}/> :
            <Failed mark={state?.data?.mark}/>
    )
}

export default ExamStatus
