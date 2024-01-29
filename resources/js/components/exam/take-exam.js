import React from 'react'
import {Button, Statistic} from 'antd';
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";

const {Countdown} = Statistic;

function TakeExam() {
    const deadline = Date.now() + 1000 * 60 * 60; // Dayjs is also OK

    const onFinish = () => {
        console.log('finished!');
    };

    return (
        <div className={'flex flex-col justify-center items-center h-screen bg-gray-100'}>
            <div className={'bg-white shadow-lg pt-3 px-3 w-fit'}>
                <Countdown title="Time Left" value={deadline} onFinish={onFinish}/>
            </div>
            <div className={'w-full md:w-[900px] mx-auto shadow-lg p-5 rounded-lg bg-white'}>
                <div className={'flex items-center justify-between border-b pb-2'}>
                    <span>17/60</span>
                    <button className={'text-error-600 uppercase font-medium'}>
                        End Exam
                    </button>
                </div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus debitis dolorum eos facilis
                    inventore ipsum iure iusto nulla? Adipisci deleniti ea et incidunt neque non omnis quam, repellat
                    sit voluptatem.
                </p>
                <div className={'flex items-center justify-center gap-x-2 mt-5'}>
                    <Button type={'default'}> <FiChevronLeft/> Previous</Button>
                    <Button type={"primary"}> Next <FiChevronRight/> </Button>
                </div>
            </div>
        </div>
    )
}

export default TakeExam
