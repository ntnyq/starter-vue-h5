import type { IRepo } from '@/types'
import request from '@/utils/request'

interface ISearchRepoResult {
  items: IRepo[]
  total_count: number
}

export function searchRepoList(params: any): Promise<ISearchRepoResult> {
  return request('/search/repositories', { params }) as any
}
