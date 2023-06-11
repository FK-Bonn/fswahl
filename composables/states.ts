import {ElectionProperties} from "~/utils/interfaces";
import {createGlobalState, useLocalStorage} from "@vueuse/core";


const initialValue = () => {
    return {
        stateVersion: 0,
        fsName: '',
        dateStart: null,
        dateEnd: null,
        voters: null,
        alwaysFsv: false,
        fsrMembersNumberOverride: false,
        seats: null,
        mainDeadline: null,
        countingDateTime: null,
        countingLocationDE: null,
        countingLocationEN: null,
        constituentAssemblyDateTime: null,
        constituentAssemblyLocationDE: null,
        constituentAssemblyLocationEN: null,
        supervisorName: null,
        supervisorEmail: null,
        pollingPlaces: [],
        electoralRegisterPlaces: [],
    };
}
export const useElectionProperties = createGlobalState(() => {
        try {
            return useLocalStorage<ElectionProperties>('election', initialValue(),
                {
                    mergeDefaults: true,
                }
            );
        } catch (e) {
            return ref(initialValue());
        }
    }
);
