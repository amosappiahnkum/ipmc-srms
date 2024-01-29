import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {FiCalendar, FiFile, FiUser} from "react-icons/fi";
import {BiTime} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import {setTakeExam} from "../../../actions/students/ActionCreators";

function MyProgramDetail() {
    const programDetail = useSelector(state => state.studentReducer?.programDetail)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const takeExam = (subject) => {
        dispatch(setTakeExam(subject))

        navigate(`/take-exams/${subject?.name.toLowerCase()}`)
    }

    return (
        <div className={'pb-10'}>
            <div className={'grid grid-cols-2 md:grid-cols-4 gap-3 mb-2'}>
                <div className={'detail-item'}>
                    <FiFile/>
                    <p>{programDetail?.program?.program}</p>
                </div>
                <div className={'detail-item'}>
                    <FiUser/>
                    <p>{programDetail?.program?.staff}</p>
                </div>
                <div className={'detail-item'}>
                    <FiCalendar/>
                    <p>{programDetail?.program?.start_date}</p>
                </div>
                <div className={'detail-item'}>
                    <BiTime/>
                    <p>{programDetail?.program?.batch_time}</p>
                </div>
            </div>
            <div>
                <p className={'text-xl'}>Modules</p>
                <hr/>

                {
                    programDetail?.ongoing_program?.modules?.length === 0 ?
                        <div className={'mx-auto w-fit'}>
                            <h3 className={'text-error-600 mt-5 text-xl'}>Oops! No module assigned to this program</h3>
                        </div>
                        :
                        <div className={'grid grid-cols-1 md:grid-cols-3 gap-3 mt-2'}>
                            {
                                programDetail?.ongoing_program?.modules?.map((item) => (
                                    <div key={item.id} className={'bg-white rounded-lg'}>
                                        <div className={'course-cover'}>
                                            <div className={'p-3 course-glass-bg h-32 flex flex-col justify-between'}>
                                                <div>
                                                    {
                                                        item?.semester ?
                                                            <small
                                                                className={`text-[10px] text-gray-300 !font-medium w-fit uppercase`}>
                                                                Semester {item?.semester}
                                                            </small> : <>&nbsp;</>
                                                    }
                                                    <h3 className={'text-sm text-white !font-medium capitalize'}>
                                                        {item?.name.toLowerCase()}
                                                    </h3>
                                                </div>
                                                <div className={'flex items-center justify-between text-white uppercase'}>
                                                    <div className={'w-1/2'}>
                                                        <button className={'uppercase'}>View Results</button>
                                                    </div>
                                                    {
                                                        item?.exam_available &&
                                                        <div className={'w-1/2 text-right'}>
                                                            <button onClick={() => takeExam(item)}
                                                                    className={'uppercase'}>
                                                                Take Exam
                                                            </button>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                }

            </div>
        </div>
    )
}

export default MyProgramDetail
