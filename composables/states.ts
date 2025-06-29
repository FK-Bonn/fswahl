import {ElectionProperties} from "~/utils/interfaces";
import {createGlobalState, useLocalStorage} from "@vueuse/core";


export const initialValue = () => {
    return {
        stateVersion: 2,
        fsName: '',
        dateStart: null,
        dateEnd: null,
        timeStartPlenum: null,
        locationPlenumDE: null,
        locationPlenumEN: null,
        eligibleVoters: null,
        alwaysFsv: false,
        fsrMembersNumberOverride: false,
        plenum: false,
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
        candidates: [],
        resultLocation: 'Bonn',
        resultDate: null,
        invalidVotes: null,
        abstentions: null,
        votes: [],
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
