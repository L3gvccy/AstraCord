import { Module } from '@nestjs/common';
import { JtcService } from './jtc.service';
import { JtcController } from './jtc.controller';

@Module({
  controllers: [JtcController],
  providers: [JtcService],
})
export class JtcModule {}
