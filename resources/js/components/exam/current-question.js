import React from 'react'
import {Checkbox, Radio, Space} from 'antd';
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {answerQuestion} from "../../actions/batches/ActionCreators";
import {createGlobalStyle} from "styled-components";

const Styles = createGlobalStyle`
    .ant-checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 20px
    }

    :where(.css-dev-only-do-not-override-mxhywb).ant-checkbox-wrapper + .ant-checkbox-wrapper {
        margin-inline-start: 0;
    }
`

function CurrentQuestion({question}) {
    const answers = useSelector(state => state.batchReducer.examAnswers)

    let currentAnswer = answers.find(item => item.id === question.id)

    const dispatch = useDispatch()
    const handleAnswer = (e) => {
        dispatch(answerQuestion({
            id: question.id,
            answer: e.target.value
        }))
    }

    const onChange = (checkedValues) => {
        dispatch(answerQuestion({
            id: question.id,
            answer: checkedValues
        }))
    };

    const options = Object.keys(question?.options).map((item) => {
        if (question?.options[item] !== null) {
            return {
                label: question?.options[item],
                value: item,
            }
        }
        return {
            label: null,
            value: '',
        }
    });

    return (
        <div>
            <Styles/>
            <p className={'text-base mb-3'}>{question?.text}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Animi at aut autem blanditiis explicabo impedit laboriosam nam necessitatibus perspiciatis possimus
                provident quo, quod rerum sit vitae. Ea illum suscipit unde!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Animi at aut autem blanditiis explicabo impedit laboriosam nam necessitatibus perspiciatis possimus
                provident quo, quod rerum sit vitae. Ea illum suscipit unde!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Animi at aut autem blanditiis explicabo impedit laboriosam nam necessitatibus perspiciatis possimus
                provident quo, quod rerum sit vitae. Ea illum suscipit unde!
            </p>
            <div>
                {
                    question?.type === 'multi' ?
                        <Checkbox.Group defaultValue={currentAnswer?.answer} options={options} onChange={onChange}/>
                        : <Radio.Group onChange={(value) => {
                            handleAnswer(value)
                        }} value={currentAnswer?.answer}>
                            <Space direction="vertical" className={'w-full'}>
                                {
                                    Object.keys(question?.options)?.map((option, index) => (
                                        question?.options[option] &&
                                        <div className={'p-2 w-full'} key={index}>
                                            <Radio value={option}>
                                                {question?.options[option]}
                                            </Radio>
                                        </div>
                                    ))
                                }
                            </Space>
                        </Radio.Group>
                }

            </div>
        </div>
    )
}

CurrentQuestion.propTypes = {
    question: PropTypes.object.isRequired
}

export default CurrentQuestion
