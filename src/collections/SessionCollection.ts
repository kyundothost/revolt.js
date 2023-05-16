import { API } from "..";
import { Session } from "../classes";
import { HydratedSession } from "../hydration/session";

import { ClassCollection } from ".";

/**
 * Collection of Sessions
 */
export class SessionCollection extends ClassCollection<
  Session,
  HydratedSession
> {
  /**
   * Fetch active sessions
   * @returns List of sessions
   */
  async fetch(): Promise<Session[]> {
    const data = await this.client.api.get("/auth/session/all");
    return data.map((session) => this.getOrCreate(session._id, session));
  }

  /**
   * Get or create
   * @param id Id
   * @param data Data
   * @returns Session
   */
  getOrCreate(id: string, data: API.SessionInfo) {
    if (this.has(id)) {
      return this.get(id)!;
    } else {
      const instance = new Session(this, id);
      this.create(id, "session", instance, this.client, data);
      return instance;
    }
  }
}
