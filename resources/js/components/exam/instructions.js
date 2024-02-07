import React, {useState} from 'react'
import Instruction from '../../assets/img/instruction.svg'
import {Checkbox, Spin} from "antd";
import {FiCheck, FiChevronsLeft} from "react-icons/fi";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {handleGetExamQuestions} from "../../actions/batches/BatchAction";
import {LoadingOutlined} from "@ant-design/icons";

function Instructions() {
    const data = useSelector(state => state.studentReducer.exam)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    console.log(data)
    const toggleFullScreen = () => {
        const isFullScreen = document.fullscreenElement

        if (isFullScreen) {
            document.exitFullscreen();
        }else {
            document.body.requestFullscreen();
        }

    }

    const getExamQuestions = () => {

        setLoading(true)
        dispatch(handleGetExamQuestions(data?.module?.id))
            .then(() => {
                navigate('begin')
                setLoading(false)
            }).catch(() => setLoading(false))
    }

    return (
        <div className={'flex justify-between items-center p-5 md:p-0 gap-x-3 w-full md:w-[900px] mx-auto h-screen pt-10'}>
            <div>
                <div className={'mb-3'}>
                    <p className={'capitalize font-medium text-sm'}>Program: {data?.module?.program}</p>
                    <p className={'capitalize font-medium text-sm'}>Module: {data?.module?.subject}</p>
                    <h3 className={'text-2xl text-error-600 font-medium my-5'}>
                        Read the following instructions <br/> carefully before you start the exam
                    </h3>
                    <div className={'mt-3'}>
                        <p className={'flex items-center gap-x-2'}><FiCheck/> Do not open any browser tab</p>
                        <p className={'flex items-center gap-x-2'}><FiCheck/> Do not switch browser tabs</p>
                        <p className={'flex items-center gap-x-2'}><FiCheck/> Do not use the keyboard</p>
                    </div>
                </div>
                <Checkbox onChange={toggleFullScreen}>
                    <span className={'text-error-600 '}>I agree to follow all the instruction listed above.</span>
                </Checkbox>
                <div className={'flex items-center gap-x-2'}>
                    <Link to={'/'}>
                        <button onClick={() => {document.exitFullscreen()}}
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
