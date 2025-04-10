import { IStudent } from "./student";

export interface ICourses{
    id:string|null;
    nombre:string;
    estudiantes:IStudent[];
}