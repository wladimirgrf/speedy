export interface ClientSelect {
  id?: boolean;
  username?: boolean;
  password?: boolean;
}

export const clientDefaultSelect = {
  id: true,
  username: true,
  password: true,
};
