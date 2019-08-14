import { ApiModelProperty } from "@nestjs/swagger";

export class ResetLoginDto{
    @ApiModelProperty()
    readonly email: string;
}