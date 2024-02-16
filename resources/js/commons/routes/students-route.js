import React from "react";
import {Route} from "react-router-dom";
import MyProgramDetail from "../../components/students/my-programs/my-program-detail";
import Student from "../../components/student";
import StudentLayout from "../../components/student/student-layout";
import ExamLayout from "../../components/exam/exam-layout";
import Instructions from "../../components/exam/instructions";
import TakeExam from "../../components/exam/take-exam";
import ExamStatus from "../../components/exam/ExamStatus";
import ChangePassword from "../../components/commons/change-password";
import PageNotFound from "./page-not-found";

export default [
    <Route key={'students'} path={'/'} element={<StudentLayout/>}>
        <Route index element={<Student/>}/>
        <Route path=':id/:name' element={<MyProgramDetail/>}/>
        <Route key={'change-password'} path={'/change-password'} element={<ChangePassword/>}/>
    </Route>,
    <Route key={'students-exam'} path={'take-exams/:name'} element={<ExamLayout/>}>
        <Route index element={<Instructions/>}/>
    </Route>,
    <Route key={'begin'} path={'/take-exams/:name/begin'} element={<TakeExam/>}/>,
    <Route key={'passed'} path={'/take-exams/:name/completed'} element={<ExamStatus/>}/>,
    <Route key={'not-found'} path={'*'} element={<PageNotFound/>}/>
]
