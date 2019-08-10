import { ApiModelProperty } from '@nestjs/swagger';

export class CreateMapDto {
  @ApiModelProperty()
  readonly title: string;
  @ApiModelProperty()
  readonly description?: string;
  @ApiModelProperty()
  readonly question?: string;
  @ApiModelProperty()
  readonly keywords?: [string];
  @ApiModelProperty()
  readonly content: any;
  readonly last_version: string;
  readonly versions?: [string];
  readonly created?: Date;
  readonly last_update?: Date;
  readonly author?: {
    readonly username: string;
    readonly link?: {
      readonly rel: string;
      readonly href: string;
    };
  };
  readonly permissions?: {
    readonly publicPermission: {
      readonly canView: Boolean;
      readonly canFork: Boolean;
      readonly canEdit: Boolean;
    };
  };
  readonly groups?: [
    {
      readonly group: {
        readonly name: string;
        readonly link: {
          readonly rel: string;
          readonly href: string;
        };
      };
      readonly permission?: {
        readonly canView: Boolean;
        readonly canFork: Boolean;
        readonly canEdit: Boolean;
      };
    }
  ];
  readonly users?: [
    {
      readonly group?: {
        readonly username: string;
        readonly link: {
          readonly rel: string;
          readonly href: string;
        };
      };
      readonly permission?: {
        readonly canView: Boolean;
        readonly canFork: Boolean;
        readonly canEdit: Boolean;
      };
    }
  ];
  readonly link?: {
    readonly rel: string;
    readonly href: string;
  };
}
