import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect, useDispatch, useSelector} from "react-redux";
import {useOutletContext} from 'react-router'
import {handleGetMyPrograms} from "../../../actions/students/StudentAction";
import {FiCalendar} from "react-icons/fi";
import {BiTime} from "react-icons/bi";
import TlaImage from "../../../commons/tla-image";
import {getMyProgramDetail} from "../../../actions/students/ActionCreators";
import {useNavigate} from "react-router-dom";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";


function MyPrograms(props) {
    const {getMyPrograms, filter} = props
    const studentId = useSelector(state => state.userReducer?.loggedInUser?.staff_id)
    const {data} = useSelector(state => state.studentReducer.myPrograms)
    const [loading, setLoading] = useState(true)
    const {setPageInfo} = useOutletContext();
    useEffect(() => {
        setPageInfo({title: 'Students', addLink: '/students/form', buttonText: 'Student'})

        getMyPrograms(studentId, new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const goToDetails = (record) => {
        dispatch(getMyProgramDetail(record))
        navigate(`${record?.ongoing_program?.id}/details`)
    }

    return (
        <Spin spinning={loading} indicator={<LoadingOutlined/>}>
            <div className={'pb-10 flex flex-wrap gap-3'}>
                {
                    data.map((item) => (
                        <div key={item.id}
                             className={'bg-white shadow-md w-full md:w-[350px]'}>
                            <div className={'glass-cover'}>
                                <div className={'p-3 glass-bg h-40'}>
                                    <small className={'text-gray-300 uppercase font-bold'}>Program</small>
                                    <h3 className={'text-white text-xl text-wrap font-thin'}>{item?.ongoing_program?.program}</h3>
                                </div>
                            </div>
                            <div className={'p-3 py-5 flex justify-between items-center'}>
                                <div className={'flex items-center gap-x-2'}>
                                    <TlaImage name={item?.ongoing_program?.staff} preview size={60}/>
                                    <p className={'!font-medium'}>{item?.ongoing_program?.staff}</p>
                                </div>

                                <div className={'border-l pl-2'}>
                                    <div className={'flex items-center gap-x-2'}>
                                        <FiCalendar/>
                                        <p>{item?.ongoing_program?.start_date}</p>
                                    </div>
                                    <div className={'flex items-center gap-x-2'}>
                                        <BiTime/>
                                        <p>{item?.ongoing_program?.batch_time}</p>
                                    </div>
                                </div>
                            </div>
                            <div onClick={() => {
                                goToDetails(item)
                            }} className={'cursor-pointer bg-primary-500 text-white py-3 text-center text-xs uppercase'}>
                                Detail
                            </div>
                        </div>
                    ))
                }
            </div>
        </Spin>
    )
}

MyPrograms.propTypes = {
    pageInfo: PropTypes.object,
    getMyPrograms: PropTypes.func,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    filter: state.studentReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    getMyPrograms: (studentId, payload) => dispatch(handleGetMyPrograms(studentId, payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyPrograms)
