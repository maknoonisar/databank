import axios from "axios";

export async function createUser(data: { name: string; email: string; password: string; role: string; }) {
  const response = await axios.post("/api/users", data);
  return response.data;
}
