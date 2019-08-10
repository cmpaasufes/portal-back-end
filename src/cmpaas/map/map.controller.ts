import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Request
} from '@nestjs/common';
import { MapService } from './map.service';
import { Map } from './interfaces/map.interface';
import { CreateMapDto } from './dto/create-map.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiImplicitBody } from '@nestjs/swagger';

@ApiUseTags('maps')
@Controller('maps')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiImplicitBody({ name: 'body', required: true, type: CreateMapDto })
  async create(@Res() res, @Body() createCatDto: CreateMapDto, @Request() req) {
    try {
      let result = await this.mapService.saveMap(createCatDto, req.user);
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
  async findAll(): Promise<Map[]> {
    return this.mapService.findAll();
  }
}
