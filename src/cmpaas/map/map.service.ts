import { Model, model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Map } from './interfaces/map.interface';
import { VersionService } from '../version/version.service';
import { UserService } from '../user/user.service';
import { CreateMapDto } from './dto/create-map.dto';

const moment = require('moment')

@Injectable()
export class MapService {
  constructor(
    @Inject('MapConnectionToken')
    private readonly mapModel: Model<Map>,
    private readonly versionService: VersionService,
    private readonly userService: UserService,
  ) {}

  async create(createMaprDto: any) {
    let map;
    let version;
    try {
      version = await this.versionService.create(createMaprDto);
      map = new this.mapModel(createMaprDto);
      map.last_version = createMaprDto.content;
      map.versions.push(version._id);
      return await map.save();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async saveMap(createMaprDto: any, user: any) {
    let map;
    let resultUser;
    try {
      map = await this.create(createMaprDto);
      resultUser = await this.userService.findOne(user.username);
      resultUser.maps.push(map._id);
      return await this.userService.update(resultUser);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async newContent(editMapDto: any, _id: string, user: any) {
    let map;
    let version;
    try {
      map = await this.findOne(_id);
      version = await this.versionService.create(editMapDto);
      map.last_version = editMapDto.content;
      map.versions.push(version._id);
      return await map.save();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async editMap(updateMapDto: any, idmap: string, user: any) {
    let result;
    try {
      result = await this.mapModel
        .findOneAndUpdate({ _id: idmap }, updateMapDto)
        .exec();
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async updateOne(updateMapDto: any) {
    let result;
    try {
      result = await this.mapModel
        .findOneAndUpdate({ _id: updateMapDto._id }, updateMapDto)
        .exec();
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findAll(user: any): Promise<Map[]> {
    let maps = [];
    let resultUser = await this.userService.findOne(user.username);
    for (let index = 0; index < resultUser.maps.length; index++) {
      maps.push(await this.findOne(resultUser.maps[index]));
    }
    return maps;
  }

  async findAllVersions(id: any, user: any) {
    let versions = [];
    let maps = await this.findOne(id);
    for (let index = 0; index < maps.versions.length; index++) {
      versions.push(await this.versionService.findOne(maps.versions[index]));
    }
    return versions;
  }

  async findOneVersion(idmap: any, idversion: any, user: any) {
    let maps = await this.findOne(idmap);
    let version;
    if (maps.versions.includes(idversion)) {
      version = await this.versionService.findOne(idversion);
    }
    return version;
  }

  async findOne(_id: string): Promise<Map> {
    let result;
    result = await this.mapModel.findOne({ _id: _id }).exec();
    return result;
  }

  async deleteMap(idmap: string, user: any): Promise<Map> {
    let result;
    let resultUser;
    let index;
    try {
      if (this.checkMapUser(user.username, idmap)) {
        result = await this.mapModel.findByIdAndDelete({ _id: idmap }).exec();
        resultUser = await this.userService.findOne(user.username);

        index = resultUser.maps.indexOf(idmap);
        resultUser.maps.splice(index, 1);

        result = await this.userService.update(resultUser);
        return result;
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteVersion(
    idmap: string,
    idversion: string,
    user: any,
  ): Promise<Map> {
    let map;
    let version;
    let index;
    try {
      if (
        (await this.checkMapUser(user.username, idmap)) &&
        (await this.checkVersionMap(idmap, idversion))
      ) {
        version = await this.versionService.deleteOne(idversion);
        map = await this.findOne(idmap);

        index = map.versions.indexOf(idversion);
        map.versions.splice(index, 1);

        if (map.versions.length != 0) {
          map.last_version = await this.versionService.findOne(
            map.versions[map.versions.length - 1],
          );
        } else {
          map.last_version = '';
        }

        map = await this.updateOne(map);
        return map;
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async checkMapUser(username: string, idmap: string) {
    let user;
    try {
      user = await this.userService.findOne(username);
      if (user.maps.includes(idmap)) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async checkVersionMap(idmap: string, idversion: string) {
    let map;
    try {
      map = await this.findOne(idmap);
      if (map.versions.includes(idversion)) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async exportMapToCmapatools(mapCmaps, user) {
    let userFind = await this.userService.findOne(user.username);
    let timeNow = Date.now();
    let xmltext = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xmltext +=
      '\t<cmap xmlns:dcterms="http://purl.org/dc/terms/" xmlns="http://cmap.ihmc.us/xml/cmap/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:vcard="http://www.w3.org/2001/vcard-rdf/3.0#">\n';
    xmltext += '\t\t<res-meta>\n';
    xmltext += '\t\t\t<dc:title>' + 'mapa' + '</dc:title>\n';
    xmltext += '\t\t\t<dc:description>' + 'questao' + '</dc:description>\n';
    xmltext += '\t\t\t<dc:creator>\n';

    xmltext +=
      '\t\t\t\t<vcard:FN>' +
      userFind.firstname +
      ' ' +
      userFind.surname +
      '</vcard:FN>\n';
    xmltext += '\t\t\t\t<vcard:EMAIL>' + userFind.email + '</vcard:EMAIL>\n';

    xmltext += '\t\t\t</dc:creator>\n';

    xmltext += '\t\t\t<dc:contributor>\n';

    xmltext +=
      '\t\t\t\t<vcard:FN>' +
      userFind.firstname +
      ' ' +
      userFind.surname +
      '</vcard:FN>\n';
    xmltext += '\t\t\t\t<vcard:EMAIL>' + userFind.email + '</vcard:EMAIL>\n';

    xmltext += '\t\t\t</dc:contributor>\n';

    xmltext += '\t\t\t<dcterms:rightsHolder>\n';

    xmltext +=
      '\t\t\t\t<vcard:FN>' +
      userFind.firstname +
      ' ' +
      userFind.surname +
      '</vcard:FN>\n';
    xmltext += '\t\t\t\t<vcard:EMAIL>' + userFind.email + '</vcard:EMAIL>\n';

    xmltext += '\t\t\t</dcterms:rightsHolder>\n';

    xmltext += '\t\t\t<dcterms:created>' + moment().format() + '</dcterms:created>\n';
    xmltext += '\t\t\t<dc:language>pt</dc:language>\n';
    xmltext += '\t\t\t<dc:format>x-cmap/x-storable</dc:format>\n';
    xmltext += '\t\t</res-meta>\n';

    xmltext += '\t\t<map>\n';
    xmltext += '\t\t\t<concept-list>\n';

    let mapJSON: any = JSON.stringify(mapCmaps);
    mapJSON = JSON.parse(mapJSON);
    let cont = 0;
    for (let i = 0; i < mapJSON.nodeDataArray.length; i++) {
      let oldKey = mapJSON.nodeDataArray[i].key;
      mapJSON.nodeDataArray[i].key = i + 10000;

      for (let i2 = 0; i2 < mapJSON.linkDataArray.length; i2++) {
        if (mapJSON.linkDataArray[i2].from === oldKey)
          mapJSON.linkDataArray[i2].from = i + 10000;

        if (mapJSON.linkDataArray[i2].to === oldKey)
          mapJSON.linkDataArray[i2].to = i + 10000;
      }

      xmltext +=
        '\t\t\t\t<concept id="' +
        (i + 10000) +
        '" label="' +
        mapJSON.nodeDataArray[i].text +
        '"/>\n';
      cont++;
    }

    xmltext += '\t\t\t</concept-list>\n';

    xmltext += '\t\t\t<linking-phrase-list>\n';

    for (let i = 0; i < mapJSON.linkDataArray.length; i++) {
      mapJSON.linkDataArray[i].id = cont;
      xmltext +=
        '\t\t\t\t<linking-phrase id="' +
        cont +
        '" label="' +
        mapJSON.linkDataArray[i].text +
        '"/>\n';
      cont++;
    }

    xmltext += '\t\t\t</linking-phrase-list>\n';

    xmltext += '\t\t\t<connection-list>\n';

    let linkId;
    for (let i = 0; i < mapJSON.linkDataArray.length; i++) {
      linkId = mapJSON.linkDataArray[i].id;
      xmltext +=
        '\t\t\t\t<connection id="' +
        cont +
        '" from-id="' +
        mapJSON.linkDataArray[i].from +
        '" to-id="' +
        linkId +
        '"/>\n';
      cont++;
      xmltext +=
        '\t\t\t\t<connection id="' +
        cont +
        '" from-id="' +
        linkId +
        '" to-id="' +
        mapJSON.linkDataArray[i].to +
        '"/>\n';
      cont++;
    }

    xmltext += '\t\t\t</connection-list>\n';

    let x = 0,
      y = 0,
      xMenor = 0,
      yMenor = 0,
      ajusteX = 50,
      ajusteY = 30;
    let arrXy: any = [];

    for (let i = 0; i < mapJSON.nodeDataArray.length; i++) {
      arrXy = mapJSON.nodeDataArray[i].loc.split(' ');
      x = parseInt(arrXy[0]);
      y = parseInt(arrXy[1]);
      if (xMenor > x) xMenor = x;

      if (yMenor > y) yMenor = y;
    }

    xmltext += '\t\t\t<concept-appearance-list>\n';

    for (let i = 0; i < mapJSON.nodeDataArray.length; i++) {
      arrXy = mapJSON.nodeDataArray[i].loc.split(' ');
      let newX = parseInt(arrXy[0]) + ajusteX + xMenor * -1;
      let newY = parseInt(arrXy[1]) + ajusteY + yMenor * -1;
      xmltext +=
        '\t\t\t\t<concept-appearance id="' +
        mapJSON.nodeDataArray[i].key +
        '" x="' +
        newX +
        '" y="' +
        newY +
        '"/>\n';
      mapJSON.nodeDataArray[i].loc = newX + ' ' + newY;
    }

    xmltext += '\t\t\t</concept-appearance-list>\n';

    xmltext += '\t\t\t<linking-phrase-appearance-list>\n';

    for (let i = 0; i < mapJSON.linkDataArray.length; i++) {
      let x1 = 0;
      let y1 = 0;
      let x2 = 0;
      let y2 = 0;

      let conc1 = mapJSON.linkDataArray[i].from;
      let conc2 = mapJSON.linkDataArray[i].to;

      let i2 = 0;
      while ((x1 === 0 || x2 === 0) && i2 < mapJSON.linkDataArray.length) {
        if (conc1 === mapJSON.nodeDataArray[i2].key) {
          arrXy = mapJSON.nodeDataArray[i2].loc.split(' ');
          x1 = parseInt(arrXy[0]);
          y1 = parseInt(arrXy[1]);
        }

        if (conc2 === mapJSON.nodeDataArray[i2].key) {
          arrXy = mapJSON.nodeDataArray[i2].loc.split(' ');
          x2 = parseInt(arrXy[0]);
          y2 = parseInt(arrXy[1]);
        }
        i2++;
      }

      let menorX = x1;
      if (x1 > x2) menorX = x2;

      let menorY = y1;
      if (y1 > y2) menorY = y2;

      x = Math.round(Math.abs((x1 - x2) / 2) + menorX);
      y = Math.round(Math.abs((y1 - y2) / 2) + menorY);

      xmltext +=
        '\t\t\t\t<linking-phrase-appearance id="' +
        mapJSON.linkDataArray[i].id +
        '" x="' +
        x +
        '" y="' +
        y +
        '"/>\n';
    }

    xmltext += '\t\t\t</linking-phrase-appearance-list>\n';

    xmltext += '\t\t\t<style-sheet-list>\n';
    xmltext += '\t\t\t\t<style-sheet id="_Default_">\n';
    xmltext += '\t\t\t\t\t<map-style background-color="255,255,255,0"/>\n';
    xmltext +=
      '\t\t\t\t\t<concept-style font-name="Verdana" font-size="12" font-style="plain" font-color="0,0,0,255" text-margin="4" background-color="237,244,246,255" background-image-style="full" border-color="0,0,0,255" border-style="solid" border-thickness="1" border-shape="rounded-rectangle" border-shape-rrarc="15.0" text-alignment="center" shadow-color="none" min-width="-1" min-height="-1" max-width="-1.0"/>\n';
    xmltext +=
      '\t\t\t\t\t<linking-phrase-style font-name="Verdana" font-size="12" font-style="plain" font-color="0,0,0,255" text-margin="1" background-color="0,0,255,0" background-image-style="full" border-color="0,0,0,0" border-style="solid" border-thickness="1" border-shape="rectangle" border-shape-rrarc="15.0" text-alignment="center" shadow-color="none"/>\n';
    xmltext +=
      '\t\t\t\t\t<connection-style color="0,0,0,255" style="solid" thickness="1" type="straight" arrowhead="if-to-concept-and-slopes-up"/>\n';
    xmltext +=
      '\t\t\t\t\t<resource-style font-name="SanSerif" font-size="12" font-style="plain" font-color="0,0,0,255" background-color="192,192,192,255"/>\n';
    xmltext += '\t\t\t\t</style-sheet>\n';
    xmltext += '\t\t\t\t<style-sheet id="_LatestChanges_">\n';
    xmltext += '\t\t\t\t\t<connection-style arrowhead="yes"/>\n';
    xmltext += '\t\t\t\t</style-sheet>\n';
    xmltext += '\t\t\t</style-sheet-list>\n';
    xmltext += '\t\t\t<extra-graphical-properties-list>\n';
    xmltext += '\t\t\t\t<properties-list id="1Q41DT8ZP-1HWYM8X-6G">\n';
    xmltext +=
      '\t\t\t\t\t<property key="StyleSheetGroup_0" value="//*@!#$%%^&amp;*()() No Grouped StyleSheets @"/>\n';
    xmltext += '\t\t\t\t</properties-list>\n';
    xmltext += '\t\t\t</extra-graphical-properties-list>\n';
    xmltext += '\t\t</map>\n';
    xmltext += '\t</cmap>\n';

    let retorno = { content: xmltext };
    console.log(xmltext);
    return retorno;
  }
}
