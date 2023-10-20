import PropTypes from 'prop-types'
import React from 'react'
import TlaAddNew from "../../commons/tla-add-new";
import TblDropdown from "../../commons/tbl-dropdown";


function BatchActions({ record }) {

    return (
        <TblDropdown loading={false}>
            <TlaAddNew data={record} link={'form'}>
                <p className={'rounded-lg px-3 py-1 hover:bg-gray-100 hover:text-black !w-full rounded-sm'}>Edit</p>
            </TlaAddNew>
            <TlaAddNew data={{ batch_id: record.id }} link={'/batches/generate-attendance'}>
                <p className={'rounded-lg px-3 py-1 hover:bg-gray-100 hover:text-black !w-full rounded-sm'}>
                    Print&nbsp;Attendance
                </p>
            </TlaAddNew>
            <TlaAddNew data={{ batch_id: record.id, sems: record.sems }} link={'/batches/print-batch-plan'}>
                <p className={'rounded-lg px-3 py-1 hover:bg-gray-100 hover:text-black !w-full rounded-sm'}>
                    Print&nbsp;Batch Plan
                </p>
            </TlaAddNew>
        </TblDropdown>
    )
}

BatchActions.propTypes = {
    record: PropTypes.object
}

export default BatchActions
