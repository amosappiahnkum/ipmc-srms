import React, {useState} from 'react'
import {Button, Popconfirm, Spin} from 'antd';
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import {useDispatch, useSelector} from "react-redux";
import CurrentQuestion from "./current-question";
import {addToReview, switchQuestion} from "../../actions/batches/ActionCreators";
import {createGlobalStyle} from 'styled-components'
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import {handleSubmitResult} from "../../actions/batches/BatchAction";
import Tools from "./tools";
import {LoadingOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";


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
    document.addEventListener('contextmenu', event => {
        event.preventDefault();
    });
    const [keyStrokes, setKeyStrokes] = useState([])
    document.addEventListener('keydown', event => {
        setKeyStrokes([...keyStrokes, event.key])
        event.preventDefault();
        return false;
    });

    const {questions, duration, id, program_module_id, examable_id, examable_type} = useSelector(state => state.batchReducer.exam)
    const studentId = useSelector(state => state.userReducer.loggedInUser?.staff_id)
    const [timeLeft, setTimeLeft] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [loading, setLoading] = useState(false)

    const {currentExamQuestion, examAnswers, reviews} = useSelector(state => state.batchReducer)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const onFinish = () => {
        setIsPlaying(false)
        const data = {
            program_module_id,
            exam_id: id,
            exam_type: examable_id,
            type: examable_type,
            student_id: studentId,
            answers: examAnswers,
            total_questions: questions.length,
            time_left: timeLeft,
            key_strokes: keyStrokes
        }

        dispatch(handleSubmitResult(data)).then((res) => {
            setLoading(false)
            navigate(`/take-exams/${id}/completed`, { state: { data: res.data }})
        }).catch(() => {
            setLoading(false)
        })
    };

    window.onblur = function () {
        onFinish()
    };

    const handleSwitch = (type) => {
        dispatch(switchQuestion(type))
    }

    const inReview = (id) => reviews.find((review) => review.id === id)
    return (
        <Spin spinning={loading} tip={'Submitting...'} indicator={<LoadingOutlined/>}>
            {
                loading === false &&
                <div className={'bg-white max-w-screen-2xl mx-auto'}>
                    <PageStyles/>
                    <div className={'h-14 shadow-sm flex items-center justify-between mb-3 px-5'}>
                        <div className={'flex items-center justify-end gap-x-5'}>
                            <span>{currentExamQuestion + 1}/{questions?.length}</span>
                            <div className={'bg-white p-2 rounded-full mt-10 shadow-sm z-[999]'}>
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
                            <div className={'content h-[calc(100vh_-_150px)] md:h-[calc(100vh_-_150px)] bg-white'}>
                                <div className={'pt-5'}>
                                    <CurrentQuestion question={questions[currentExamQuestion]}/>
                                </div>
                            </div>
                            <div
                                className={'bg-gray-100 flex items-center justify-between bottom-0 gap-x-2 py-3 px-5 absolute w-full'}>
                                <div className={'flex items-center justify-between gap-x-2'}>
                                    <Button onClick={() => {
                                        dispatch(addToReview({id: questions[currentExamQuestion].id}))
                                    }}>{inReview(questions[currentExamQuestion].id) ? 'Unmark' : 'Mark'} for Review</Button>
                                    <Button danger>Report</Button>
                                </div>
                                <div className={'flex items-center justify-between gap-x-2'}>
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
                        </div>
                        <div className={'bg-white chat-list px-3 py-5 border-l'}>
                            <Tools handleSwitch={handleSwitch}/>
                        </div>
                    </div>
                </div>
            }


        </Spin>
    )
}

export default TakeExam
