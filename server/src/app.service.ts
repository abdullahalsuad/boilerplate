import { Injectable } from '@nestjs/common';
import * as os from 'os';

@Injectable()
export class AppService {
  getHello() {
    return {
      success: true,
      message: 'Welcome to MyRizq API',
      api_documentation: 'http://localhost:8000/docs',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
      host: os.hostname(),
    };
  }
}
