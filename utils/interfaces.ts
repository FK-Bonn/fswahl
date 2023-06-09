export interface ElectionProperties {
    stateVersion: number
    fsName: string
    dateStart: string | null
    dateEnd: string | null
    voters: number | null
    alwaysFsv: boolean
    fsrMembersNumberOverride: boolean
    seats: number | null
}