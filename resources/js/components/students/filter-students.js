import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect, useSelector} from "react-redux";
import {Col, Row} from "antd";
import FilterWrapper from "../../commons/filter/filter-wrapper";
import {handleExportStudents, handleGetAllStudents} from "../../actions/students/StudentAction";
import TlaSelect from "../../commons/tla/TlaSelect";
import {handleGetAllPrograms} from "../../actions/programs/ProgramAction";

function FilterStudents(props) {
    const [loading, setLoading] = useState(false)
    const {submitFilter, filter, exportFilter, getPrograms} = props
    const programs = useSelector(state => state.programReducer.programs.data)
    const initials = {
        ...filter,
        export: false
    }

    return (
        <FilterWrapper print excel initialValue={initials} submitFilter={submitFilter} exportFilter={exportFilter}>
            {/*<div>
               <Form.Item name="date" label="Date">
                   <DatePicker.RangePicker />
               </Form.Item>
           </div>*/}
            <Row gutter={10}>
                <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6}>
                    <TlaSelect
                        loading={loading}
                        hasAll
                        name={'program_id'}
                        optionKey={'name'}
                        options={programs}
                        label={'program'}
                        onFocus={() => {
                            if (programs.length === 0) {
                                setLoading(true)
                                getPrograms().then(() => setLoading(false))
                            }

                        }}
                    />
                </Col>
            </Row>
        </FilterWrapper>
    )
}

FilterStudents.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    getPrograms: PropTypes.func,
    filter: PropTypes.object
}

const mapStateToProps = (state) => ({
    filter: state.studentReducer.filter
})

const mapDispatchToProps = (dispatch) => ({
    submitFilter: (params) => dispatch(handleGetAllStudents(params)),
    exportFilter: (params) => dispatch(handleExportStudents(params)),
    getPrograms: (params) => dispatch(handleGetAllPrograms(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterStudents)
