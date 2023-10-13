import { Button, Col, Row, Space } from 'antd'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { connect } from 'react-redux'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import TlaAddNew from '../../commons/tla-add-new'
import PageCrumbs from "./page-crumbs";

function PageWrapper () {
    const [pageInfo, setPageInfo] = useState({});
    const [extra, setExtra] = useState(<></>);

    const PageTitle = (
        <Row className={'mb-2'} align={'middle'} justify={'space-between'}>
            <Col span={12}>
                <Space>
                    {/*<Button icon={<FiArrowLeft/>}>Go Back</Button>*/}
                    <h3 className="text-title" style={{ fontSize: 18, paddingTop: 5 }}>{pageInfo.title}</h3>
                </Space>
            </Col>
            <Col span={12} className={'flex justify-end'}>
                {
                    pageInfo.addLink &&
                    <div className={'w-fit'}>
                        {
                            !pageInfo.modalLink ?
                                <TlaAddNew link={pageInfo.addLink} data={pageInfo?.extraInfo}>
                                    <Button size={'large'} className={'btn tla-btn-primary'} icon={<FiPlus/>}>&nbsp;Add {pageInfo.buttonText ?? pageInfo.title}</Button>
                                </TlaAddNew> :
                                <Link to={pageInfo.addLink}>
                                    <Button size={'large'} className={'btn tla-btn-primary'} icon={<FiPlus/>}>&nbsp;Add {pageInfo.buttonText ?? pageInfo.title}</Button>
                                </Link>
                        }

                    </div>
                }
            </Col>
        </Row>
    )
    return (
        <div>
            <div>
                <PageCrumbs/>
                <div className={'m-2'}>
                    {/*{PageTitle}*/}
                    <div align={'middle'} className={'flex justify-between'}>
                        <div>
                            {extra}
                        </div>
                        <div>
                            {/*<TlaSearch/>*/}
                        </div>
                    </div>
                    <Outlet context={{setPageInfo, setExtra }}/>
                </div>
            </div>
        </div>
    )
}


PageWrapper.defaultProps = {
    pageInfo: {
        addLink: null
    }
}

PageWrapper.propTypes = {
    pageInfo: PropTypes.object
}

export default connect()(PageWrapper)
