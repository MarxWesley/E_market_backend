import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('App')
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({status: 200, description: 'Hello World Padrão.'})
  getHello(): string {
    return this.appService.getHello();
  }
}
