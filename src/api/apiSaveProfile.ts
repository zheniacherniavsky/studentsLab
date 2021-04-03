export default async function saveProfile(login: string, username: string, description: string): Promise<string> {
  const response = await fetch("http://localhost:3000/saveprofile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ login, username, description }),
  });

  if (response.ok) return "";
  const answer = await response.json();
  return answer.message;
}
