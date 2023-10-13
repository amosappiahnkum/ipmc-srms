import React from 'react';
import {Modal} from 'antd';
import PropTypes from "prop-types";

const ConfirmInfo = ({open, setOpen, onClose}) => {
    return (
        <Modal
            title="Cofirm"
            open={open}
            onOk={setOpen}
            onCancel={onClose}
            okText="Yes Sumbit"
            cancelText="No Cancel">
            <p>Do you confirm all the information provided are correct?</p>
        </Modal>
    );
};

ConfirmInfo.defaultProps = {
    open: false
}

ConfirmInfo.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    onClose: PropTypes.func
}
export default ConfirmInfo
