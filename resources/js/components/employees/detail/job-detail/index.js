import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Button, Col, List, Row} from "antd";
import TlaEdit from "../../../../commons/tla-edit";
import {handleGetSingleJobDetail} from "../../../../actions/employee/job-details/JobDetailsAction";
import TlaAddNew from "../../../../commons/tla-add-new";

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
function Job (props) {
    const { getJobDetails, employeeId, jobDetail } = props
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getJobDetails(employeeId).then(() => {
            setLoading(false)
        })
    }, [])
    return (
        <Row gutter={10} justify={'space-between'}>
            <Col span={24}>
                <div align={'right'}>
                    <TlaEdit data={jobDetail} icon link={'form'} text={'Edit'} />
                </div>
            </Col>
            <Col span={11}>
                <List size="small" itemLayout="horizontal">
                    <Item title={'Job Title'} value={jobDetail?.job_title}/>
                    <Item title={'Employment Status'} value={jobDetail?.status}/>
                    <Item title={'Joined Date'} value={jobDetail?.joined_date}/>
                    <Item title={'Sub Unit'} value={jobDetail?.sub_unit}/>
                    <Item title={'Location'} value={jobDetail?.location}/>
                </List>
            </Col>
            <Col span={11}>
                <List size="small" itemLayout="horizontal">
                    <Item title={'Job Category'} value={jobDetail?.job_category}/>
                    <Item title={'Contract Start Date'} value={jobDetail?.contract_end_date}/>
                    <Item title={'Contract End Date'} value={jobDetail?.contract_start_date}/>
                    <Item title={'Contract Details'} value={
                        jobDetail?.contract_detail &&
                        <TlaAddNew link={`/preview/${jobDetail?.contract_detail}`}>
                            <Button>
                                Preview
                            </Button>
                        </TlaAddNew>
                    }/>
                </List>
            </Col>
            <Col span={24}>
            </Col>
        </Row>
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
