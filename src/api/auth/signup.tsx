import User from "@/api/User";

async function signup() {
  const login = (document.getElementById("signup_login") as HTMLInputElement).value;
  const password = (document.getElementById("signup_password") as HTMLInputElement).value;
  const confirmPassword = (document.getElementById("signup_confirmPassword") as HTMLInputElement).value;

  if (login.length < 6) return { response: 400, errorMessage: "Minimum login length - 6 symbols!" };
  if (password.length < 6) return { response: 400, errorMessage: "Minimum password length - 6 symbols!" };
  if (password !== confirmPassword) return { response: 400, errorMessage: "Password mismatch!" };
  // GET method before sign up to check account is exist or not

  const usersGet = await fetch("http://localhost:3000/users");
  const usersObjects = await usersGet.json();
  const users = Object.values(usersObjects);

  console.log("ALL USERS:", users);

  const arr = users.filter((u: User) => u.login === login);
  if (arr.length !== 0) return { response: 400, errorMessage: "This account already exist!" };

  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ login, password }),
  });

  if (response.ok) {
    return { username: login, response: response.status };
  }
  return { response: response.status, errorMessage: response.statusText };
}

export default signup;
