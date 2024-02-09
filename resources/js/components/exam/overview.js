import React from 'react';
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

const Overview = ({handleSwitch}) => {
    const {questions} = useSelector(state => state.batchReducer.exam)
    const {examAnswers, reviews } = useSelector(state => state.batchReducer)

    const hasAnswer = (id) => examAnswers.find((answer) => answer.id === id)
    const inReview = (id)  => reviews.find((review) => review.id === id)
    return (
        <div className={'grid grid-cols-5 gap-2 mt-3'}>
            {
                questions?.map(({id}, index) => (
                    <div onClick={() => {
                        handleSwitch(index)
                    }}
                         className={`${hasAnswer(id) ? 'bg-primary-800 text-white' : 'bg-white'}
                         ${inReview(id) ? 'border-white-400 border-4 border-double' : 'border-white-400'}
                          rounded-full border p-1 flex items-center justify-center text-xs cursor-pointer h-10 w-10`}
                         key={id}>
                        {index + 1}
                    </div>
                ))
            }
        </div>
    );
};


Overview.propTypes = {
    handleSwitch: PropTypes.func.isRequired
}

export default Overview;
