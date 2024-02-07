import React from "react";
import {Route} from "react-router-dom";
import MyProgramDetail from "../../components/students/my-programs/my-program-detail";
import Student from "../../components/student";
import StudentLayout from "../../components/student/student-layout";
import ExamLayout from "../../components/exam/exam-layout";
import Instructions from "../../components/exam/instructions";
import TakeExam from "../../components/exam/take-exam";

export default [
    <Route key={'students'} path={'/'} element={<StudentLayout/>}>
        <Route index element={<Student/>}/>
        <Route path=':id/:name' element={<MyProgramDetail/>}/>
    </Route>,
    <Route key={'students-1'} path='take-exams/:name' element={<ExamLayout/>}>
        <Route index element={<Instructions/>}/>
        <Route path={'begin'} element={<TakeExam/>}/>
    </Route>
]
