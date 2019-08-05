import { ApiModelProperty } from "@nestjs/swagger";

export class UserLoginDto{
    @ApiModelProperty()
    readonly username: string;
    @ApiModelProperty()
    readonly  password: string; 
}