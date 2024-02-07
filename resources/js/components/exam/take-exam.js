import React, {useState} from 'react'
import {Button, Popconfirm} from 'antd';
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import {useDispatch, useSelector} from "react-redux";
import CurrentQuestion from "./current-question";
import {switchQuestion} from "../../actions/batches/ActionCreators";
import {createGlobalStyle} from 'styled-components'
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import {handleSubmitResult} from "../../actions/batches/BatchAction";
import Tools from "./tools";


const PageStyles = createGlobalStyle`
    * {
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
    }

    body {
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    .content {
        padding: 20px;
        overflow-y: scroll;
        //height: calc(100vh - 300px);
        scrollbar-width: thin; /* "auto" or "thin" */
        scrollbar-color: rgba(166, 166, 176, 0.11) #ffffff;
    }

    .chat-list {
        overflow-y: auto;
        height: calc(100vh - 70px);
        scrollbar-width: thin;
        scrollbar-color: rgba(166, 166, 176, 0.11) #ffffff;
    }
`

function TakeExam() {
    /*document.addEventListener('contextmenu', event => {
        event.preventDefault();
    });

    const [keyStrokes, setKeyStrokes] = useState([])
    document.addEventListener('keydown', event => {
        setKeyStrokes([ ...keyStrokes, event.key ])
        event.preventDefault();
        return false;
    });*/

    const {questions, duration, id, program_module_id, program, subject} = useSelector(state => state.batchReducer.exam)
    const studentName = useSelector(state => state.userReducer.loggedInUser.name)
    const studentId = useSelector(state => state.userReducer.loggedInUser?.staff_id)
    const [timeLeft, setTimeLeft] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [loading, setLoading] = useState(false)

    const {currentExamQuestion, examAnswers} = useSelector(state => state.batchReducer)

    const dispatch = useDispatch()

    const onFinish = () => {
        setIsPlaying(false)
        const data = {
            program_module_id,
            exam_id: id,
            student_id: studentId,
            answers: examAnswers,
            total_questions: questions.length,
            time_left: timeLeft,
            // key_strokes: keyStrokes
        }
        dispatch(handleSubmitResult(data)).then(() => {
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    };

    window.onblur = function () {
        // onFinish()
    };

    const handleSwitch = (type) => {
        dispatch(switchQuestion(type))
    }

    return (
        <div className={'bg-white h-screen'}>
            <PageStyles/>
            <div className={'h-14 shadow-sm flex items-center justify-between mb-3 px-5'}>
                <div className={'flex items-center justify-end gap-x-5'}>
                    <span>{currentExamQuestion + 1}/{questions?.length}</span>
                    <div className={'bg-white p-2 rounded-full mt-5 shadow-sm z-[999]'}>
                        <CountdownCircleTimer
                            isPlaying={isPlaying}
                            duration={duration}
                            strokeWidth={5}
                            size={80}
                            onComplete={onFinish}
                            colors={['#0f7c00', '#F7B801', '#e35900', '#A30000']}
                            colorsTime={[duration, (duration / 2), 15, 0]}
                            onUpdate={(time) => setTimeLeft(time)}>
                            {({remainingTime}) => new Date(remainingTime * 1000).toISOString().slice(11, 19)}
                        </CountdownCircleTimer>
                    </div>
                </div>
                <Popconfirm
                    title="Confirm Submission"
                    description="Are you sure you want to end the exam?"
                    onConfirm={onFinish}
                    okText="Yes"
                    cancelText="No">
                    <Button danger>
                        End Exam
                    </Button>
                </Popconfirm>
            </div>
            <div className={'grid grid-cols-4'}>
                <div className={'col-span-3 relative'}>
                    <div className={'content h-[calc(100vh_-_200px)] md:h-[calc(100vh_-_150px)] p-5 bg-white'}>
                        <CurrentQuestion question={questions[currentExamQuestion]}/>
                    </div>
                    <div className={'flex items-center gap-x-2 bottom-52 py-3 px-5 absolute w-full bg-white'}>
                        {
                            currentExamQuestion > 0 &&
                            <Button onClick={() => {
                                handleSwitch('prev')
                            }} type={'default'}> <FiChevronLeft/> Previous</Button>
                        }

                        {
                            currentExamQuestion === questions.length - 1 && (
                                <Popconfirm
                                    title="Confirm Submission"
                                    description="Are you sure you want to submit?"
                                    onConfirm={onFinish}
                                    okText="Yes"
                                    cancelText="No">
                                    <Button type={"primary"}> Submit <FiChevronRight/></Button>
                                </Popconfirm>

                            )
                        }
                        {
                            currentExamQuestion < questions.length - 1 && (
                                <Button onClick={() => {
                                    handleSwitch('next')
                                }}
                                        type={"primary"}> Next <FiChevronRight/>
                                </Button>
                            )
                        }
                    </div>
                </div>
                <div className={'bg-white chat-list px-3 py-5 border-l'}>
                    <Tools/>
                    <div className={'mb-3'}>
                        <small className={'text-xs !font-medium'}>STUDENT</small>
                        <p>{studentName}</p>
                    </div>
                    <div className={'mb-3'}>
                        <small className={'text-xs !font-medium'}>CLASS</small>
                        <p>{program}</p>
                    </div>
                    <div>
                        <small className={'text-xs !font-medium'}>MODULE</small>
                        <p>{subject}</p>
                    </div>
                    {/*{
                    [...Array(questions.length).keys()].map(item => (
                        <div onClick={() => { handleSwitch(item) }}
                             className={'bg-white p-1 text-xs cursor-pointer'} key={item}>
                            { item+1 }
                        </div>
                    ))
                }*/}
                </div>
            </div>
        </div>
    )
}

export default TakeExam
