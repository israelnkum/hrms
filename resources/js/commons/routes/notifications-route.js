import React from "react";
import { Route } from "react-router-dom";
import Notifications from "../../pages/notifications";
import Leave from "../../pages/notifications/leave";
import LeaveRequestDetail from "../../pages/notifications/leave/leave-request-detail";
import RequestDetailWrapper from "../../pages/notifications/notifications-wrapper";

export default [
    <Route key={ 'notifications' } path={ 'notifications' } element={ <RequestDetailWrapper/> }>
        <Route index element={ <Notifications/> }/>
        <Route exact path={ 'leave-request' } element={ <Leave/> }/>
        <Route exact path={ 'leave-request/:id/details' } element={ <LeaveRequestDetail/> }/>
    </Route>
]