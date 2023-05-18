import {Space} from "antd";
import PropTypes from "prop-types";
import React from 'react';
import TlaImage from "../../commons/tla-image";

function UserInfo({name, department}) {

    return (
        <Space>
            <TlaImage size={ 65 } src={ 'a' } name={ name }/>
            <div>
                <h3 className={ 'text-lg' }>
                    { name }
                </h3>
                <h5>{ department }</h5>
            </div>
        </Space>
    )
}

UserInfo.propTypes = {
    department: PropTypes.string,
    name: PropTypes.string
}

export default UserInfo
