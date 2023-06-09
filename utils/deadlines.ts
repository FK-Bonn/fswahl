import {ElectionProperties} from "~/utils/interfaces";

export class PropertyCalculator {
    private properties: ElectionProperties

    constructor(properties: ElectionProperties) {
        this.properties = properties;
    }

    private beforeElection(numberOfDays: number): string {
        if (this.properties.dateStart) {
            const date = new Date(this.properties.dateStart);
            date.setDate(date.getDate() - numberOfDays)
            return date.toLocaleDateString('de-de', {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            });
        }
        return '';
    }

    private afterElection(numberOfDays: number): string {
        if (this.properties.dateEnd) {
            const date = new Date(this.properties.dateEnd);
            date.setDate(date.getDate() + numberOfDays)
            return date.toLocaleDateString('de-de', {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            });
        }
        return '';
    }


    get dateStartWeekday(): string {
        if (this.properties.dateStart) {
            return new Date(this.properties.dateStart).toLocaleString('de-de', {weekday: 'long'})
        }
        return '';
    }

    get dateEndWeekday(): string {
        if (this.properties.dateEnd) {
            return new Date(this.properties.dateEnd).toLocaleString('de-de', {weekday: 'long'})
        }
        return '';
    }

    get setElectionDate(): string {
        return this.beforeElection(30);
    }

    get electSupervisorAndCommittee(): string {
        return this.beforeElection(30);
    }

    get eligibilityDeadline(): string {
        return this.beforeElection(30);
    }

    get firstCommitteeMeeting(): string {
        return this.beforeElection(25);
    }

    get committeeDecisions(): string {
        return this.beforeElection(25);
    }

    get takeOverListOfEligibleVoters(): string {
        return this.beforeElection(19);
    }

    get publishAnnouncement(): string {
        return this.beforeElection(18);
    }

    get mainDeadlineEarliest(): string {
        return this.beforeElection(13);
    }

    get mainDeadlineLatest(): string {
        return this.beforeElection(10);
    }

    get publicationOfCandidates(): string {
        return this.beforeElection(9);
    }

    get firstElectionDay(): string {
        return this.beforeElection(0);
    }

    get lastElectionDay(): string {
        return this.afterElection(0);
    }

    get initialMeetingEarliest(): string {
        return this.afterElection(5);
    }

    get initialMeetingLatest(): string {
        return this.afterElection(14);
    }

    get checkAlwaysFSV(): boolean | undefined {
        if (this.properties.voters === null) {
            return undefined;
        } else {
            return this.properties.voters <= 500;
        }
    }

    get checkStatutesCustomNumberOfPersons(): boolean | undefined {
        return this.electFSR === true;
    }

    get electFSR(): boolean | undefined {
        if (this.electFSV === undefined) {
            return undefined;
        }
        return !this.electFSV;
    }

    get electFSV(): boolean | undefined {
        if (this.properties.alwaysFsv) {
            return true;
        }
        if (this.properties.voters === null) {
            return undefined;
        } else {
            return this.properties.voters > 500;
        }
    }
}