import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OpenLibraryClientService {
  constructor(private readonly httpService: HttpService) {}

  async getBookDetails(workId: string): Promise<any> {}
}
