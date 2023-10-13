import { List } from "antd";
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import ViewAllWrapper from "../view-all-wrapper";
import TlaPagination from "./TlaPagination";

function TlaListWrapper({meta, data, callbackFunction, children, filterObj, extra, formLoading}) {
    const [loading, setLoading] = useState(false)

    return (
        <TlaPagination extra={ extra } meta={ meta } loadData={ (pageNumber) => {
            const urlParams = new URLSearchParams(filterObj)
            urlParams.append('page', pageNumber);
            setLoading(true);
            (callbackFunction(urlParams)).then(() => {
                setLoading(false)
            })
        } }>

            <List
                itemLayout="horizontal"
                dataSource={ data }
                renderItem={ (item) => (
                    <ViewAllWrapper loading={ formLoading || loading } noData={ data.length === 0 }>
                        { children }
                    </ViewAllWrapper>
                ) }/>
        </TlaPagination>
    )
}


TlaListWrapper.defaultProps = {
    meta: {
        from: 1,
        to: 10,
        total: 500
    },
    data: [],
    filterObj: null,
    formLoading: false,
}

TlaListWrapper.propTypes = {
    meta: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    callbackFunction: PropTypes.func,
    children: PropTypes.any,
    filterObj: PropTypes.object,
    extra: PropTypes.any,
    formLoading: PropTypes.bool,
}


export default connect()(TlaListWrapper)
