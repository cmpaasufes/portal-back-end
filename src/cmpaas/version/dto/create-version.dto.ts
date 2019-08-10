
export class CreateVersionDto {
  readonly content: any;
  readonly created?: Date;
  readonly last_update?: Date;
  readonly link?: {
    readonly rel: string;
    readonly href: string;
  };
}
