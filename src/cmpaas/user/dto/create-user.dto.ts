import { ApiModelProperty } from "@nestjs/swagger";

export class CreateUserDto{
    @ApiModelProperty()
    readonly firstname: string;
    @ApiModelProperty()
    readonly surname: string;
    @ApiModelProperty()
    readonly username: string;
    @ApiModelProperty()
    readonly email: string;
    @ApiModelProperty()
    public   password: string;
    
    readonly created?: Date;
    readonly link?: {
        readonly rel: string;
        readonly href: string;
    }
    readonly facebook?: {
        readonly id: string;
        readonly access_token: string;
    }
    readonly google?: {
        readonly id: string;
        readonly access_token: string;
        readonly id_token:string;
    };
    readonly profile_picture?: string;
    readonly locInfo?: {
        readonly country:string;
        readonly countryCode: string;
        readonly region: string;
        readonly regionName: string;
        readonly city: string;
    }
    readonly maps?: [string];
    readonly groups?: [{
        readonly _id: string;
        readonly name: string;
        readonly link: {
            readonly rel: string;
            readonly href: string;
        }
    }];
    readonly following?: [{
        readonly _id: string;
        readonly username: string;
        readonly link: {
            readonly rel: string;
            readonly href: string;
        }
    }];
    readonly followers?: [{
        readonly _id: string;
        readonly username: string;
        readonly link: {
            readonly rel: string;
            readonly href: string;
        }
    }];
    readonly notifications?: [{
        readonly message: string;
        readonly readed: boolean;
    }];
    readonly description?:string;
}