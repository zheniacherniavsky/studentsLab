export type GetProfileResponseType = {
  avatar: string;
  username: string;
  description: string;
};

export async function GetProfile(username: string): Promise<GetProfileResponseType> {
  const response = await fetch(`http://localhost:3000/profile/${username}`);
  const answer: GetProfileResponseType = await response.json();
  return answer;
}
