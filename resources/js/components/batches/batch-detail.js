import React from 'react'
import BatchStudents from "./batch-students";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

function BatchDetail() {
    const batch = useSelector(state => state.batchReducer.batch)

    return (
        <div className={'pb-10'}>
            <div>
                <div className={'p-2 rounded-lg w-fit mb-2'}>
                    <p className={'text-lg'}>{`${batch?.program} | ${batch?.staff} | ${batch?.batch_time}`}</p>
                </div>
            </div>
            <div className={'grid grid-cols-3 gap-3'}>
                <div className={'col-span-2 bg-white p-5 rounded-lg'}>
                    <p className={'text-base font-medium'}>Modules</p>
                    {
                        batch?.modules?.map((item) => (
                            <Link  key={item.id} to={item?.name.toLowerCase()}>
                                <div className={'py-3 flex justify-between border-b'}>
                                    <div>
                                        <h3 className={'text-sm capitalize'}>
                                            {item?.name.toLowerCase()}
                                        </h3>
                                        {
                                            item?.semester &&
                                            <small
                                                className={`text-[10px] text-gray-500 font-medium w-fit uppercase`}>
                                                Semester {item?.semester}
                                            </small>
                                        }
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
                <div className={'bg-white py-5 rounded-lg h-fit'}>
                    <p className={'text-base font-medium px-5'}>Students</p>
                    <BatchStudents batchId={batch?.id}/>
                </div>
            </div>
        </div>
    )
}

export default BatchDetail
