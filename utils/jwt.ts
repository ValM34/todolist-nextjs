export function getJwt() {
  const userStorage = localStorage.getItem("user");
  if (!userStorage) return null;
  const token = JSON.parse(userStorage).token;
  if (!token) return null;

  return token;
}
