import React from 'react'
import {Card, Image, List} from 'antd'
import {FiPhoneCall, FiUser, FiUsers} from "react-icons/fi";
import {BsBriefcase} from "react-icons/bs";
import {TbCertificate, TbReportAnalytics} from "react-icons/tb";
import {Link, useLocation, useMatch} from "react-router-dom";
import styled, {createGlobalStyle} from "styled-components";
import Avatar from "../../../assets/img/profile/avata.svg";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import TlaImage from "../../../commons/tla-image";

const GlobalStyles = createGlobalStyle`
      .active-nav {
        background: var(--Primary-50);
        border-radius: 8px
      }

       .emp-profile-image {
            width: 100px;
            height: 100px;
            border: 4px solid #FFFFFF;
            box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
            border-radius: 200px;
          }
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
function Navs ({ employee }) {

    // const url = data.title.toLowerCase().replace(' ','-')
    const location = useLocation()

    const modules = [
        {
            title: 'Personal Details',
            icon: <FiUser/>,
        },
        {
            title: 'Contact Details',
            icon: <FiPhoneCall/>,
        },
        {
            title: 'Emergency Contacts',
            icon: <FiPhoneCall/>,
        },
        {
            title: 'Dependents',
            icon: <FiUsers/>,
        },
        {
            title: 'Job',
            icon: <BsBriefcase/>,
        },
        // {
        //     title: 'Salary',
        //     icon: <BiCoinStack/>,
        // },
        {
            title: 'Reports-to',
            icon: <TbReportAnalytics/>,
        },
        {
            title: 'Qualifications',
            icon: <TbCertificate/>,
        }
    ]
    function formatUrl (text) {
        return text.toLowerCase().replace(' ','-')
    }
    return (
        <Card>
            <GlobalStyles/>

            <AvatarContainer>
                <TlaImage size={70} src={employee.photo} name={employee.name}/>
                <h3 className={'text-md-medium profile-name'}>{employee.name}</h3> <br/>
                <h4 className={'text-sm-normal profile-job-title'}>{employee.rank}</h4>
            </AvatarContainer>
            <List
                size="small"
                itemLayout="horizontal"
                dataSource={modules}
                renderItem={(item) => {
                    const to = formatUrl(item.title)
                    const match = location.pathname === useMatch(`/pim/employees/:id/:name/${to}`)
                    return <List.Item className={match ? 'active-nav' : ''}>
                        <List.Item.Meta
                            avatar={item.icon}
                            title={<Link to={to}>{item.title}</Link>}
                        />
                    </List.Item>
                }}
            />
        </Card>
    )
}

Navs.propTypes = {
    employee: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    employee: state.employeeReducer.employee,
})

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Navs);
