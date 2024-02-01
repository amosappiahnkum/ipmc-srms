import React, {useEffect, useState} from 'react'
import {Radio, Space} from 'antd';
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {answerQuestion} from "../../actions/batches/ActionCreators";

function CurrentQuestion({question}) {
    const answers = useSelector(state => state.batchReducer.examAnswers)

    const [currentAnswer, setCurrentAnswer] = useState(answers.find(item => item.id === question.id))

    useEffect(() => {
        setCurrentAnswer(answers.find(item => item.id === question.id))
    }, [question, answers])

    const dispatch = useDispatch()
    const handleAnswer = (e) => {
        dispatch(answerQuestion({
            id: question.id,
            answer: e.target.value
        }))
    }

    return (
        <div>
            <p className={'text-lg mb-3'}>{question?.text}</p>
            <div>
                <Radio.Group onChange={(value) => {
                    handleAnswer(value)
                }} value={currentAnswer?.answer}>
                    <Space direction="vertical" className={'w-full'}>
                        {
                            Object.keys(question?.options)?.map((option, index) => (
                                question?.options[option] &&
                                <div className={'p-2 w-full'} key={index}>
                                    <Radio value={option}>
                                        {question?.options[option]} {question?.id}
                                    </Radio>
                                </div>
                            ))
                        }
                    </Space>
                </Radio.Group>
            </div>
        </div>
    )
}

CurrentQuestion.propTypes = {
    question: PropTypes.object.isRequired
}

export default CurrentQuestion
