// src/lib/db.ts

interface User {
  id: string;
  email: string;
  password: string;
  role: string;
}

const users: User[] = []; // Mock in-memory users DB

export async function getUserByEmail(email: string): Promise<User | undefined> {
  return users.find((user) => user.email === email);
}

export async function createUser(data: { email: string; password: string; role: string }): Promise<User> {
  const newUser: User = {
    id: crypto.randomUUID(),
    email: data.email,
    password: data.password,
    role: data.role,
  };
  users.push(newUser);
  return newUser;
}
