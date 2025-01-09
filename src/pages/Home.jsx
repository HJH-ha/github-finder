import UserResult from "../components/users/UserResult";
import UserSearch from "../components/users/UserSearch";

function Home({ handleAlert }) {
  return (
    <>
      <UserSearch handleAlert={handleAlert} />
      <UserResult />
    </>
  );
}

export default Home;
