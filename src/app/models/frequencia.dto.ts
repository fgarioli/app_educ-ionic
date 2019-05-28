import { FrequenciaAulaDTO } from './frequencia-aula.dto';

export interface FrequenciaDTO {
    disciplina: string;
    totalAulas: string;
    totalFaltas: string;
    listFreq: FrequenciaAulaDTO[];
}