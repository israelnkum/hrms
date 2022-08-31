import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { connect } from 'react-redux'
import ProfileBg from '../../assets/img/dashboard/profile-bg.svg'
import Avatar from '../../assets/img/profile/avata.svg'
import { Image } from 'antd'
import PropTypes from 'prop-types'

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
    margin-top: 20px;
  }
  .profile-job-title {
    margin-top: -28px;
  }
  .dash-item{
    margin-bottom: 12px;
    text-align: left;
    margin-left: 20px;
    display: flex;
    align-items: center;
    align-content: center;
    height: 50px;
  }
  .supporting-text {
    padding-top: 8px;
    margin-bottom: -8px;
  }

  .joined-info {
    font-family: var(--Popins);
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: var(--Gray-500);
  }
`
const ProfileContainer = styled.div`
  background: url(${ProfileBg}) center center no-repeat;
  border-radius: 0 10px 0 0;
  height: 100px;
`
const AvatarContainer = styled.div`
  margin-top: -32px;
  justify-content: center;
  display: block;
  text-align: center;
  align-items: center;
  align-content: center;
  margin-bottom: 35px;
`
function Profile ({name}) {
    return (
        <>
            <GlobalStyles/>
            <ProfileContainer/>
            <AvatarContainer>
                <Image src={Avatar} preview={false} className={'profile-image'}/>
                <h3 className={'text-md-medium profile-name'}>{name}</h3> <br/>
                <h4 className={'text-sm-normal profile-job-title'}>Product Designer</h4>
            </AvatarContainer>
        </>
    )
}
Profile.propTypes = {
    name: PropTypes.string
}

const mapStateToProps = () => {
    return {

    }
}

export default connect(mapStateToProps)(Profile)
