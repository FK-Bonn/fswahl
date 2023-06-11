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

export interface ElectionProperties {
    stateVersion: number
    fsName: string
    dateStart: string | null
    dateEnd: string | null
    eligibleVoters: number | null
    alwaysFsv: boolean
    fsrMembersNumberOverride: boolean
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
