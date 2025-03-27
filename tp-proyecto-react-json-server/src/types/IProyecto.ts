import { IMiembro } from "./IMiembro";

export interface IProyecto{
    id?: string;
    nombre:string;
    descripcion: string;
    fechaInicio: string;
    fechaFin: string;
    miembros: IMiembro[];
}