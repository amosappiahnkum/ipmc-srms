import React from "react";
import MyPrograms from "../students/my-programs/my-programs";
import StudentProfile from "./student-profile";

const Student = () => {
    return (
        <div className={'grid grid-cols-1 md:grid-cols-4 gap-x-5 mt-3'}>
            <div className={'col-span-3'}>
                <MyPrograms/>
            </div>
            <StudentProfile/>
        </div>
    )
}

export default Student
