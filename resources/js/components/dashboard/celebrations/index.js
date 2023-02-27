import { Card, List } from "antd";
import PropTypes from "prop-types";
import React from 'react'
import { MdOutlineCelebration } from "react-icons/md";
import { GiCupcake } from "react-icons/gi";
import { connect } from "react-redux";
import TlaImage from "../../../commons/tla-image";

function Celebrations({celebrations}) {

    return (
        <Card
            title={
                <div className={ 'flex items-center gap-x-2' }>
                    <MdOutlineCelebration className={ 'text-2xl' }/>
                    <p>Celebrations</p>
                </div>
            }
            className={ 'rounded-lg border-none shadow-sm' }>
            <List
                itemLayout="horizontal"
                dataSource={celebrations}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<TlaImage size={40} src={'Avatar'} name={item.name}/>}
                            title={item.name}
                            description={<p className={'text-xs'}>{`${item.dob} - ${item.type}`}</p>}
                        />
                        <div className={'bg-gray-100 rounded-full p-2'}>
                            <GiCupcake className={'text-3xl text-gray-400'}/>
                        </div>
                    </List.Item>
                )}
            />
        </Card>
    )
}

Celebrations.propTypes = {
    celebrations: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    celebrations: state.commonReducer.commons.celebrations
})

export default connect(mapStateToProps)(Celebrations)
