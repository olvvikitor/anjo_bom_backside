export type SearchImput={
  page?:number
  perPage?: number
  sort?: string | null
  sortDir?: string | null
  filter: string | null
}
export type SearchOutPut<Model>= {
  items: Model[],
  perPage: number
  total:number
  currentPage:number
  sort: string| null
  sortDir: string| null
  filter: string | null
}

export interface IRepositoryInterface<Model, CreateProps>{
  create(props: CreateProps): Model
  insert(model: Model): Promise<Model>
  findById(id: string): Model
  update(model:Model): Promise<Model>
  delete(id:string): Promise<void>
  search(props: SearchImput): Promise<SearchOutPut<Model>>
}