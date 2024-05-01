import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

const GET_BOOK_DETAILS_URL = 'https://openlibrary.org/works/{:workId}.json';

@Injectable()
export class OpenLibraryClientService {
  constructor(private readonly httpService: HttpService) {}

  async getBookDetails(workId: string): Promise<any> {
    return lastValueFrom(
      this.httpService.get(GET_BOOK_DETAILS_URL.replace('{:workId}', workId)),
    );
  }
}
