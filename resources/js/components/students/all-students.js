import {Button, Dropdown, Space, Table, theme} from 'antd'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useOutletContext} from 'react-router'
import {handleGetAllStudents, handlePrintSingleStudent} from "../../actions/students/StudentAction";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import TlaImage from "../../commons/tla-image";
import TlaAddNew from "../../commons/tla-add-new";
import {FiMail, FiMoreVertical, FiPhone} from "react-icons/fi";
import FilterStudents from "./filter-students";
import Validate from "../../commons/validate";

const {Column} = Table
const {useToken} = theme;

function AllStudents(props) {
    const {token} = useToken();
    const {getStudents, students, filter, printStudent} = props
    const {data, meta} = students
    const [loading, setLoading] = useState(true)
    const {setPageInfo} = useOutletContext();
    useEffect(() => {
        setPageInfo({title: 'Students', addLink: '/students/form', buttonText: 'Student'})

        getStudents(new URLSearchParams(filter)).then(() => {
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
            <FilterStudents/>
            <TlaTableWrapper
                formLoading={loading}
                filterObj={filter}
                callbackFunction={getStudents}
                data={data} meta={meta}>
                <Column title="Name" render={(_, record) => (
                    <Space>
                        <TlaImage size={40} src={'Avatar'} name={record.name}/>
                        <Space direction={'vertical'} size={1}>
                            {record.name}
                            <TlaAddNew data={record} link={`${record.name}/details`}>
                                <Button>Detail</Button>
                            </TlaAddNew>
                        </Space>
                    </Space>
                )}/>
                <Column title="sponsor" render={(_, {sponsor_name, sponsor_email, sponsor_number}) => (
                    <Space direction={'vertical'} size={1}>
                        <p>{sponsor_name}</p>
                        <Validate show={sponsor_email}>
                            <a className={'link-icon'} href={`mailto:${sponsor_email}`}>
                                <FiMail/>{sponsor_email}
                            </a>
                        </Validate>
                        <Validate show={sponsor_number}>
                            <a className={'link-icon'} href={`tel:${sponsor_number}`}>
                                <FiPhone/>{sponsor_number}
                            </a>
                        </Validate>
                    </Space>
                )}/>
                <Column title="D.o.B" dataIndex={'dob'}/>
                <Column title="registrations" render={(_, {registrations}) => (
                    <Space direction={'vertical'} size={1}>
                        {registrations.length}
                    </Space>
                )}/>
                <Column title="Contact" render={(_, {phone_number, alt_phone_number, email}) => (
                    <Space direction={'vertical'} size={1}>
                        <Validate show={email}>
                            <a className={'link-icon'} href={`mailto:${email}`}><FiMail/>{email}</a>
                        </Validate>
                        <Validate show={phone_number}>
                            <a className={'link-icon'} href={`tel:${phone_number}`}><FiPhone/>{phone_number}</a>
                        </Validate>
                        <Validate show={alt_phone_number}>
                            <a className={'link-icon'} href={`tel:${alt_phone_number}`}><FiPhone/>{alt_phone_number}</a>
                        </Validate>
                    </Space>
                )}/>
                <Table.Column title={'Actions'} render={(_, record) => (
                    <Dropdown
                        menu={{items}}
                        dropdownRender={(menu) => (
                            <div style={contentStyle}>
                                {React.cloneElement(menu, {style: {boxShadow: 'none', width: '100%'},})}
                                <div className={'px-1 pb-2 flex flex-col gap-2'}>
                                    <TlaAddNew data={{studentId: record?.id}} link={'enroll'}>
                                        <p className={'rounded-lg px-3 py-1 hover:bg-gray-100 hover:text-black !w-full rounded-sm'}>Enroll</p>
                                    </TlaAddNew>
                                    <TlaAddNew data={record} link={'form'}>
                                        <p className={'rounded-lg px-3 py-1 hover:bg-gray-100 hover:text-black !w-full rounded-sm'}>Edit</p>
                                    </TlaAddNew>

                                    <Button onClick={() => {
                                        setLoading(true)
                                        printStudent(record.id).then(() => setLoading(false))
                                    }}>Print</Button>
                                </div>
                            </div>
                        )}>
                        <Button size={'small'}><FiMoreVertical/></Button>
                    </Dropdown>

                )}/>
            </TlaTableWrapper>
        </div>
    )
}

AllStudents.propTypes = {
    pageInfo: PropTypes.object,
    getStudents: PropTypes.func,
    printStudent: PropTypes.func,
    students: PropTypes.object,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    students: state.studentReducer.students,
    filter: state.studentReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    getStudents: (payload) => dispatch(handleGetAllStudents(payload)),
    printStudent: (studentId) => dispatch(handlePrintSingleStudent(studentId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllStudents)
