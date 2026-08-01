import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class UrbaneboltApiClient {
    private readonly client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: process.env.URBANEBOLT_BASE_URL,
            timeout: Number(process.env.URBANEBOLT_TIMEOUT ?? 10000),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    get axios(): AxiosInstance {
        return this.client;
    }
}