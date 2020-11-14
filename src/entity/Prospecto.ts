import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, OneToMany} from "typeorm";
import {IsNotEmpty} from 'class-validator';

//TODO NECESITA VALIDACION DE RFC

@Entity()
@Unique(['rfc'])
export class Prospecto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsNotEmpty()
    apellidop: string;

    @Column()
    apellidom: string;

    @Column()
    @IsNotEmpty()
    calle: string;

    @Column()
    @IsNotEmpty()
    numero: string;

    @Column()
    @IsNotEmpty()
    colonia: string;

    @Column()
    @IsNotEmpty()
    codigopostal: string;

    @Column()
    @IsNotEmpty()
    telefono: string;

    @Column()
    @IsNotEmpty()
    rfc: string;

    @Column()
    documento: string;

    @Column()
    @IsNotEmpty()
    estatus: string;

    @Column()
    observacion: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;


}
