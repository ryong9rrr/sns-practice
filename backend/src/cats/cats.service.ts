import { Injectable } from '@nestjs/common';

type Cat = {
  id: number;
  name: string;
};

@Injectable()
export class CatsService {
  getAllCat() {
    return [
      {
        id: 1,
        name: 'imcat',
      } as Cat,
    ];
  }

  getOneCat() {
    return {
      id: 1,
      name: 'imcat',
    } as Cat;
  }
}
