import { createContext, useState } from "react";

const GithubContext = createContext();
// 깃허브주소와 토큰 변수지정
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// 프로바이더가 전역으로 컨텍스트를 적용함
export const GithubProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  //유저들 클리어
  const clearUsers = () => {
    setUsers([]);
  };
  // 키워드로 유저찾기
  const searchUsers = (text) => {
    setLoading(true);
    const params = new URLSearchParams({ q: text });
    fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.items);
        setLoading(false); // 데이터 로딩완료 false
      })
      .catch((err) => console.log(err));
  };

  // 깃허브 아이디로 유저찾기
  const getUser = (login) => {
    setLoading(true);

    fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false); // 데이터 로딩완료 false
      })
      .catch((err) => (window.location = "/notfound"));
    getUserRepos(login);
  };

  // 유저 공개된 리포 리스트
  const getUserRepos = (login) => {
    setLoading(true);
    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });
    fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
        setLoading(false); // 데이터 로딩완료 false
      })
      .catch((err) => console.log(err));
  };

  return (
    <GithubContext.Provider
      value={{
        users,
        user,
        loading,
        repos,
        searchUsers,
        getUser,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
