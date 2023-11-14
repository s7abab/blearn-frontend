import { redirect } from "next/navigation";
import useAuth from "./userAuth";

interface Props {
  children: React.ReactNode;
}
const Protected = ({ children }: Props) => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? children : redirect("/");
};

export default Protected;
