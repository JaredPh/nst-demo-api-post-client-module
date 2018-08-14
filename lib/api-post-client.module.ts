import { Module } from '@nestjs/common';
import { ApiReqModule } from 'nst-demo-api-req-module';
import { ApiPostClientService } from './api-post-client.service';

@Module({
    components: [
        ApiPostClientService,
    ],
    imports: [
        ApiReqModule,
    ],
    exports: [
        ApiPostClientService,
    ],
})
export class ApiPostClientModule {}
