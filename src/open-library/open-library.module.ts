import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OpenLibraryClientService } from './open-library-client.service';

@Module({
  imports: [HttpModule],
  providers: [OpenLibraryClientService],
  exports: [OpenLibraryClientService],
})
export class OpenLibraryModule {}
