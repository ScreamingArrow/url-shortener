import { NotFoundException } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { UrlRepository } from "@shared/repositories";
import { fakeUrl, UrlRepositoryMock } from "@shared/repositories/mocks/url.mock.repository";
import { RedirectUrlRequestDTO } from "../dtos/redirectUrlRequest.dto";
import { RedirectUrlService } from "../redirect.service";
import { MetricRepository } from "@shared/repositories/metric.repository";
import { MetricRepositoryMock } from "@shared/repositories/mocks/metric.mock.repository";

describe('RedirectUrlService', () => {
    let service: RedirectUrlService;
    let urlRepository: UrlRepository;
    let metricRepository: MetricRepository;
    let getByShortIdMock: jest.SpyInstance;
    let updateMetricMock: jest.SpyInstance;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RedirectUrlService,
                {
                    provide: UrlRepository,
                    useClass: UrlRepositoryMock,
                },
                {
                   provide: MetricRepository,
                   useFactory:MetricRepositoryMock,
                },
            ],
        }).compile();

        service = module.get<RedirectUrlService>(RedirectUrlService);
        urlRepository = module.get<UrlRepository>(UrlRepository);
        metricRepository = module.get<MetricRepository>(MetricRepository);

        getByShortIdMock = jest.spyOn(urlRepository, 'getByShortId');
        updateMetricMock = jest.spyOn(metricRepository, 'update');
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    it('should redirect a URL when it exists', async () => {
        const param: RedirectUrlRequestDTO = { shortId: fakeUrl.shortId };

        getByShortIdMock.mockResolvedValue(fakeUrl);
        updateMetricMock.mockResolvedValue(undefined);

        await service.execute(param);

        expect(getByShortIdMock).toHaveBeenCalledTimes(1);
        expect(getByShortIdMock).toHaveBeenCalledWith(param.shortId);
    });

    it('should throw NotFoundException if URL does not exist', async () => {
        const param: RedirectUrlRequestDTO = { shortId: fakeUrl.shortId };

        getByShortIdMock.mockResolvedValue(undefined);

        await expect(service.execute(param)).rejects.toThrow(NotFoundException);

        expect(getByShortIdMock).toHaveBeenCalledTimes(1);
    });
});