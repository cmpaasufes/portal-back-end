import { ApiModelProperty } from '@nestjs/swagger';

export class NewMapDto {
  @ApiModelProperty()
  readonly _id: string;
  @ApiModelProperty()
  readonly content?: any;
}
