import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Layout from "./components/Layout";

function Home() {
  const isLogged = useSelector((state) => state.token.value) !== "";

  return (
    <>{!isLogged ? <Navigate to="/" replace={true} /> : <Layout></Layout>}</>
  );
}

export default Home;
