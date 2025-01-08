import { useEffect, useState } from "react";
import Spinner from "../layout/Spinner";

function UserResult() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchUsers = () => {
    fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false); // 데이터 로딩완료 false
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          <h3>{user.login}</h3>
        ))}
      </div>
    );
  }
}

export default UserResult;
