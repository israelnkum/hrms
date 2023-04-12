import { Card, Col, List, Row, Spin } from "antd";
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { handleGetNextOfKin } from "../../../../actions/employee/next-of-kin/Action";
import TlaEdit from "../../../../commons/tla-edit";

const Item = ({title, value}) => (
    <List.Item>
        <List.Item.Meta
            title={ `${ title }:` }
            description={ value }
        />
    </List.Item>
)
Item.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
}

function NextOfKin(props) {
    const {getNextOfKin, employeeId, nextOfKin} = props
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getNextOfKin(employeeId).then(() => {
            setLoading(false)
        })
    }, [])
    return (
        <Spin spinning={ loading } tip={ 'Please wait' }>
            <Card size={'small'} title={'NEXT OF KIN'} bordered={false} extra={[
                <TlaEdit key={'edi'} data={ nextOfKin } icon link={ 'next-of-kin/form' } text={ 'Edit' }/>
            ]}>
                <Row gutter={ 10 } justify={ 'space-between' }>
                    <Col span={ 11 }>
                        <List size="small" itemLayout="horizontal">
                            <Item title={ 'Name' } value={ nextOfKin?.name }/>
                            <Item title={ 'Phone Number' } value={ nextOfKin?.phone_number }/>
                            <Item title={ 'Alt Phone Number' } value={ nextOfKin?.alt_phone_number }/>
                            <Item title={ 'Email' } value={ nextOfKin?.email }/>
                            <Item title={ 'Address' } value={ nextOfKin?.address }/>
                        </List>
                    </Col>
                </Row>
            </Card>

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
