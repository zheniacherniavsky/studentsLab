type GetProfileResponseType = {
  avatar: string;
  username: string;
  description: string;
};

export default async function getProfile(username: string): Promise<GetProfileResponseType> {
  const response = await fetch(`http://localhost:3000/getprofile/${username}`);
  const answer: GetProfileResponseType = await response.json();
  return answer;
}
