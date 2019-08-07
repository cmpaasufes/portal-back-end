import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { VersionService } from './version.service';
import { Version } from './interfaces/version.interface';
import { CreateVersionDto } from './dto/create-version.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiImplicitBody } from '@nestjs/swagger';

@ApiUseTags('versions')
@Controller('versions')
export class VersionController {
  constructor(private readonly versionService: VersionService) {}

  @Post()
  @ApiImplicitBody({ name: 'body', required: true, type: CreateVersionDto })
  async create(@Res() res, @Body() createVersionDto: CreateVersionDto) {
    try {
      let result = await this.versionService.create(createVersionDto);
      if (result != undefined) {
        res.status(HttpStatus.OK).send(result);
      } else {
        res.status(HttpStatus.NOT_FOUND).json('{"message":"check /docs"}');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).json(err.message);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<Version[]> {
    return this.versionService.findAll();
  }
}
