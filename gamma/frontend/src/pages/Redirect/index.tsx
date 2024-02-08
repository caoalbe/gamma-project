import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { themes } from "../../components/theme";

const RedirectPage = ({ targetPage }: { targetPage: string }): JSX.Element => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/${targetPage}`);
  }, []);

  return (
    <div
      className={`${themes["black"].bgBase} ${themes["black"].textPrimary} h-lvh`}
    />
  );
};

export default RedirectPage;
