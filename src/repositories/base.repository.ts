/**
 * @description I Data de entrada y O data de salida
 */
export interface BaseRepository<I, O> {
  findAll(): Promise<O[]>;
  findById(id: string): Promise<O | null>;
  create(data: I): Promise<O>;
  update(id: string, data: I): Promise<O>;
  delete(id: string): Promise<O>;
}
