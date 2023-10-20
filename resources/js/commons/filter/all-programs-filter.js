import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect, useSelector} from "react-redux";
import TlaSelect from "../../commons/tla/TlaSelect";
import {handleGetProgramsForSearch} from "../../actions/programs/ProgramAction";

function AllProgramsFilter({getPrograms, callBack, required, hasAll, findProgram}) {
    const [loading, setLoading] = useState(false)
    const programs = useSelector(state => state.programReducer.allPrograms)
    return (
        <TlaSelect
            loading={loading}
            hasAll={hasAll}
            name={'program_id'}
            optionKey={'name'}
            options={programs}
            label={'program'}
            required={required}
            onFocus={() => {
                if (programs.length === 0) {
                    setLoading(true)
                    getPrograms().then(() => setLoading(false))
                }
            }}
            onChange={(value) => {
                findProgram ? callBack(programs.find(pro => pro.id === value)) : callBack(value)
            }}
        />
    )
}

AllProgramsFilter.defaultProps = {
    callBack: () => {
    },
    required: false,
    hasAll: true,
    findProgram: false
}
AllProgramsFilter.propTypes = {
    getPrograms: PropTypes.func,
    callBack: PropTypes.func,
    required: PropTypes.bool,
    findProgram: PropTypes.bool,
    hasAll: PropTypes.bool
}

const mapDispatchToProps = (dispatch) => ({
    getPrograms: () => dispatch(handleGetProgramsForSearch()),
})

export default connect(null, mapDispatchToProps)(AllProgramsFilter)
