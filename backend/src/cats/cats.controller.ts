import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCat() {
    return this.catsService.getAllCat();
  }

  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe) id: number) {
    console.log(id, typeof id);

    return this.catsService.getOneCat();
  }
}
