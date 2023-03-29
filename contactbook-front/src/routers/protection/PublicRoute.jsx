import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const PublicRoute = ({ children }) => {
  const lastPath = localStorage.getItem("lastPath") || '/';
  const { checking } = useSelector((state) => state.auth);
  return checking ? <Navigate to={lastPath} /> : children;
};
