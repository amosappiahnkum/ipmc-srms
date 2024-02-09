import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import {Button} from "antd";
import {Link} from "react-router-dom";
import Happy from "../../assets/icons/happy.png";

const Passed = () => {
    const { width, height } = useWindowSize()
    return (
        <div className={'flex items-center h-screen'}>
            <Confetti
                width={width}
                height={height}
            />

            <div className={'bg-white w-fit mx-auto rounded-lg text-center p-10'}>
                <img height={'auto'} width={100} className={'mx-auto m-5'} src={Happy} alt="Passed"/>
                <h1 className={'text-4xl font-bold text-green-900 mb-4'}>Congratulations!</h1>
                <h1 className={'text-xl mb-5 uppercase text-green-900'}>You passed</h1>

                <Link to={'/'}>
                    <Button className={'w-fit mx-auto'} size={'large'}>Go Home</Button>
                </Link>
            </div>
        </div>
    )
}

export default Passed
