import {ElectionProperties} from "~/utils/interfaces";
import {useLocalStorage} from "@vueuse/core";

export const useElectionProperties = () => useLocalStorage<ElectionProperties>('election', {
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
})
