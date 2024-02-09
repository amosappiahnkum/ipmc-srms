import React from 'react'
import {Button} from "antd";
import {Link} from "react-router-dom";
import Sad from '../../assets/icons/sad.png'

const Failed = () => {
    return (
        <div className={'flex items-center h-screen'}>
            <div className={'bg-white w-fit mx-auto rounded-lg text-center p-10'}>
                <img height={'auto'} width={100} className={'mx-auto m-5'} src={Sad} alt="Failed"/>
                <h1 className={'text-4xl font-bold text-red-700 mb-4'}>Better luck next time!</h1>
                <h1 className={'text-xl mb-5 uppercase text-red-700'}>You failed</h1>

                <Link to={'/'}>
                    <Button className={'w-fit mx-auto'} size={'large'}>Go Home</Button>
                </Link>
            </div>
        </div>
    )
}

export default Failed
