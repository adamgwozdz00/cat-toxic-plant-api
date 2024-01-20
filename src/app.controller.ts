import { Controller, Get, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { createReadStream } from 'fs';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @ApiExcludeEndpoint()
  @Get('/swaggerImg')
  async getSwaggerImage() {
    const file = createReadStream('logo.png');
    return new StreamableFile(file);
  }
}
