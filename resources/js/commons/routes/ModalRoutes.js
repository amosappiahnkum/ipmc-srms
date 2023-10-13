import React from 'react'
import {Route, Routes} from 'react-router-dom'
import StudentForm from "../../components/students/student-form";
import PreviewFile from "../preview-file";
import ProgramForm from "../../components/programs/program-form";
import InstructorForm from "../../components/instructors/instructor-form";
import BatchForm from "../../components/batches/batch-form";
import EnrollmentForm from "../../components/students/enrollment-form";
import StudentDetail from "../../components/students/student-details";
import EnquiryDetail from "../../enquiry/enquiry-details";

export const ModalRoutes = () => {
    return (
        <Routes>
            <Route exact path="students/form" element={<StudentForm/>}/>
            <Route exact path="students/enroll" element={<EnrollmentForm/>}/>
            <Route exact path="students/:name/details" element={<StudentDetail/>}/>
            <Route exact path="enquires/:name/details" element={<EnquiryDetail/>}/>
            <Route exact path="batches/form" element={<BatchForm/>}/>
            <Route exact path="programs/form" element={<ProgramForm/>}/>
            <Route exact path="instructors/form" element={<InstructorForm/>}/>
            <Route exact path="preview/:fileName" element={<PreviewFile/>}/>
        </Routes>
    )
}
