import PropTypes from "prop-types";
import React from 'react'
import TlaImage from "../../../commons/tla-image";

function TeamMember({member}) {

    return (
        <div className={ 'flex flex-col items-center min-w-[200px]' }>
            <TlaImage src={ '' } size={ 80 } name={ member.employee.name }/>
            <p className={'text-center'}>{ member.employee.name }</p>
        </div>
    )
}

TeamMember.propTypes = {
    member: PropTypes.object.isRequired
}


export default TeamMember
