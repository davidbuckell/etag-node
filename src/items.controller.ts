import { Controller, Get, Param, Req, Res, NotFoundException } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Get(':id')
  getItem(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    const item = this.itemsService.findOne(Number(id));
    if (!item) throw new NotFoundException();

    const etag = this.itemsService.computeETag(item);
    const ifNoneMatch = req.headers['if-none-match'];

    if (ifNoneMatch === etag) {
      return res.status(304).end(); // no body
    }

    res.setHeader('ETag', etag);
    return res.status(200).json({ ...item, etag }); // include body
  }
}
