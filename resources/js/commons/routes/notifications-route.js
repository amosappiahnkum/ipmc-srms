import React from "react";
import {Route} from "react-router-dom";
import Notifications from "../../pages/notifications";
import InfoUpdate from "../../pages/notifications/info-update";
import InfoUpdateDetail from "../../pages/notifications/info-update/info-update-detail";
import Leave from "../../pages/notifications/leave";
import LeaveRequestDetail from "../../pages/notifications/leave/leave-request-detail";
import RequestDetailWrapper from "../../pages/notifications/notifications-wrapper";

export default [
    <Route key={'notifications'} path={'notifications'} element={<RequestDetailWrapper/>}>
        <Route index element={<Notifications/>}/>
        {
            ['leave-request', 'info-update'].map((parentItem, index) => (
                <Route exact path={parentItem} key={index}>
                    {
                        ['pending', 'approved', 'rejected'].map((item, index) => (
                            <Route exact
                                   path={item} key={index}
                                   element={parentItem === 'leave-request' ? <Leave/> : <InfoUpdate/>}/>
                        ))
                    }
                </Route>
            ))
        }
        <Route exact path={'leave-request/:id/details'} element={<LeaveRequestDetail/>}/>
        <Route exact path={'info-update/:id/details'} element={<InfoUpdateDetail/>}/>
    </Route>
]
