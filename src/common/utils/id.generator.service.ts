import { Injectable } from '@nestjs/common';

@Injectable()
export class IdGeneratorService {
  private counter = 1;

  getNextId(): number {
    return this.counter++;
  }
}