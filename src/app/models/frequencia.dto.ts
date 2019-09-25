import { FrequenciaAulaDTO } from './frequencia-aula.dto';

export interface FrequenciaDTO {
    disciplina: string;
    totalAulas: number;
    totalFaltas: number;
    listFreq: FrequenciaAulaDTO[];
}