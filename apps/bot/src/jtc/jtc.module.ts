import { Module } from '@nestjs/common';
import { JtcService } from './jtc.service';

@Module({
  providers: [JtcService]
})
export class JtcModule {}
