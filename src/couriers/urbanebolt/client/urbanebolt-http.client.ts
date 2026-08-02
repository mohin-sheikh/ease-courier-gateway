import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';

@Injectable()
export class UrbaneboltHttpClient {
    private readonly client: AxiosInstance;

    constructor(
        private readonly configService: ConfigService,
    ) {
        this.client = axios.create({
            baseURL: this.configService.getOrThrow<string>(
                'URBANEBOLT_BASE_URL',
            ),
            timeout: this.configService.get<number>(
                'URBANEBOLT_TIMEOUT',
                10000,
            ),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public get axios(): AxiosInstance {
        return this.client;
    }

    async get<T>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.client.get<T>(url, config);
    }

    async post<T>(
        url: string,
        body?: unknown,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.client.post<T>(
            url,
            body,
            config,
        );
    }
}