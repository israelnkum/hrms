import { Button, Space, Spin, Table, Typography } from 'antd'
import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import {
    handleDeleteCommunityService,
    handleGetAllCommunityServices
} from "../../../../actions/employee/community-services/CommunityServicesAction";
import TlaTableWrapper from "../../../../commons/table/tla-table-wrapper";
import TlaAddNew from "../../../../commons/tla-add-new";
import TlaEdit from "../../../../commons/tla-edit";
import TlaConfirm from "../../../../commons/TlaConfirm";
import { TlaSuccess } from "../../../../utils/messages";

const {Paragraph} = Typography;
const {Column} = Table

function CommunityService(props) {
    const {getCommunityServices, deleteCommunityService, communityServices, employeeId} = props

    const {data, meta} = communityServices

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCommunityServices(`employeeId=${ employeeId }`).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <Spin spinning={ loading }>
            {/*<FilterQualification/>*/ }
            <TlaTableWrapper meta={ meta } extra={
                <TlaAddNew link={ 'form' }>
                    <Button>Add Service</Button>
                </TlaAddNew>
            } callbackFunction={ getCommunityServices } data={ data }>
                <Column title="Start Date" dataIndex={ 'start_date' }/>
                <Column title="End Date" dataIndex={ 'end_date' }/>

                <Column title="Description" render={ (value) => (
                   <Paragraph ellipsis className={'w-[200px]'}>{ value.description }</Paragraph>
                ) }/>
                <Column title="Action" render={ (value) => (
                    <Space size={ 0 }>
                        <TlaEdit icon data={ value } link={ 'form' } type={ 'text' }/>
                        <TlaConfirm title={ 'CommunityService' } callBack={ () => {
                            deleteCommunityService(value.id).then(() => TlaSuccess('Record Deleted'))
                        } }/>
                    </Space>
                ) }/>
            </TlaTableWrapper>
        </Spin>
    )
}

CommunityService.propTypes = {
    getCommunityServices: PropTypes.func.isRequired,
    deleteCommunityService: PropTypes.func.isRequired,
    employeeId: PropTypes.number.isRequired,
    communityServices: PropTypes.object,
}
const mapStateToProps = (state) => ({
    communityServices: state.communityServiceReducer.communityServices,
    employeeId: state.employeeReducer.employee.id
})

const mapDispatchToProps = (dispatch) => ({
    getCommunityServices: (params) => dispatch(handleGetAllCommunityServices(params)),
    deleteCommunityService: (id) => dispatch(handleDeleteCommunityService(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CommunityService)
