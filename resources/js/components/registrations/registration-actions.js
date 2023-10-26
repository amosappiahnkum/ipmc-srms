import {Tag, Popconfirm, Radio} from 'antd'
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import {handleUpdateRegistration} from "../../actions/registrations/RegistrationAction";
import {connect} from "react-redux";

function RegistrationActions({id, status, updateRegistration}) {

    const [loading, setLoading] = useState(false)

    const [value, setValue] = useState(status);
    const onChange = (e) => {
        setValue(e.target.value);
    };

    const colors = {
        discontinued: 'purple',
        completed: 'green',
        deferred: 'red',
        'in-school': 'geekblue'
    }

    return (
        <Popconfirm
            okButtonProps={{
                disabled: value === status
            }}
            title="Change Status" icon={<></>}
            description={<>
                <Radio.Group style={{display: 'flex', flexDirection: 'column'}} onChange={onChange} value={value}>
                    <Radio value={'completed'}>Completed</Radio>
                    <Radio value={'deferred'}>Deferred</Radio>
                    <Radio value={'discontinued'}>Discontinued</Radio>
                    <Radio value={'in-school'}>In-School</Radio>
                </Radio.Group>
            </>}
            onConfirm={() => {
                setLoading(true)
                updateRegistration({id, status: value}).then(() => setLoading(false))
            }}
            okText="Save"
            cancelText="Cancel">
            <Tag className={'cursor-pointer capitalize'} color={colors[status]} loading={loading} size={"small"}>{status}</Tag>
        </Popconfirm>
    )
}

RegistrationActions.propTypes = {
    status: PropTypes.string.isRequired,
    id: PropTypes.any.isRequired,
    updateRegistration: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    updateRegistration: (data) => dispatch(handleUpdateRegistration(data))
})

export default connect(null, mapDispatchToProps)(RegistrationActions)
