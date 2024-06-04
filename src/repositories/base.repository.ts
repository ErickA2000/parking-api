/**
 * @description I Data de entrada al crear, IU data de entrada al actualizar y O data de salida
 */
export interface BaseRepository<I, IU, O> {
  findAll(): Promise<O[]>;
  findById(id: string): Promise<O | null>;
  create(data: I): Promise<O>;
  update(id: string, data: IU): Promise<O>;
  delete(id: string): Promise<O>;
}
