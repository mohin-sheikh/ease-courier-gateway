import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class UrbaneboltHttpClient {
    private readonly client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: process.env.URBANEBOLT_BASE_URL,
            timeout: Number(process.env.URBANEBOLT_TIMEOUT),
        });
    }

    async post<T>(
        url: string,
        body: unknown,
        token?: string,
    ): Promise<T> {
        const response = await this.client.post<T>(
            url,
            body,
            {
                headers: token
                    ? {
                        Authorization: `Bearer ${token}`,
                    }
                    : {},
            },
        );

        return response.data;
    }
}