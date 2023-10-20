import {Button, Space, Table} from 'antd'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useOutletContext} from 'react-router'
import {FiMail, FiPhone} from "react-icons/fi";
import TlaTableWrapper from "../commons/table/tla-table-wrapper";
import TlaImage from "../commons/tla-image";
import TlaAddNew from "../commons/tla-add-new";
import {handleGetAllEnquiries} from "../actions/enquiry/EnquiryAction";
import FilterEnquiries from "./filter-enquiries";
import EnquiryActions from "./equiry-actions";

const {Column} = Table

function AllEnquires(props) {
    const {getEnquiries, enquiries, filter} = props
    const {data, meta} = enquiries
    const [loading, setLoading] = useState(true)
    const {setPageInfo} = useOutletContext();
    useEffect(() => {
        setPageInfo({title: 'Students', addLink: '/students/form', buttonText: 'Student'})
        getEnquiries(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div className={'pb-10'}>
            <FilterEnquiries/>
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
                <Column title="D.o.B" dataIndex={['student', 'dob']}/>
                <Column title="Contact" render={(_, {student}) => (
                    <Space direction={'vertical'} size={1}>
                        <a className={'link-icon'} href={`mailto:${student.email}`}><FiMail/>{student.email}</a>
                        <a className={'link-icon'} href={`tel:${student.phone_number}`}><FiPhone/>{student.phone_number}
                        </a>
                        <a className={'link-icon'}
                           href={`tel:${student.alt_phone_number}`}><FiPhone/>{student.alt_phone_number}</a>
                    </Space>
                )}/>
                <Table.Column title={'Actions'} render={(_, record) => (
                   <EnquiryActions record={record}/>
                )}/>
            </TlaTableWrapper>
        </div>
    )
}

AllEnquires.propTypes = {
    pageInfo: PropTypes.object,
    getEnquiries: PropTypes.func,
    enquiries: PropTypes.object,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    enquiries: state.enquiryReducer.enquiries,
    filter: state.enquiryReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    getEnquiries: (payload) => dispatch(handleGetAllEnquiries(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllEnquires)
