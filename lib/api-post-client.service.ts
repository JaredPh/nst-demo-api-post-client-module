import { Component } from '@nestjs/common';
import { ApiReqService } from 'nst-demo-api-req-module';
import { PostApiResult } from './models/Post.api-result.model';

@Component()
export class ApiPostClientService {

    constructor(
        private requestService: ApiReqService,
    ) {}

    public async getPost(id: number): Promise<PostApiResult> {
        const result: any[] = await this.requestService.get(`${process.env.API_URL}/posts/${id}`);
        return new PostApiResult(result);
    }

    public async getAllPosts(): Promise<PostApiResult[]> {
        const result: any[] = await this.requestService.get(`${process.env.API_URL}/posts`);
        return result.map(p => new PostApiResult(p));
    }
}
