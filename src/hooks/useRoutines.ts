import { useEffect, useState } from "react";
import { getRequest } from "../utils/apiRequests";
import type { Routine } from "../types/api";
import { useMe } from "./useMe";

export function useRoutines() {

    const { user } = useMe();
    // state variables
    const [routines, setRoutines] = useState<Routine[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!user) return;

        async function fetchRoutines() {
            try {
                setIsLoading(true);
                setError(null); // remove any previous error messages

                const response = await getRequest(`/users/${user?.id}/routines`);
                if (response.data != null) setRoutines(response.data);
            } catch (err: any) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchRoutines(); // fetch on mount
    }, [user?.id]);

    return {
        routines,
        isLoading,
        error
    };
}
