import { Card, Spin } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react'
import { FiUsers } from "react-icons/fi";
import { connect } from "react-redux";
import { handleGetMyTeam } from "../../../actions/commons/CommonAction";
import TeamMember from "./team-member";

function MyTeam({getTeamMembers, teamMembers}) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getTeamMembers().then(() => setLoading(false))
    }, [])

    return (
        <Card
            title={
                <div className={ 'flex items-center gap-x-2' }>
                    <FiUsers className={ 'text-2xl' }/>
                    <p>My Team</p>
                </div>
            }
            className={ 'rounded-lg border-none shadow-sm' }>
            <Spin spinning={ loading }>
                <div className={'flex flex-wrap gap-3'}>
                    {
                        teamMembers.map((member) => (
                            <TeamMember member={ member } key={ member.id }/>
                        ))
                    }
                </div>
            </Spin>
        </Card>
    )
}

MyTeam.propTypes = {
    getTeamMembers: PropTypes.func.isRequired,
    teamMembers: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    teamMembers: state.commonReducer.teamMembers
})

const mapDispatchToProps = (dispatch) => ({
    getTeamMembers: () => dispatch(handleGetMyTeam())
})

export default connect(mapStateToProps, mapDispatchToProps)(MyTeam)
