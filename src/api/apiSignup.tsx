async function signup(): Promise<{ username?: string; errorMessage?: string }> {
  const login = (document.getElementById("signup_login") as HTMLInputElement).value;
  const password = (document.getElementById("signup_password") as HTMLInputElement).value;
  const confirmPassword = (document.getElementById("signup_confirmPassword") as HTMLInputElement).value;

  if (login.length < 6) return { errorMessage: "Minimum login length - 6 symbols!" };
  if (password.length < 6) return { errorMessage: "Minimum password length - 6 symbols!" };
  if (password !== confirmPassword) return { errorMessage: "Password mismatch!" };

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
