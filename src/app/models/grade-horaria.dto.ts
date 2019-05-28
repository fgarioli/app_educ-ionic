import { TempoDTO } from "./tempo.dto";
import { DiaSemanaDTO } from "./dia-semana.dto";

export interface GradeHorariaDTO {
    // turma: TurmaDTO;
    diasSemana: DiaSemanaDTO[];
    tempos: TempoDTO[];
}