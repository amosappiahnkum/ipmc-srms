import PropTypes from "prop-types";

const Validate = ({ show, children }) => {
    return (
        show && children
    )
};

Validate.defaultProps = {
    show: false
}

Validate.propTypes = {
    show: PropTypes.bool,
    children: PropTypes.any
}

export default Validate;
