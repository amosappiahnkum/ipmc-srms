import React from 'react'
import {TlaModal} from "../commons/pop-ups/tla-modal";
import {useLocation} from "react-router-dom";
import {Card, Descriptions} from "antd";

function EnquiryDetail() {
    const {state} = useLocation()
    const data = state?.data
    return (
        <TlaModal width={1000} file={null} title={data?.student?.name}>
            <div className={'grid grid-cols-3 gap-2'}>
                <Card size={'small'} title={'Personal Details'}>
                    <Descriptions column={{xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1}}>
                        <Descriptions.Item label={'Name'}>{data?.student?.name}</Descriptions.Item>
                        <Descriptions.Item label={'House No'}>{data?.student?.house_number}</Descriptions.Item>
                        <Descriptions.Item label={'Box Address'}>{data?.student?.box_address}</Descriptions.Item>
                        <Descriptions.Item label={'Mobile Number'}>{data?.student?.phone_number}</Descriptions.Item>
                        <Descriptions.Item
                            label={'Alt Mobile Number'}>{data?.student?.alt_phone_number}</Descriptions.Item>
                        <Descriptions.Item label={'Country'}>{data?.student?.country}</Descriptions.Item>
                        <Descriptions.Item label={'Nationality'}>{data?.student?.nationality}</Descriptions.Item>
                        <Descriptions.Item label={'Email'}>{data?.student?.email}</Descriptions.Item>
                    </Descriptions>
                </Card>
                <Card size={'small'} title={'Programs'}>
                    <Descriptions column={{xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1}}>
                        {
                            data?.enquiry_programs.map((program) => (
                                <Descriptions.Item key={program.id}>
                                    <p style={{ textWrap: 'wrap' }}>{ program.name }</p>
                                </Descriptions.Item>
                            ))
                        }
                        <Descriptions.Item>
                            <p style={{ textWrap: 'wrap' }}>{ data?.other_program }</p>
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
                <div>
                    <Card size={'small'} title={'Educational Qualification'}>
                        <Descriptions column={{xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1}}>
                            {
                                data?.student?.education_qualifications.map((edu) => (
                                    <Descriptions.Item key={edu}>{ edu }</Descriptions.Item>
                                ))
                            }
                        </Descriptions>
                    </Card> <br/>
                    <Card size={'small'} title={'Preferred Timings'}>
                        <Descriptions column={{xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1}}>
                            {
                                data?.preferred_timings.map((time) => (
                                    <Descriptions.Item key={time}>{ time }</Descriptions.Item>
                                ))
                            }
                            <Descriptions.Item>
                                <p style={{ textWrap: 'wrap' }}>{ data?.other_preferred_timing }</p>
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </div>
                <Card size={'small'} title={'Sponsor'}>
                    <Descriptions column={{xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1}}>
                        <Descriptions.Item label={'Name'}>{ data?.student?.sponsor_name }</Descriptions.Item>
                        <Descriptions.Item label={'Email'}>{ data?.student?.sponsor_email }</Descriptions.Item>
                        <Descriptions.Item label={'Phone'}>{ data?.student?.sponsor_number }</Descriptions.Item>
                        <Descriptions.Item label={'Relationship'}>{ data?.student?.sponsor_relationship }</Descriptions.Item>
                    </Descriptions>
                </Card>
                <Card size={'small'} title={'How did you know abut IPMC?'}>
                    <Descriptions column={{xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1}}>
                        {
                            data?.heard.map((h) => (
                                <Descriptions.Item key={h}>
                                    <p style={{ textWrap: 'wrap' }}>{ h }</p>
                                </Descriptions.Item>
                            ))
                        }
                        <Descriptions.Item>
                            <p style={{ textWrap: 'wrap' }}>{ data?.other_heard }</p>
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            </div>
        </TlaModal>
    )
}

export default EnquiryDetail
