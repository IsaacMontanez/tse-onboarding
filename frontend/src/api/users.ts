import { get, handleAPIError } from "src/api/requests";

import type { APIResult } from "src/api/requests";

/**
 * Defines the "shape" of a User object (what fields are present and their types) for
 * frontend components to use. This will be the return type of most functions in this
 * file.
 */
export type User = {
  _id: string;
  name: string;
  profilePictureURL?: string | null;
};

/**
 * Retrieves a User by ID from the backend API.
 */
export async function getUser(id: string): Promise<APIResult<User>> {
  try {
    const response = await get(`/api/user/${id}`);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const json = (await response.json()) as User;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
