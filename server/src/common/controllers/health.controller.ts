import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  PrismaHealthIndicator,
  HealthCheck,
  HealthCheckResult,
} from '@nestjs/terminus';
import { PrismaService } from '../../prisma/prisma.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('System')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: PrismaHealthIndicator,
    private prisma: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Check API and Database status' })
  async check(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.db.pingCheck('database', this.prisma),
    ]);
  }
}
