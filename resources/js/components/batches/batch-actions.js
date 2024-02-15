import PropTypes from 'prop-types'
import React from 'react'
import TlaAddNew from "../../commons/tla-add-new";
import TblDropdown from "../../commons/tbl-dropdown";
import ValidateComponent from "../../commons/validate-component";


function BatchActions({record}) {

    return (
        <TblDropdown loading={false}>
            <ValidateComponent permissions={['edit-batch']}>
                <TlaAddNew data={record} link={'form'}>
                    <p className={'rounded-lg px-3 py-1 hover:bg-gray-100 hover:text-black !w-full'}>Edit</p>
                </TlaAddNew>
            </ValidateComponent>

            <ValidateComponent permissions={['generate-attendance']}>
                <TlaAddNew data={{batch_id: record.id}} link={'/batches/generate-attendance'}>
                    <p className={'rounded-lg px-3 py-1 hover:bg-gray-100 hover:text-black !w-full'}>
                        Attendance
                    </p>
                </TlaAddNew>
            </ValidateComponent>
            <ValidateComponent permissions={['view-batch-plan']}>
                <TlaAddNew data={{batch_id: record.id, sems: record.sems, name: record.name }} link={'/batches/print-batch-plan'}>
                    <p className={'rounded-lg px-3 py-1 hover:bg-gray-100 hover:text-black !w-full'}>
                        Batch Plan
                    </p>
                </TlaAddNew>
            </ValidateComponent>
            <ValidateComponent permissions={['view-batch-plan']}>
                <TlaAddNew data={{batch_id: record.id, modules: record.modules}} link={'/batches/schedule-exam'}>
                    <p className={'rounded-lg px-3 py-1 hover:bg-gray-100 hover:text-black !w-full'}>
                        Schedule Exam
                    </p>
                </TlaAddNew>
            </ValidateComponent>
        </TblDropdown>
    )
}

BatchActions.propTypes = {
    record: PropTypes.object
}

export default BatchActions
