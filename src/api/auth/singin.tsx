import User from "@/api/User";

async function signin() {
  const login = (document.getElementById("signin_login") as HTMLInputElement).value;
  const password = (document.getElementById("signin_password") as HTMLInputElement).value;

  if (login.length < 6) {
    return { errorMessage: "Minimum login length - 6 symbols" };
  }

  if (password.length < 6) {
    return { errorMessage: "Minimum password length - 6 symbols" };
  }

  // GET method before auth to check account is exist or not

  const usersGet = await fetch("http://localhost:3000/users");
  const usersObjects = await usersGet.json();
  const users = Object.values(usersObjects);

  console.log("ALL USERS:", users);

  const arr = users.filter((u: User) => u.login === login && u.password === password);
  if (arr.length !== 0) return { username: (arr[0] as User).login };
  return { errorMessage: `User '${login}' not found!` };
}

export default signin;
