import React from 'react'
import {useLocation} from 'react-router'
import {Route, Routes} from 'react-router-dom'
import Enquiry from "../../enquiry";
import Submitted from "../../enquiry/submitted";

const PublicRoutes = () => {
    const location = useLocation()
    const background = location.state && location.state.background

    return (
        <React.Fragment>
            <Routes location={background || location}>
                <Route exact path='/enquiry'>
                    <Route exact element={<Enquiry/>} index/>
                    <Route exact element={<Submitted/>} path='submitted'/>
                </Route>

                <Route exact>
                    <>not found</>
                </Route>
            </Routes>
        </React.Fragment>
    )
}

export default PublicRoutes
