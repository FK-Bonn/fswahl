import {ElectionProperties} from "~/utils/interfaces";

export class PropertyCalculator {
    public readonly properties: ElectionProperties

    constructor(properties: ElectionProperties) {
        this.properties = properties;
    }

    private beforeElection(numberOfDays: number): string {
        if (this.properties.dateStart) {
            const date = new Date(this.properties.dateStart);
            date.setDate(date.getDate() - numberOfDays)
            return this.date(date);
        }
        return '';
    }

    private afterElection(numberOfDays: number): string {
        if (this.properties.plenum) {
            if (this.properties.dateStart) {
                const date = new Date(this.properties.dateStart);
                date.setDate(date.getDate() + numberOfDays)
                return this.date(date);
            }
        } else if (this.properties.dateEnd) {
            const date = new Date(this.properties.dateEnd);
            date.setDate(date.getDate() + numberOfDays)
            return this.date(date);
        }
        return '';
    }


    get dateStartWeekday(): string {
        if (this.properties.dateStart) {
            return this.weekday(this.properties.dateStart);
        }
        return '';
    }

    get dateEndWeekday(): string {
        if (this.properties.dateEnd) {
            return this.weekday(this.properties.dateEnd);
        }
        return '';
    }

    get mainDeadlineWeekday(): string {
        if (this.properties.mainDeadline) {
            return this.weekday(this.properties.mainDeadline);
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
        if (this.properties.eligibleVoters === null) {
            return undefined;
        } else {
            return this.properties.eligibleVoters <= 500;
        }
    }

    get checkPlenum(): boolean | undefined {
        if (this.properties.eligibleVoters === null) {
            return undefined;
        } else {
            return this.properties.eligibleVoters <= 500;
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
        if (this.properties.eligibleVoters === null) {
            return undefined;
        } else {
            return this.properties.eligibleVoters > 500;
        }
    }

    get committeeName(): string | undefined {
        if (this.electFSV) {
            return 'Fachschaftsvertretung';
        }
        if (this.electFSR) {
            return 'Fachschaftsrat';
        }
    }

    get committeeDeterminer(): string | undefined {
        if (this.electFSV) {
            return 'die';
        }
        if (this.electFSR) {
            return 'der';
        }
    }

    get committeeNameGenitive(): string | undefined {
        if (this.electFSV) {
            return 'Fachschaftsvertretung';
        }
        if (this.electFSR) {
            return 'Fachschaftsrats';
        }
    }

    get committeeDeterminerGenitive(): string | undefined {
        if (this.electFSV) {
            return 'der';
        }
        if (this.electFSR) {
            return 'des';
        }
    }

    get committeeDeterminerAccusative(): string | undefined {
        if (this.electFSV) {
            return 'die';
        }
        if (this.electFSR) {
            return 'den';
        }
    }

    get seats(): number | undefined {
        if (this.properties.seats) {
            return this.properties.seats;
        }
        if (this.electFSR) {
            return 5;
        }
        if (this.electFSV) {
            if (this.properties.eligibleVoters) {
                if (this.properties.eligibleVoters > 2000) {
                    return 19;
                }
                if (this.properties.eligibleVoters > 1000) {
                    return 15;
                }
                if (this.properties.eligibleVoters > 500) {
                    return 11;
                }
                return 7;
            }
        }
        return undefined;
    }

    get extraBallotLine(): boolean | undefined {
        if (this.seats) {
            return this.properties.candidates.length <= this.seats;
        }
        return undefined;
    }

    get mainDeadlineDate(): string | undefined {
        if (this.properties.mainDeadline) {
            return this.date(this.properties.mainDeadline);
        }
        return undefined;
    }

    get mainDeadlineTime(): string | undefined {
        if (this.properties.mainDeadline) {
            return this.time(this.properties.mainDeadline);
        }
        return undefined;
    }

    get countingDate(): string | undefined {
        if (this.properties.countingDateTime) {
            return this.date(this.properties.countingDateTime);
        }
        return undefined;
    }

    get countingTime(): string | undefined {
        if (this.properties.countingDateTime) {
            return this.time(this.properties.countingDateTime);
        }
        return undefined;
    }

    get constituentAssemblyDate(): string | undefined {
        if (this.properties.constituentAssemblyDateTime) {
            return this.date(this.properties.constituentAssemblyDateTime);
        }
        return undefined;
    }


    get constituentAssemblyTime(): string | undefined {
        if (this.properties.constituentAssemblyDateTime) {
            return this.time(this.properties.constituentAssemblyDateTime);
        }
        return undefined;
    }

    get resultDate(): string | null {
        if (this.properties.resultDate) {
            return this.date(this.properties.resultDate);
        }
        return null;
    }

    get validVotes(): number {
        let sum = 0;
        for (let vote of this.properties.votes) {
            sum += vote.votes;
        }
        return sum;
    }

    get totalVotes(): number | undefined {
        if (this.properties.invalidVotes || this.properties.invalidVotes === 0) {
            return this.properties.invalidVotes + this.validVotes;
        }
        return undefined;
    }

    get turnout(): string | undefined {
        if (this.totalVotes && this.properties.eligibleVoters) {
            const turnoutValue = this.totalVotes / this.properties.eligibleVoters * 100;
            return turnoutValue.toFixed(2).replace('.', ',') + ' %';
        }
        return undefined;
    }

    protected date(inputDate: string | Date) {
        return dateDE(inputDate);
    }

    protected time(inputDate: string | Date) {
        return timeDE(inputDate);
    }

    protected weekday(inputDate: string | Date) {
        return weekdayDE(inputDate);
    }
}

export class PropertyCalculatorEN extends PropertyCalculator {

    protected date(inputDate: string | Date) {
        return dateEN(inputDate);
    }

    protected time(inputDate: string | Date) {
        return timeEN(inputDate);
    }

    protected weekday(inputDate: string | Date) {
        return weekdayEN(inputDate);
    }
}
