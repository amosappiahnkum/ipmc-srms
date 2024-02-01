import React, {useState} from 'react'
import {Button, Popconfirm} from 'antd';
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import {useDispatch, useSelector} from "react-redux";
import CurrentQuestion from "./current-question";
import {switchQuestion} from "../../actions/batches/ActionCreators";
import {createGlobalStyle} from 'styled-components'
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import {handleSubmitResult} from "../../actions/batches/BatchAction";


const PageStyles = createGlobalStyle`
    * {
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
    }
`

function TakeExam() {
    document.addEventListener('contextmenu', event => {
        event.preventDefault();
    });

    const [keyStrokes, setKeyStrokes] = useState([])
    document.addEventListener('keydown', event => {
        setKeyStrokes([ ...keyStrokes, event.key ])
        event.preventDefault();
        return false;
    });

    const {questions, duration, id, program_module_id} = useSelector(state => state.batchReducer.exam)
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
            answers: examAnswers,
            total_questions: questions.length,
            time_left: timeLeft,
            key_strokes: keyStrokes
        }
        dispatch(handleSubmitResult(data)).then(() => {
            setLoading(false)
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

    return (
        <div className={'flex flex-col justify-center items-center h-screen bg-primary-100'}>
            <PageStyles/>
            <div className={'w-full md:w-[900px] mx-auto'}>
                <div className={'shadow-lg p-5 rounded-lg bg-white'}>
                    <div className={'flex items-center justify-between mb-3'}>
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
                        <div className={'flex items-center justify-end gap-x-5'}>
                            <span>{currentExamQuestion + 1}/{questions?.length}</span>
                            <CountdownCircleTimer
                                isPlaying={isPlaying}
                                duration={duration * 60}
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
                    <CurrentQuestion question={questions[currentExamQuestion]}/>
                    <div className={'flex items-center justify-end gap-x-2 mt-5'}>
                        <div className={'flex items-center gap-x-2'}>
                            {
                                currentExamQuestion > 0 &&
                                <Button onClick={() => {
                                    handleSwitch('prev')
                                }}
                                        type={'default'}> <FiChevronLeft/> Previous</Button>
                            }

                            {
                                currentExamQuestion === questions.length - 1 && (
                                    <Popconfirm
                                        title="Confirm Submission"
                                        description="Are you sure you want to submit?"
                                        onConfirm={onFinish}
                                        okText="Yes"
                                        cancelText="No">
                                        <Button type={"primary"}>
                                            Submit <FiChevronRight/>
                                        </Button>
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
            </div>
        </div>
    )
}

export default TakeExam
