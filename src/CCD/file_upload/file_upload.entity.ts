import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class File_Upload {
    @PrimaryGeneratedColumn('uuid')
    file_id: string;

    @Column()
    filename: string;

    @Column()
    path: string;

    @Column()
    file_type: string;

    @Column({ nullable: true})
    size: number;

}