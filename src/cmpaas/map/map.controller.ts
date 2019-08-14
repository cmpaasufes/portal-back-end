import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Request,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { MapService } from './map.service';
import { Map } from './interfaces/map.interface';
import { CreateMapDto } from './dto/create-map.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiImplicitBody } from '@nestjs/swagger';
import { EditMapDto } from './dto/edit-map.dto';
import { NewMapDto } from './dto/new-content.dto';

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
  async findAll(@Res() res, @Request() req) {
    try {
      let result = await this.mapService.findAll(req.user);
      if (result != null) {
        res.status(HttpStatus.OK).send(result);
      } else {
        res.status(HttpStatus.NOT_FOUND).json('{"message":"check /docs"}');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).json(err.message);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':idmap/versions')
  async findAllVersions(@Res() res, @Request() req, @Param() id) {
    try {
      let result = await this.mapService.findAllVersions(id.idmap, req.user);
      if (result != null) {
        res.status(HttpStatus.OK).send(result);
      } else {
        res.status(HttpStatus.NOT_FOUND).json('{"message":"check /docs"}');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).json(err.message);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':idmap/versions/:idversion')
  async findOneVersions(@Res() res, @Request() req, @Param() params) {
    try {
      let result = await this.mapService.findOneVersion(params.idmap, params.idversion, req.user);
      if (result != null) {
        res.status(HttpStatus.OK).send(result);
      } else {
        res.status(HttpStatus.NOT_FOUND).json('{"message":"check /docs"}');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).json(err.message);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':idmap')
  @ApiImplicitBody({ name: 'body', required: true, type: EditMapDto })
  async editMap(@Res() res, @Request() req, @Body() editMapDto: any, @Param() params) {
    try {
      let result = await this.mapService.editMap(editMapDto, params.idmap, req.user);
      if (result != null) {
        res.status(HttpStatus.OK).send(result);
      } else {
        res.status(HttpStatus.NOT_FOUND).json('{"message":"check /docs"}');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).json(err.message);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':idmap/content')
  @ApiImplicitBody({ name: 'body', required: true, type: NewMapDto })
  async newContent(@Res() res, @Request() req, @Body() editMapDto: any, @Param() params) {
    try {
      let result = await this.mapService.newContent(editMapDto, params.idmap, req.user);
      if (result != null) {
        res.status(HttpStatus.OK).send(result);
      } else {
        res.status(HttpStatus.NOT_FOUND).json('{"message":"check /docs"}');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).json(err.message);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':idmap')
  async deleteMap(@Res() res, @Request() req, @Param() params) {
    try {
      let result = await this.mapService.deleteMap(params.idmap, req.user);
      if (result != null) {
        res.status(HttpStatus.OK).send(result);
      } else {
        res.status(HttpStatus.NOT_FOUND).json('{"message":"check /docs"}');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).json(err.message);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':idmap/versions/:idversion')
  async deleteVersion(@Res() res, @Request() req, @Param() params) {
    try {
      let result = await this.mapService.deleteVersion(params.idmap, params.idversion ,req.user);
      if (result != null) {
        res.status(HttpStatus.OK).send(result);
      } else {
        res.status(HttpStatus.NOT_FOUND).json('{"message":"check /docs"}');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).json(err.message);
    }
  }
}
