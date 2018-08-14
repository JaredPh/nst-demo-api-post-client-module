import { Component } from '@nestjs/common';
import { ApiReqService } from 'nst-demo-api-req-module';
import { PostApiResult } from './models/Post.api-result.model';

@Component()
export class ApiPostClientService {

    private baseUrl = 'https://jsonplaceholder.typicode.com/posts';

    constructor(
        private requestService: ApiReqService,
    ) {}

    public async getPost(id: number): Promise<PostApiResult> {
        const result: any[] = await this.requestService.get(`${this.baseUrl}/${id}`);
        return new PostApiResult(result);
    }

    public async getAllPosts(): Promise<PostApiResult[]> {
        const result: any[] = await this.requestService.get(this.baseUrl);
        return result.map(p => new PostApiResult(p));
    }
}
