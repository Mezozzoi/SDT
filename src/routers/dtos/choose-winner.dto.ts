import {IsNumber} from "class-validator";

export default class ChooseWinnerDto {
    @IsNumber()
    proposalId: number;

    constructor(obj: {proposalId: number}) {
        this.proposalId = obj.proposalId;
    }
}