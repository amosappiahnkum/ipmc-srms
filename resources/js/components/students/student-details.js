import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import {TlaModal} from "../../commons/pop-ups/tla-modal";
import {Button} from "antd";
import PersonalDetail from "./personal-detail";
import Enrollments from "./enrollments";

function StudentDetail() {
    const navigate = useNavigate()
    const [current, setCurrent] = useState(0)
    const items = [
        {
            name: 'Personal Details',
            key: 'personal-details',
            component: <PersonalDetail/>
        },
        {
            name: 'Enrollments',
            key: 'enrollments',
            component: <Enrollments/>
        }
    ]
    return (
        <TlaModal width={1000} file={null} title={''} customClass={'student-detail-modal'}>
            <div className={'flex justify-between'}>
                <div className={'flex'}>
                    {
                        items.map(({name, key}, index) => (
                            <p
                                onClick={() => {
                                    setCurrent(index)
                                }}
                                className={`p-3 ${current === index ? 'text-primary-400 border-b-2 border-b-primary-400' : 'text-gray-500'} cursor-pointer border-2 border-transparent hover:bg-primary-50 hover:border-b-2 hover:border-b-primary-400`}
                                key={key}>{name}
                            </p>
                        ))
                    }
                </div>
                <div className={'flex p-3 gap-2'}>
                    <Button onClick={() => navigate(-1)}>Close</Button>
                </div>
            </div>
            <div className={'p-3'}>
                {items[current].component}
            </div>
        </TlaModal>
    )
}

export default StudentDetail
