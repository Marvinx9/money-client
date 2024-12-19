import { redirect } from "react-router-dom";

const authLoader = () => {
  const accessTokenStoraged = localStorage.getItem("@access_token");
  if (!accessTokenStoraged) throw redirect("/");
  return null;
};

export { authLoader };
