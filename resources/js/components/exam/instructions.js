import React, {useEffect, useState} from 'react'
import Instruction from '../../assets/img/instruction.svg'
import {Checkbox, Spin} from "antd";
import {FiCheck, FiChevronsLeft} from "react-icons/fi";
import {Link, useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {handleGetExamQuestions} from "../../actions/batches/BatchAction";
import {LoadingOutlined} from "@ant-design/icons";

function Instructions() {
    const {name} = useParams()
    const data = useSelector(state => state.studentReducer.exam)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        window.addEventListener("DOMContentLoaded", () => {
            const button = document.getElementById("btn");
            button.addEventListener("click", (e) => {
                // console.log(e.target.checked)
                document.body.requestFullscreen();
            });
        });
    }, [])

    const getExamQuestions = () => {

        setLoading(true)
        dispatch(handleGetExamQuestions(data?.module?.id, data?.module?.exam_available))
            .then(() => {
                navigate('begin')
                setLoading(false)
            }).catch(() => setLoading(false))
    }

    return (
        <div className={'flex justify-between items-start p-5 md:p-0 gap-x-3 w-full md:w-[900px] mx-auto h-screen'}>
            <div>
                <div className={'mb-3'}>
                    <p className={'capitalize font-medium text-sm'}>{name}</p>
                    <p className={'text-lg text-error-600 font-medium mb-2'}>Instructions</p>
                    <h3 className={'text-2xl font-medium'}>
                        Read the following instructions <br/> carefully before you start the exam
                    </h3>
                    <div className={'mt-3'}>
                        <p className={'flex items-center gap-x-2'}><FiCheck/> Do not open any browser</p>
                        <p className={'flex items-center gap-x-2'}><FiCheck/> Do not switch browser tabs</p>
                    </div>
                </div>
                <Checkbox id={'my-check'}>
                    <span className={'text-error-600 '}>I agree to follow all the instruction listed above.</span>
                </Checkbox>
                <div className={'flex items-center gap-x-2'}>
                    <Link to={'/'}>
                        <button
                            className={'bg-white border-gray-300 text-black px-3 h-12 text-base font-medium !rounded-lg mt-3 flex items-center gap-x-1'}>
                            <FiChevronsLeft/> Go Back
                        </button>
                    </Link>
                    <Spin spinning={loading} indicator={<LoadingOutlined/>} tip={'Please wait'}>
                        <button id={'btn'}
                            onClick={getExamQuestions}
                            className={'bg-error-600 text-white px-3 h-12 text-base font-medium !rounded-lg mt-3 flex items-center gap-x-2'}>
                            Start Exam
                        </button>
                    </Spin>
                </div>
            </div>
            <div className={'hidden md:block'}>
                <img height={'auto'} width={300} src={Instruction} alt={'Instructions'}/>
            </div>
        </div>
    )
}

export default Instructions
