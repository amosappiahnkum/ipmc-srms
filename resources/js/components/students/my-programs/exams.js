import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {handleGetExams} from "../../../actions/batches/BatchAction";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {setTakeExam} from "../../../actions/students/ActionCreators";

const Exams = ({batchId}) => {
    const [loading, setLoading] = useState(true)
    const {regular, resit} = useSelector(state => state.batchReducer?.exams)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(handleGetExams(batchId)).then(() => setLoading(false))
    }, []);

    const navigate = useNavigate()
    const takeExam = (exam) => {
        dispatch(setTakeExam(exam))

        navigate(`/take-exams/${exam?.id}`)
    }
    return (
        <div className={'flex flex-col bg-white h-fit p-5 rounded-lg'}>
            <p className={'text-base font-medium mb-2'}>Exams</p>
            <Spin spinning={loading} indicator={<LoadingOutlined/>} tip={'Loading Exams'}>
                {
                    regular?.map(({id, exam}) => (
                        <div key={id} className={'border p-2 rounded-lg mb-2'}>
                            <div className={'flex justify-between'}>
                                <div>
                                    <p className={'font-medium'}>{exam?.subject}</p>
                                    <p>
                                        <span className={'font-medium'}>Duration: </span>
                                        {new Date(exam?.duration * 1000).toISOString().slice(11, 19)}
                                    </p>
                                </div>
                                <div className={'w-[30%]'}>
                                    <p>{exam?.date}</p>
                                    <p>{exam?.time}</p>
                                </div>
                            </div>
                            <div className={'flex items-center justify-between mt-3'}>
                                <p>10/20</p>
                                <span className={'text-xs bg-red-600 text-white px-3 py-1 text-center rounded-full'}>
                                    Passed
                                </span>
                                <button onClick={() => {
                                    takeExam(exam)
                                }} className={'text-xs w-fit px-3 py-2 bg-primary-700 text-white'}>
                                    Take Exam
                                </button>
                            </div>
                        </div>
                    ))
                }
            </Spin>
        </div>
    );
};

Exams.propTypes = {
    batchId: PropTypes.number.isRequired
}

export default Exams
