import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectPage = ({ targetPage }: { targetPage: string }): JSX.Element => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/${targetPage}`);
  }, []);

  return <div className="bg-black text-white h-lvh" />;
};

export default RedirectPage;
