import { TurmaDTO } from "./turma.dto";

export interface TurmAlunDTO {
    codTurmAlun: string;
    nomeAluno: string;
    turma: TurmaDTO;
}