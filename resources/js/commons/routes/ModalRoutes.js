import React from 'react'
import {Route, Routes} from 'react-router-dom'
import StudentForm from "../../components/students/student-form";
import PreviewFile from "../preview-file";
import ProgramForm from "../../components/programs/program-form";
import StaffForm from "../../components/staff/staff-form";
import BatchForm from "../../components/batches/batch-form";
import EnrollmentForm from "../../components/students/registration-form";
import StudentDetail from "../../components/students/student-details";
import GenerateAttendanceForm from "../../components/batches/generate-attendance-form";
import GenerateBatchPlan from "../../components/batches/generate-batch-plan";
import FollowUpForm from "../../enquiry/follow-up-form";
import ScheduleExam from "../../components/batches/schedule-exam";
import Exams from "../../components/students/my-programs/exams";

export const ModalRoutes = () => {
    return (
        <Routes>
            <Route exact path="students/form" element={<StudentForm/>}/>
            <Route exact path="students/enroll" element={<EnrollmentForm/>}/>
            <Route exact path="students/:name/details" element={<StudentDetail/>}/>
            <Route exact path="enquires/follow-up" element={<FollowUpForm/>}/>
            <Route exact path="batches/form" element={<BatchForm/>}/>
            <Route exact path="batches/generate-attendance" element={<GenerateAttendanceForm/>}/>
            <Route exact path="batches/print-batch-plan" element={<GenerateBatchPlan/>}/>
            <Route exact path="batches/schedule-exam" element={<ScheduleExam/>}/>
            <Route exact path="programs/form" element={<ProgramForm/>}/>
            <Route exact path="staff/form" element={<StaffForm/>}/>
            <Route exact path="preview/:fileName" element={<PreviewFile/>}/>
            <Route exact path="my-programs/:id/details/exams" element={<Exams/>}/>
        </Routes>
    )
}
