import { Test } from '@nestjs/testing';

import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import { SinonStub } from 'sinon';

import { ApiPostClientService } from '../lib/api-post-client.service';
import { PostApiResult } from '../lib/models/Post.api-result.model';
import { ApiReqModule, ApiReqService } from 'nst-demo-api-req-module';

chai.use(sinonChai);

const expect = chai.expect;
const mockUrl = 'https://mockUrl.com';

process.env.API_URL = mockUrl;

describe('ApiPostClientService', () => {
    const mockPosts = [
        {
            id: 1,
            userId: 2,
            title: 'this is the post heading',
            body: 'this is the body',
        },
    ];

    let service: ApiPostClientService;
    let reqService: ApiReqService;

    before(async () => {

        const module = await Test.createTestingModule({
            components: [
                ApiPostClientService,
            ],
            imports: [
                ApiReqModule,
            ],
        }).compile();

        service = module.get<ApiPostClientService>(ApiPostClientService);
        reqService = module.select<ApiReqModule>(ApiReqModule).get<ApiReqService>(ApiReqService);
    });

    describe('getPost method', () => {
        let result: PostApiResult;
        let reqServicestub: SinonStub;

        before(async () => {
            reqServicestub = sinon.stub(reqService, 'get').resolves(mockPosts[0]);

            result = await service.getPost(1);
        });

        after(() => {
            reqServicestub.restore();
        });

        it('should call requestService get method', () => {
            expect(reqServicestub).to.have.been.calledWith(`${mockUrl}/posts/1`);
        });

        it('should return an instance of PostApiResult', () => {
            expect(result).to.be.instanceof(PostApiResult);
        });

        it('should return the post', () => {
            expect(result).to.deep.equal(mockPosts[0]);
        });
    });

    describe('getAllPosts method', () => {
        let result: PostApiResult;
        let reqServicestub: SinonStub;

        before(async () => {
            reqServicestub = sinon.stub(reqService, 'get').resolves(mockPosts);

            result = await service.getAllPosts();
        });

        after(() => {
            reqServicestub.restore();
        });

        it('should call requestService get method', () => {
            expect(reqServicestub).to.have.been.calledWith(`${mockUrl}/posts`);
        });

        it('should return instances of PostApiResult as an array', () => {
            result.forEach((r) => expect(r).to.be.instanceof(PostApiResult));
        });

        it('should return the post', () => {
            expect(result);
            result.forEach((r, i) => expect(r).to.deep.equal(mockPosts[i]));
        });
    });
//
//         let result: any;
//         let params;
//         let superagentStub: SinonStub;
//
//         const mockUrl = 'http://mockUrl.com/';
//         const mockResult = {
//             result: 'OK',
//         };
//
//         describe('successful call', () => {
//
//             describe('without a query obj', () => {
//                 before(async () => {
//                     superagentStub = sinon.stub(superagent, 'get').returns({
//                         query: (p) => {
//                             params = p;
//                             return {
//                                 end: (callback) => callback(null, {
//                                     body: mockResult,
//                                 }),
//                             };
//                         },
//                     });
//
//                     result = await service.get(mockUrl);
//                 });
//
//                 after(() => {
//                     superagentStub.restore();
//                     result = undefined;
//                 });
//
//                 it('should call superagent get method', () => {
//                     expect(superagentStub).to.have.been.called;
//                 });
//
//                 it('should return a response', () => {
//                     expect(result).to.deep.equal(mockResult);
//                 });
//             });
//
//             describe('with a query obj', () => {
//                 const mockQueryObj = {
//                     key1: 'value1',
//                     key2: 'value2',
//                 };
//
//                 describe('without a query obj', () => {
//                     before(async () => {
//                         superagentStub = sinon.stub(superagent, 'get').returns({
//                             query: (p) => {
//                                 params = p;
//                                 return {
//                                     end: (callback) => callback(null, {
//                                         body: mockResult,
//                                     }),
//                                 };
//                             },
//                         });
//
//                         result = await service.get(mockUrl, mockQueryObj);
//                     });
//
//                     after(() => {
//                         superagentStub.restore();
//                         result = undefined;
//                     });
//
//                     it('should call superagent get method', () => {
//                         expect(superagentStub).to.have.been.called;
//                     });
//
//                     it('should return a response', () => {
//                         expect(result).to.deep.equal(mockResult);
//                     });
//                 });
//             });
//         });
//
//         describe('unsuccessful call', () => {
//
//             const mockError = new Error('mock error');
//             let error: Error;
//
//             before(async () => {
//                 superagentStub = sinon.stub(superagent, 'get').returns({
//                     query: (p) => {
//                         params = p;
//                         return {
//                             end: (callback) => callback(mockError),
//                         };
//                     },
//                 });
//
//                 try {
//                     result = await service.get(mockUrl);
//                 } catch (err) {
//                     error = err;
//                 }
//             });
//
//             after(() => {
//                 superagentStub.restore();
//                 result = undefined;
//             });
//
//             it('should call superagent get method', () => {
//                 expect(superagentStub).to.have.been.called;
//             });
//
//             it('should not return a result', () => {
//                 expect(result).to.be.undefined;
//             });
//
//             it('should return an error', () => {
//                 expect(result).to.be.undefined;
//                 expect(error).to.deep.equal(mockError);
//             });
//         });
//     });
});
