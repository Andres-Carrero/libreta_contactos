

import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ListRoutes } from "./ListRoutes";
import  {Navbar} from "../components/navbar/Navbar";

function AppRoutes() {
  const stateLogin = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(true)
  }, [dispatch, stateLogin, !open]);

  return (
    <div>
      <Navbar />
      <Routes>
        {stateLogin['renderComponentLogin'] && (          
          ListRoutes.map((r, i) => (
              <React.Fragment key={i}>
                <Route path={r['path']} exact element={r['element']}/>
              </React.Fragment>
          ))
        )}    
      </Routes>
    </div>
  )
}

export default AppRoutes;
