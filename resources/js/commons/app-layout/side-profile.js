import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import styled, { createGlobalStyle } from 'styled-components'
import TlaImage from "../tla-image";
import {Tag} from "antd";

const GlobalStyles = createGlobalStyle`

  .profile-image {
    width: 70px;
    height: 70px;
    border: 4px solid #FFFFFF;
    box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
    border-radius: 200px;
  }

  .profile-name {
    color: var(--Gray-900);
    margin-top: 10px;
  }
`

const AvatarContainer = styled.div`
  margin-top: 20px;
  justify-content: center;
  display: block;
  text-align: center;
  align-items: center;
  align-content: center;
`

function Profile({user, size, collapsed}) {
    return (
        <>
            <GlobalStyles/>
            <AvatarContainer>
                {
                    !collapsed &&
                    <React.Fragment>
                        {/*<h3 className={ 'text-md-medium profile-name' }>{ user.name ?? user.username }</h3>*/}
                        <h6 className={'text-sm-normal'}>{user.branch ?? ''}</h6>
                        <Tag color={'blue'} className={'text-sm-normal'}>{user.type ?? ''}</Tag>
                    </React.Fragment>
                }

            </AvatarContainer>
        </>
    )
}

Profile.defaultProps = {
    collapsed: false
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    size: PropTypes.number,
    collapsed: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    user: state.userReducer.loggedInUser,
})

export default connect(mapStateToProps, null)(Profile)
