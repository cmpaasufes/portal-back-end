import { ApiModelProperty } from '@nestjs/swagger';

export class nodeDataArrayDto {
    @ApiModelProperty()
    readonly text: string;
    @ApiModelProperty()
    readonly loc: string;
    @ApiModelProperty()
    readonly category: string;
    @ApiModelProperty()
    readonly error: string;
    @ApiModelProperty()
    readonly key: number;
  }

  export class linkDataArrayDto {
    @ApiModelProperty()
    readonly from: number;
    @ApiModelProperty()
    readonly to: number;
    @ApiModelProperty()
    readonly category: string;
    @ApiModelProperty()
    readonly error: string;
    @ApiModelProperty()
    readonly points: [number];
  }

export class ExportMapDto {
  @ApiModelProperty()
  readonly class: string;
  @ApiModelProperty()
  readonly nodeDataArray: nodeDataArrayDto;
  @ApiModelProperty()
  readonly linkDataArray: linkDataArrayDto;
}

