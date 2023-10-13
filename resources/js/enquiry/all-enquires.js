import {Button, Dropdown, Space, Spin, Table, theme} from 'antd'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useOutletContext} from 'react-router'
import {FiMail, FiMoreVertical, FiPhone} from "react-icons/fi";
import TlaTableWrapper from "../commons/table/tla-table-wrapper";
import TlaImage from "../commons/tla-image";
import TlaAddNew from "../commons/tla-add-new";
import {handleGetAllEnquiries, handlePrintEnquiry} from "../actions/enquiry/EnquiryAction";

const {Column} = Table
const {useToken} = theme;

function AllEnquires(props) {
    const {token} = useToken();
    const {getEnquiries, enquiries, filter, printEnquiry} = props
    const {data, meta} = enquiries
    const [loading, setLoading] = useState(true)
    const [printing, setPrinting] = useState(false)
    const {setPageInfo} = useOutletContext();
    useEffect(() => {
        setPageInfo({title: 'Students', addLink: '/students/form', buttonText: 'Student'})

        getEnquiries(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    const items = [];


    const contentStyle = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
        width: 100
    };
    return (
        <div className={'pb-10'}>
            {/*<FilterStudents/>*/}
            <TlaTableWrapper
                formLoading={loading}
                filterObj={filter}
                callbackFunction={getEnquiries}
                data={data} meta={meta}>
                <Column title="Name" render={(_, record) => (
                    <Space>
                        <TlaImage size={40} src={'Avatar'} name={record.student.name}/>
                        <Space direction={'vertical'} size={1}>
                            {record.student.name}
                            <TlaAddNew data={record} link={`${record.student.name}/details`}>
                                <Button>Detail</Button>
                            </TlaAddNew>
                        </Space>
                    </Space>
                )}/>
                <Column title="sponsor" render={(_, {student}) => (
                    <Space direction={'vertical'} size={1}>
                        <p>{student.sponsor_name}</p>
                        <a className={'link-icon'} href={`mailto:${student.sponsor_email}`}>
                            <FiMail/>{student.sponsor_email}
                        </a>
                        <a className={'link-icon'} href={`tel:${student.sponsor_number}`}>
                            <FiPhone/>{student.sponsor_number}
                        </a>
                    </Space>
                )}/>
                <Column title="D.o.B" dataIndex={['student','dob']}/>
                <Column title="Contact" render={(_, {student}) => (
                    <Space direction={'vertical'} size={1}>
                        <a className={'link-icon'} href={`mailto:${student.email}`}><FiMail/>{student.email}</a>
                        <a className={'link-icon'} href={`tel:${student.phone_number}`}><FiPhone/>{student.phone_number}</a>
                        <a className={'link-icon'} href={`tel:${student.alt_phone_number}`}><FiPhone/>{student.alt_phone_number}</a>
                    </Space>
                )}/>
                <Table.Column title={'Actions'} render={(_, record) => (
                    <Spin spinning={printing}>
                        <Dropdown
                            menu={{items}}
                            dropdownRender={(menu) => (
                                <div style={contentStyle}>
                                    {React.cloneElement(menu, {style: {boxShadow: 'none', width: '100%'},})}
                                    <div className={'px-1 pb-2 flex flex-col gap-2'}>
                                        <TlaAddNew data={{studentId: record?.student_id}} link={'/students/enroll'}>
                                            <p className={'rounded-lg px-3 py-1 hover:bg-gray-100 hover:text-black !w-full rounded-sm'}>Enroll</p>
                                        </TlaAddNew>
                                        <p className={'rounded-lg px-3 py-1 hover:bg-gray-100 hover:text-black !w-full rounded-sm cursor-pointer'}
                                           onClick={() => {
                                               setPrinting(true)
                                               printEnquiry(record.id).then(() => setPrinting(false))
                                           }}>Print</p>
                                    </div>
                                </div>
                            )}>
                            <Button size={'small'}><FiMoreVertical/></Button>
                        </Dropdown>
                    </Spin>

                )}/>
            </TlaTableWrapper>
        </div>
    )
}

AllEnquires.propTypes = {
    pageInfo: PropTypes.object,
    getEnquiries: PropTypes.func,
    printEnquiry: PropTypes.func,
    enquiries: PropTypes.object,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    enquiries: state.enquiryReducer.enquiries,
    filter: state.enquiryReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    getEnquiries: (payload) => dispatch(handleGetAllEnquiries(payload)),
    printEnquiry: (enquiryId) => dispatch(handlePrintEnquiry(enquiryId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllEnquires)
