import { IsEnum } from 'class-validator';
import { StatsTypeEnum } from '../../commons/enums/stats-type.enum';

export class StatsQueryDto {
    hashtag: string;
    @IsEnum(StatsTypeEnum)
    type: string;
    start: string;
    end: string;
    value: string;
}
