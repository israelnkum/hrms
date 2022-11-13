import React, {useEffect, useState} from 'react'
import {Col, List, Row} from 'antd'
import {connect} from "react-redux";
import TlaEdit from "../../../../commons/tla-edit";
import PropTypes from "prop-types";
import {handleGetSingleContactDetail} from "../../../../actions/employee/contact-details/ContactDetailsAction";

const Item = ({ title, value }) => (
    <List.Item>
        <List.Item.Meta
            title={`${title}:`}
            description={value}
        />
    </List.Item>
)
Item.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
}

function ContactDetails (props) {
    const { getContactDetails, employeeId, contactDetail } = props
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getContactDetails(employeeId).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <Row gutter={10} justify={'space-between'}>
            <Col span={24}>
                <div align={'right'}>
                    <TlaEdit data={contactDetail} icon link={'form'} text={'Edit'} />
                </div>
            </Col>
            <Col span={11}>
                <List size="small" itemLayout="horizontal">
                    <Item title={'Address'} value={contactDetail?.address}/>
                    <Item title={'City'} value={contactDetail?.city}/>
                    <Item title={'Region'} value={contactDetail?.region}/>
                    <Item title={'Country'} value={contactDetail?.country}/>
                    <Item title={'Nationality'} value={contactDetail?.nationality}/>
                </List>
            </Col>
            <Col span={11}>
                <List size="small" itemLayout="horizontal">
                    <Item title={'Zip/Postal Code'} value={contactDetail?.zip_code}/>
                    <Item title={'Telephone'} value={contactDetail?.telephone}/>
                    <Item title={'Work Telephone'} value={contactDetail?.work_telephone}/>
                    <Item title={'Work Email'} value={contactDetail?.work_email}/>
                    <Item title={'Other Email'} value={contactDetail?.other_email}/>
                </List>
            </Col>
        </Row>
    )
}

ContactDetails.propTypes = {
    getContactDetails: PropTypes.func.isRequired,
    employeeId: PropTypes.number.isRequired,
    contactDetail: PropTypes.object,
}

const mapStateToProps = (state) => ({
    contactDetail: state.contactDetailsReducer.contactDetail,
    employeeId: state.employeeReducer.employee.id,
})

const mapDispatchToProps = (dispatch) => ({
    getContactDetails: (id) => dispatch(handleGetSingleContactDetail(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetails)
