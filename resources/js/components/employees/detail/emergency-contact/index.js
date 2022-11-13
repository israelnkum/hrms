import React, {useEffect, useState} from 'react'
import {Button, Space, Table, Typography} from 'antd'
import {connect} from "react-redux";
import TlaTableWrapper from "../../../../commons/table/tla-table-wrapper";
import TlaAddNew from "../../../../commons/tla-add-new";
import TlaEdit from "../../../../commons/tla-edit";
import TlaConfirm from "../../../../commons/TlaConfirm";

import PropTypes from "prop-types";
import {TlaSuccess} from "../../../../utils/messages";
import {
    handleDeleteEmergencyContact,
    handleGetAllEmergencyContacts
} from "../../../../actions/employee/emergency-contacts/EmergencyContactAction";

const { Column } = Table

function EmergencyContacts (props) {
    const { getEmergencyContacts, deleteEmergencyContacts, emergencyContacts } = props
    const { data, meta }= emergencyContacts
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getEmergencyContacts().then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <>
            {/*<FilterQualification/>*/}
            <TlaTableWrapper meta={meta} extra={
                <TlaAddNew link={'form'}>
                    <Button>Add Contact</Button>
                </TlaAddNew>
            } callbackFunction={getEmergencyContacts} data={data}>
                <Column title="name" dataIndex={'name'}/>
                <Column title="relationship" dataIndex={'relationship'}/>
                <Column title="email" dataIndex={'email'}/>
                <Column  title="Contact" render={({phone_number, alt_phone_Number}) => (
                    <Space size={0} direction={'vertical'}>
                        <Typography.Text>{phone_number}</Typography.Text>
                        <Typography.Text>{alt_phone_Number}</Typography.Text>
                    </Space>
                )}/>
                <Column  title="Action" render={(value) => (
                    <Space size={0}>
                        <TlaEdit icon data={value} link={'form'} type={'text'}/>
                        <TlaConfirm title={'Dependant'} callBack={()=>{
                            deleteEmergencyContacts(value.id).then(() => TlaSuccess('Record Deleted'))
                        }}/>
                    </Space>
                )}/>
            </TlaTableWrapper>
        </>
    )
}

EmergencyContacts.propTypes = {
    getEmergencyContacts: PropTypes.func.isRequired,
    deleteEmergencyContacts: PropTypes.func.isRequired,
    emergencyContacts: PropTypes.object,
}
const mapStateToProps = (state) => ({
    emergencyContacts: state.emergencyContactReducer.emergencyContacts
})

const mapDispatchToProps = (dispatch) => ({
    getEmergencyContacts: (params) => dispatch(handleGetAllEmergencyContacts(params)),
    deleteEmergencyContacts: (id) => dispatch(handleDeleteEmergencyContact(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EmergencyContacts)
