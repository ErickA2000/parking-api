/**
 * @description I Data de entrada al crear, IU data de entrada al actualizar y O data de salida, OFind data de salida para los métodos find
 */
export interface BaseRepository<I, IU, O, OFind> {
  findAll(): Promise<OFind[]>;
  findById(id: string): Promise<OFind | null>;
  create(data: I): Promise<O>;
  update(id: string, data: IU): Promise<O>;
  delete(id: string): Promise<O>;
}
