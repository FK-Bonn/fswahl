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
})
