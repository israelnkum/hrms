import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {handleGetSingleContactDetail} from "../../../../actions/employee/contact-details/ContactDetailsAction";
import DetailWrapper from "../detail-wrapper";
import {Spin} from "antd";

function ContactDetails(props) {
    const {getContactDetails, employeeId, contactDetail} = props
    const {info_update} = contactDetail
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getContactDetails(employeeId).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <Spin spinning={loading}>
            <DetailWrapper
                oldData={contactDetail} newData={info_update}
                fields={[
                    'address',
                    'city',
                    'region',
                    'country',
                    'nationality',
                    'zip_code',
                    'telephone',
                    'work_telephone',
                    'work_email',
                    'other_email',
                ]}/>
        </Spin>
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
