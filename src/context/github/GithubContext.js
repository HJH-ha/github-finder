import { createContext, useState } from "react";

const GithubContext = createContext();
// 깃허브주소와 토큰 변수지정
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// 프로바이더가 전역으로 컨텍스트를 적용함
export const GithubProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
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
  return (
    <GithubContext.Provider
      value={{
        users,
        loading,
        searchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
