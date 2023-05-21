import {Spin} from "antd";
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {handleGetNextOfKin} from "../../../../actions/employee/next-of-kin/Action";
import DetailWrapper from "../detail-wrapper";

function NextOfKin(props) {
    const {getNextOfKin, employeeId, nextOfKin} = props
    const {info_update} = nextOfKin
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getNextOfKin(employeeId).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <Spin spinning={loading} tip={'Please wait'}>
            <DetailWrapper
                oldData={nextOfKin}
                newData={info_update}
                fields={['name', 'phone_number', 'alt_phone_number', 'email', 'address']}/>
        </Spin>
    )
}

NextOfKin.propTypes = {
    getNextOfKin: PropTypes.func.isRequired,
    employeeId: PropTypes.number.isRequired,
    nextOfKin: PropTypes.object,
}

const mapStateToProps = (state) => ({
    nextOfKin: state.nextOfKinsReducer.nextOfKin,
    employeeId: state.employeeReducer.employee.id,
})

const mapDispatchToProps = (dispatch) => ({
    getNextOfKin: (id) => dispatch(handleGetNextOfKin(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NextOfKin)
