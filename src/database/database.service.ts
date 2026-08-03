import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(private readonly dataSource: DataSource) {}

  onModuleInit(): void {
    if (this.dataSource.isInitialized) {
      this.logger.log('PostgreSQL database connected successfully.');
      const database = String(this.dataSource.options.database ?? '');

      this.logger.log(`Database: ${database}`);
    }
  }
}
