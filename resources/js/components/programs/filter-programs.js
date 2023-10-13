import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Col, Row} from "antd";
import FilterWrapper from "../../commons/filter/filter-wrapper";
import {handleExportStudents, handleGetAllStudents} from "../../actions/students/StudentAction";
import TlaSelect from "../../commons/tla/TlaSelect";

function FilterPrograms (props) {
    const { submitFilter, filter, exportFilter, departments, ranks, jobCategories } = props
    const initials = {
        ...filter,
        export: false
    }

    return (
       <FilterWrapper initialValue={initials} submitFilter={submitFilter} exportFilter={exportFilter}>
           {/*<div>
               <Form.Item name="date" label="Date">
                   <DatePicker.RangePicker />
               </Form.Item>
           </div>*/}
           <Row gutter={10}>
               <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6}>
                   <TlaSelect hasAll name={'department_id'} optionKey={'name'} options={departments} label={'departments'}/>
               </Col>
               <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6}>
                   <TlaSelect hasAll name={'rank_id'} optionKey={'name'} options={ranks} label={'ranks'}/>
               </Col>
               {/*<Col span={6}>
                   <TlaSelect hasAll name={'educational_level_id'} optionKey={'name'} options={educationalLevels} label={'educational Levels'}/>
               </Col>*/}
               <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6}>
                   <TlaSelect hasAll name={'job_category_id'} optionKey={'name'} options={jobCategories} label={'job Categories'}/>
               </Col>
           </Row>
       </FilterWrapper>
    )
}

FilterPrograms.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    filter: PropTypes.object,
    departments: PropTypes.array,
    ranks: PropTypes.array,
    educationalLevels: PropTypes.array,
    jobCategories: PropTypes.array,
}

const mapStateToProps = (state) => ({
    filter: state.studentReducer.filter,
    departments: state.commonReducer.commons.departments,
    ranks: state.commonReducer.commons.ranks,
    educationalLevels: state.commonReducer.commons.educationalLevels,
    jobCategories: state.commonReducer.commons.jobCategories
})

const mapDispatchToProps = (dispatch) => ({
    submitFilter: (params) => dispatch(handleGetAllStudents(params)),
    exportFilter: (params) => dispatch(handleExportStudents(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterPrograms)
