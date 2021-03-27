async function signup(
  login: string,
  firstPassword: string,
  secondPassword: string
): Promise<{ username?: string; errorMessage?: string }> {
  if (firstPassword !== secondPassword) return { errorMessage: "Password mismatch!" };

  const password = firstPassword;

  const response = await fetch("http://localhost:3000/register", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ login, password }),
  });

  if (response.ok) {
    return { username: login };
  }
  const answer = await response.json();
  return { errorMessage: answer.message };
}

export default signup;
