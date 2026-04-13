import { SeatStatus } from "./seat-status.type";

export interface CreateTicket {
    amount:number;
    showId:string;
    userId:string;
    status?: SeatStatus;
    lockUntil?: Date;
    lockedBy?:string;
}