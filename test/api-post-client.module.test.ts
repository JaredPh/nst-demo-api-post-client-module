import { Test } from '@nestjs/testing';

import * as chai from 'chai';

import { ApiPostClientModule } from '../lib/api-post-client.module';
import { ApiPostClientService } from '../lib/api-post-client.service';
import { Controller } from '@nestjs/common';

const expect = chai.expect;

@Controller()
class MockController {

    constructor(
        private apiReqService: ApiPostClientService,
    ) {}
}

describe('ApiPostClientModule', () => {

    it('should export ApiPostClientService', async () => {
        const module = await Test.createTestingModule({
            controllers: [
                MockController,
            ],
            imports: [
                ApiPostClientModule,
            ],
        }).compile();

        const mockController = await module.get<MockController>(MockController);

        expect(mockController).to.have.key('apiReqService');
        expect(mockController.apiReqService).to.be.instanceof(ApiPostClientService);
    });
});
