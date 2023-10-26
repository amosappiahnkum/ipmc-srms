import PropTypes from 'prop-types'
import React, {useState} from 'react'
import {connect} from "react-redux";
import TlaAddNew from "../commons/tla-add-new";
import {handlePrintEnquiry} from "../actions/enquiry/EnquiryAction";
import TblDropdown from "../commons/tbl-dropdown";


function EnquiryActions({record, printEnquiry}) {
    const [printing, setPrinting] = useState(false)


    return (
        <TblDropdown loading={printing}>
            <TlaAddNew data={{studentId: record?.student_id}} link={'/students/enroll'}>
                <p className={'rounded-lg px-3 py-1 hover:bg-gray-100 hover:text-black !w-full rounded-sm'}>Enroll</p>
            </TlaAddNew>
            <TlaAddNew data={{enquiry_id: record.id}} link={`/enquires/follow-up`}>
                <p className={'rounded-lg px-3 py-1 hover:bg-gray-100 hover:text-black !w-full rounded-sm'}>
                    Follow Up
                </p>
            </TlaAddNew>
            <p className={'rounded-lg px-3 py-1 hover:bg-gray-100 hover:text-black !w-full rounded-sm cursor-pointer'}
               onClick={() => {
                   setPrinting(true)
                   printEnquiry(record.id).then(() => setPrinting(false))
               }}>
                Print
            </p>
        </TblDropdown>
    )
}

EnquiryActions.propTypes = {
    record: PropTypes.object,
    printEnquiry: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
    printEnquiry: (enquiryId) => dispatch(handlePrintEnquiry(enquiryId)),
})

export default connect(null, mapDispatchToProps)(EnquiryActions)
