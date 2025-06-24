import { TestService } from './test.service';
export declare class TestController {
    private readonly testService;
    constructor(testService: TestService);
    create(): Promise<{
        success: boolean;
        id: string;
    }>;
}
