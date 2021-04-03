async function signin(login: string, password: string): Promise<{ username?: string; errorMessage?: string }> {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      login,
      password,
    }),
  });

  if (response.ok) {
    return { username: login };
  }
  const answer = await response.json();

  return { errorMessage: answer.message };
}

export default signin;
