import { Document } from 'mongoose';

export interface Version extends Document {
  readonly content: any;
  readonly created?: Date;
  readonly last_update?: Date;
  readonly link?: {
    readonly rel: string;
    readonly href: string;
  };
}
