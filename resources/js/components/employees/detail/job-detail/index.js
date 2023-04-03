import { Button, Col, List, Row, Spin, Tabs } from "antd";
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { handleGetSingleJobDetail } from "../../../../actions/employee/job-details/JobDetailsAction";
import TlaAddNew from "../../../../commons/tla-add-new";
import TlaEdit from "../../../../commons/tla-edit";
import { formatDate } from "../../../../utils";
import PreviousPositions from "../previous-positions";
import PreviousRanks from "../previous-ranks";

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

function Job(props) {
    const {getJobDetails, employeeId, jobDetail} = props
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getJobDetails(employeeId).then(() => {
            setLoading(false)
        })
    }, [])
    return (
        <Spin spinning={ loading } tip={ 'Please wait' }>
            <Row gutter={ 10 } justify={ 'space-between' }>
                <Col span={ 24 }>
                    <div className={ 'flex justify-end' }>
                        <TlaEdit data={ jobDetail } icon link={ 'form' } text={ 'Edit' }/>
                    </div>
                </Col>
                <Col span={ 11 }>
                    <List size="small" itemLayout="horizontal">
                        <Item title={ 'Position' } value={ jobDetail?.job_title }/>
                        <Item title={ 'Employment Status' } value={ jobDetail?.status }/>
                        <Item title={ 'Joined Date' } value={ formatDate(jobDetail?.joined_date) }/>
                        <Item title={ 'Sub Unit' } value={ jobDetail?.sub_unit }/>
                        <Item title={ 'Location' } value={ jobDetail?.location }/>
                    </List>
                </Col>
                <Col span={ 11 }>
                    <List size="small" itemLayout="horizontal">
                        <Item title={ 'Job Category' } value={ jobDetail?.job_category }/>
                        <Item title={ 'Contract Start Date' } value={ formatDate(jobDetail?.contract_end_date) }/>
                        <Item title={ 'Contract End Date' } value={ formatDate(jobDetail?.contract_start_date) }/>
                        <Item title={ 'Contract Details' } value={
                            jobDetail?.contract_detail &&
                            <TlaAddNew link={ `/preview/${ jobDetail?.contract_detail }` }>
                                <Button>
                                    Preview
                                </Button>
                            </TlaAddNew>
                        }/>
                    </List>
                </Col>

                <Col span={ 24 }>
                    <Tabs defaultActiveKey="1" items={ [
                        {
                            key: 'ranks',
                            label: 'Previous Ranks',
                            children: <PreviousRanks/>
                        },
                        {
                            key: 'positions',
                            label: 'Previous Positions',
                            children: <PreviousPositions/>
                        }
                    ] }/>
                </Col>

            </Row>
        </Spin>
    )
}

Job.propTypes = {
    getJobDetails: PropTypes.func.isRequired,
    employeeId: PropTypes.number.isRequired,
    jobDetail: PropTypes.object,
}

const mapStateToProps = (state) => ({
    jobDetail: state.jobDetailsReducer.jobDetail,
    employeeId: state.employeeReducer.employee.id,
})

const mapDispatchToProps = (dispatch) => ({
    getJobDetails: (id) => dispatch(handleGetSingleJobDetail(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Job)
