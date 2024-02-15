import React from 'react'
import {useSelector} from "react-redux";
import {FiCalendar, FiFile, FiUser} from "react-icons/fi";
import {BiTime} from "react-icons/bi";
import Exams from "./exams";

function MyProgramDetail() {
    const programDetail = useSelector(state => state.studentReducer?.programDetail)

    return (
        <div className={'grid grid-cols-1 md:grid-cols-3 gap-3'}>
            <div className={'col-span-1 md:col-span-2'}>
                {
                    programDetail?.ongoing_program?.modules?.length === 0 ?
                        <div className={'mx-auto w-fit'}>
                            <h3 className={'text-error-600 mt-5 text-xl'}>Oops! No module assigned to this program</h3>
                        </div>
                        : <>
                            <div className={'hidden md:block rounded-lg mb-2'}>
                                <div className={'grid grid-cols-3 gap-2'}>
                                    <div className={'detail-item'}>
                                        <FiFile/>
                                        <p>{programDetail?.ongoing_program?.program}</p>
                                    </div>
                                    <div className={'detail-item'}>
                                        <FiUser/>
                                        <p>{programDetail?.ongoing_program?.staff}</p>
                                    </div>
                                    <div className={'detail-item'}>
                                        <FiCalendar/>
                                        <p>{programDetail?.ongoing_program?.start_date}</p>
                                        <BiTime/>
                                        <p>{programDetail?.ongoing_program?.batch_time}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={'bg-white p-5 rounded-lg'}>
                                <p className={'text-base font-medium'}>Modules</p>
                                {
                                    programDetail?.ongoing_program?.modules?.map((item) => (
                                        <div key={item.id} className={'py-3 flex justify-between border-b'}>
                                            <div>
                                                <h3 className={'text-sm capitalize'}>
                                                    {item?.name.toLowerCase()}
                                                </h3>
                                                {
                                                    item?.semester &&
                                                    <small
                                                        className={`text-[10px] text-gray-500 font-medium w-fit uppercase`}>
                                                        Semester {item?.semester}
                                                    </small>
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                }
            </div>
            <div>
                <Exams batchId={programDetail?.ongoing_program?.id}/>
            </div>
        </div>
    )
}

export default MyProgramDetail
