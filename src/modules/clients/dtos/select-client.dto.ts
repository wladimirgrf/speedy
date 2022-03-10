export interface ClientColumnsToReturn {
  id?: boolean;
  username?: boolean;
  password?: boolean;
}

export const clientDefaultColumnsToReturn = {
  id: true,
  username: true,
  password: true,
};
