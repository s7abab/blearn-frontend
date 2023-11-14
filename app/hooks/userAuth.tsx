import { useSelector } from "react-redux";

const useAuth = () => {
  const { user } = useSelector((state: any) => state.auth);

  if (user) {
    return true;
  } else {
    return false;
  }
};

export default useAuth;
    