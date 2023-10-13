import { Space, Table } from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { BiEnvelope, BiPhone } from "react-icons/bi";
import { connect } from "react-redux";
import { useOutletContext } from 'react-router'
import { Link } from "react-router-dom";
import { handleGetPeople } from "../../actions/people/PeopleAction";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import TlaImage from "../../commons/tla-image";
import ViewAllWrapper from "../../commons/view-all-wrapper";

const { Column } = Table
function People (props) {
    const { getPeople, people, filter } = props
    const { data, meta }= people
    const [loading, setLoading] = useState(true)
    const { setPageInfo } = useOutletContext();
    useEffect(() => {
        setPageInfo({ title: 'People' })

        getPeople(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <TlaTableWrapper numberColumn={false} filterObj={filter}  callbackFunction={getPeople} data={data} meta={meta}>
            <Column render={(_, {title, name, rank}) => (
                <Space>
                    <TlaImage size={50} src={'Avatar'} name={name}/>
                    <Space direction={'vertical'} size={1}>
                        <p className={'text-primary-800 text-lg md:text-2xl font-bold'}>{title}&nbsp;{name}</p>
                        {rank}
                    </Space>
                </Space>
            )}/>
            <Column render={(_, {work_email, work_telephone}) => (
                <Space direction={'vertical'}>
                    <Space size={1}>
                        <BiEnvelope/>
                        <p>{work_email}</p>
                    </Space>
                    <Space size={1}>
                        <BiPhone/>
                        <p>{work_telephone}</p>
                    </Space>
                </Space>
            )}/>
        </TlaTableWrapper>
    )
}

People.propTypes = {
    pageInfo: PropTypes.object,
    getPeople: PropTypes.func,
    people: PropTypes.object,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    people: state.peopleReducer.people,
    filter: state.peopleReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    getPeople: (payload) => dispatch(handleGetPeople(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(People)
