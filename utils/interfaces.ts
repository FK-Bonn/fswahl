export interface EventPlace {
    date: string
    timeStart: string
    timeEnd: string
    locationDE: string
    locationEN: string
}

export interface IndividualResult {
    name: string
    votes: number
}

export interface ForbiddenDate {
    title: string
    start: string
    end: string
}

export interface LegacyElectionProperties0 {
    stateVersion: number
    fsName: string
    dateStart: string | null
    dateEnd: string | null
    eligibleVoters: number | null
    alwaysFsv: boolean
    fsrMembersNumberOverride: boolean
    plenum: boolean
    seats: number | null
    mainDeadline: string | null
    countingDateTime: string | null
    countingLocationDE: string | null
    countingLocationEN: string | null
    constituentAssemblyDateTime: string | null
    constituentAssemblyLocationDE: string | null
    constituentAssemblyLocationEN: string | null
    supervisorName: string | null
    supervisorEmail: string | null
    pollingPlaces: EventPlace[]
    electoralRegisterPlaces: EventPlace[]
    candidates: string[]
    resultLocation: string | null
    resultDate: string | null
    invalidVotes: number | null
    votes: IndividualResult[]
}

export interface LegacyElectionProperties1 extends LegacyElectionProperties0 {
    abstentions: number | null
}

export interface ElectionProperties extends LegacyElectionProperties1 {
    timeStartPlenum: string | null
    locationPlenumDE: string | null
    locationPlenumEN: string | null
}

export type StoredElectionProperties = LegacyElectionProperties0
    | LegacyElectionProperties1
    | ElectionProperties
