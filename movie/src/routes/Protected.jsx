import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { ROUTER } from "../constant/router";
import PropTypes from "prop-types";

const Protected = ({ children }) => {
  const { user, isLoading } = useGlobalContext();

  if (isLoading) {
    return null;
  }

  return <>{user ? children : <Navigate to={ROUTER.Home} />}</>;
};

export default Protected;

Protected.propTypes = {
  children: PropTypes.node.isRequired,
};
