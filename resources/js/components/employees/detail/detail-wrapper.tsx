import {Col, List, Row} from "antd";
import PropTypes from 'prop-types'
import React from 'react'
import UpdateBadge from "./update-bage.tsx";
import TlaEdit from "../../../commons/tla-edit";
import DisplayItem from "./display-item.tsx";
import UpdateNotification from "../update-notification";
import {formatLabel} from "../../../utils";

function DetailWrapper({newData, oldData, fields, editLink = 'form'}) {
    return (
        <UpdateBadge display={newData !== null}>
            <Row gutter={10} justify={'space-between'}>
                <Col span={24} className={'flex justify-end border-b pb-1'}>
                    {/*<TlaEdit data={oldData} icon link={editLink} text={'Edit'}/>*/}
                </Col>
                <Col span={24}>
                    <List size="small"
                          grid={{
                              gutter: 16,
                              xs: 1,
                              sm: 2,
                              md: 2,
                              lg: 2,
                              xl: 2,
                              xxl: 3,
                          }}
                          dataSource={fields}
                          renderItem={(item, index) => (
                              <DisplayItem
                                  title={formatLabel(item)}
                                  key={index}
                                  value={
                                      <UpdateNotification
                                          value={oldData?.[item]}
                                          updateValue={newData?.new_info[item]}/>
                                  }/>
                          )}>
                    </List>
                </Col>
            </Row>
        </UpdateBadge>
    )
}

DetailWrapper.propTypes = {
    fields: PropTypes.array,
    newData: PropTypes.any,
    oldData: PropTypes.object.isRequired,
    editLink: PropTypes.string,
}

export default DetailWrapper
