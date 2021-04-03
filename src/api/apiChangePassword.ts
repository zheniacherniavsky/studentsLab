export default async function changePassword(login: string, newPassword: string): Promise<string> {
  const response = await fetch("http://localhost:3000/changepassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ login, newPassword }),
  });

  if (response.ok) return "";
  const answer = await response.json();
  return answer.message;
}
