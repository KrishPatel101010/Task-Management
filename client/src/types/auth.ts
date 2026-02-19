interface User {
  name: string;
  email: string;
  password: string;
}

export type LoginRequest = Omit<User, "name">;
export type SignUpRequest = User;
