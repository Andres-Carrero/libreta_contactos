

import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ListRoutes } from "./ListRoutes";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { LoginPage } from "../pages/login/LoginPage";
import { PublicRoute } from "./protection/PublicRoute";
import { PrivateRoute } from "./protection/PrivateRoute";
import AppRoutes  from "./AppRoutes";

function Routers() {
  const stateLogin = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(true)
  }, [dispatch, stateLogin, !open]);

  return (
    <BrowserRouter>
      <Routes>
      {
        stateLogin['renderComponentLogin'] && (
          <React.Fragment>
            <Route path="/login" index element={ <PublicRoute> <LoginPage /> </PublicRoute>}/>
            <Route path="/*" element={ <PrivateRoute checking={stateLogin['checking']}> <AppRoutes /> </PrivateRoute> } />
          </React.Fragment>
        )
      }
      </Routes>
    </BrowserRouter>
  )
}

export default Routers;
