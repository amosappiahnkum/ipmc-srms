import {Button, Card} from 'antd'
import React from 'react'
import TlaAddNew from "../../commons/tla-add-new";
import {FiEdit2, FiPlus} from "react-icons/fi";
import {useSelector} from "react-redux";

function AllFollowUps() {
   const {id, follow_ups} = useSelector(state => state.enquiryReducer.enquiry)
    return (
        <div className={'pb-10'}>
            <div className={'ml-auto w-fit mb-2'}>
                <TlaAddNew data={{enquiry_id: id}} link={`/enquires/follow-up`}>
                    <Button icon={<FiPlus/>} type={'primary'}>Add Follow Up</Button>
                </TlaAddNew>
            </div>
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                {
                    follow_ups.map((item) => (
                        <Card key={item.id} extra={[
                            <TlaAddNew key={'edit'} data={item} link={`/enquires/follow-up`}>
                                <Button type={'text'} icon={<FiEdit2/>}>&nbsp;Edit</Button>
                            </TlaAddNew>
                        ]} size={'small'} title={<p>{item.follow_up_date}</p>}>
                            <p>{item.feedback}</p>
                            <p className={'mt-3'}><b>Mode: </b>&nbsp;{item.mode}</p>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}

AllFollowUps.propTypes = {}

export default AllFollowUps
