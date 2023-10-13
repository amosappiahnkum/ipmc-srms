import { Card, Typography } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import Pagination from 'react-js-pagination'

function TlaPagination(props) {
    const {meta, loadData, children, showHeader, extra} = props

    return (
        <div>
            {
                (showHeader || extra) &&
                <div className={ 'flex justify-between items-center mb-2' }>
                    <Typography.Text>
                        { meta.from } - { meta.to } of { meta.total }
                    </Typography.Text>

                    { extra }
                </div>
            }
            { children }

            <div className={ 'flex justify-end' }>
                <Card size={ 'small' } className={ 'w-fit mt-2 pagination-wrapper' }>
                    <Pagination
                        activePage={ meta.current_page }
                        itemsCountPerPage={ meta.per_page }
                        totalItemsCount={ meta.total || 0 }
                        onChange={ loadData }
                        pageRangeDisplayed={ 8 }
                        itemClass="page-item"
                        linkClass="page-link"
                        firstPageText="First"
                        lastPageText="Last"
                        hideFirstLastPages={ true }
                        nextPageText={ <FiArrowRight/> }
                        prevPageText={ <FiArrowLeft/> }
                    />
                </Card>
            </div>
        </div>

    )
}

TlaPagination.defaultProps = {
    meta: {
        from: 0,
        to: 0,
        total: 0
    },
    showHeader: true
}
TlaPagination.propTypes = {
    meta: PropTypes.object.isRequired,
    children: PropTypes.node,
    loadData: PropTypes.func.isRequired,
    showHeader: PropTypes.bool,
    extra: PropTypes.any,
}

export default TlaPagination
