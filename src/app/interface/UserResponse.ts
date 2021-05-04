import { AuthUser } from "./AuthResponse";

export interface UserPages {
  results: AuthUser[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}
