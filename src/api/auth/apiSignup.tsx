async function signup() {
  const login = (document.getElementById("signup_login") as HTMLInputElement).value;
  const password = (document.getElementById("signup_password") as HTMLInputElement).value;
  const confirmPassword = (document.getElementById("signup_confirmPassword") as HTMLInputElement).value;

  if (login.length < 6) return { response: 400, errorMessage: "Minimum login length - 6 symbols!" };
  if (password.length < 6) return { response: 400, errorMessage: "Minimum password length - 6 symbols!" };
  if (password !== confirmPassword) return { response: 400, errorMessage: "Password mismatch!" };

  const response = await fetch("http://localhost:3000/register", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ login, password }),
  });

  if (response.ok) {
    alert("OK");
    return login;
  }
  const answer = await response.json();
  alert(answer.message);

  return null;
}

export default signup;
