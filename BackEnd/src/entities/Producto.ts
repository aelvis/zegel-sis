import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('productos')
export class Producto {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    nombre!: string;

    @Column({ type: 'text', nullable: false })
    descripcion!: string;

    @Column({ type: 'int', nullable: false })
    cantidad!: number;
}