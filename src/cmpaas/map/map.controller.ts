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
import { ApiUseTags, ApiImplicitBody, ApiBearerAuth, ApiImplicitParam, ApiResponse } from '@nestjs/swagger';
import { EditMapDto } from './dto/edit-map.dto';
import { NewMapDto } from './dto/new-content.dto';

@ApiUseTags('maps')
@Controller('maps')
@ApiBearerAuth()
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiResponse({ status: 200, description: 'Map was created.'})
  @ApiResponse({ status: 404, description: 'Map was not created.'})
  @ApiResponse({ status: 503, description: 'Server error.'})
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
  @ApiResponse({ status: 200, description: 'Map was find.'})
  @ApiResponse({ status: 404, description: 'Map was not find.'})
  @ApiResponse({ status: 503, description: 'Server error.'})
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
  @ApiImplicitParam({
    name: 'idmap',
    description: 'enter map ID',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Map version was find.'})
  @ApiResponse({ status: 404, description: 'Map version was not find.'})
  @ApiResponse({ status: 503, description: 'Server error.'})
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
  @ApiResponse({ status: 200, description: 'Map version was find.'})
  @ApiResponse({ status: 404, description: 'Map version was not find.'})
  @ApiResponse({ status: 503, description: 'Server error.'})
  @ApiImplicitParam({
    name: 'idmap',
    description: 'enter map ID',
    required: true,
    type: String,
  })
  @ApiImplicitParam({
    name: 'idversion',
    description: 'enter version ID',
    required: true,
    type: String,
  })
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
  @ApiResponse({ status: 200, description: 'Map was updated.'})
  @ApiResponse({ status: 404, description: 'Map was not updated.'})
  @ApiResponse({ status: 503, description: 'Server error.'})
  @ApiImplicitParam({
    name: 'idmap',
    description: 'enter map ID',
    required: true,
    type: String,
  })
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
  @ApiResponse({ status: 200, description: 'New content was created.'})
  @ApiResponse({ status: 404, description: 'New content was not created.'})
  @ApiResponse({ status: 503, description: 'Server error.'})
  @ApiImplicitParam({
    name: 'idmap',
    description: 'enter map ID',
    required: true,
    type: String,
  })
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
  @ApiResponse({ status: 200, description: 'Map was deleted.'})
  @ApiResponse({ status: 404, description: 'Map was not deleted.'})
  @ApiResponse({ status: 503, description: 'Server error.'})
  @ApiImplicitParam({
    name: 'idmap',
    description: 'enter map ID',
    required: true,
    type: String,
  })
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
  @ApiResponse({ status: 200, description: 'Version was deleted.'})
  @ApiResponse({ status: 404, description: 'version was not deleted.'})
  @ApiResponse({ status: 503, description: 'Server error.'})
  @ApiImplicitParam({
    name: 'idmap',
    description: 'enter map ID',
    required: true,
    type: String,
  })
  @ApiImplicitParam({
    name: 'idversion',
    description: 'enter version ID',
    required: true,
    type: String,
  })
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
