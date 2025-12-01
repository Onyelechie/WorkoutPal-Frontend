import type { Routine } from "../types/api";
import { getRequest } from "../utils/apiRequests";

export const routineService = {

    // caller of this function needs to try catch the error that may come from getRequest
    async getRoutinesByIds(ids: number[]): Promise<Routine[]> {
        if (ids) {
            const responses = await Promise.all(
                ids.map((id) => getRequest(`/routines/${id}`))
            );
            const routines: Routine[] = responses.map((res) => res.data);
            return routines;
        } else {
            return [];
        }
    }
}