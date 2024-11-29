import request from '@/utils/request'
import type { IRepo } from '@/types'

interface ISearchRepoResult {
  items: IRepo[]
  total_count: number
}

export function searchRepoList(params: Record<string, any>): Promise<ISearchRepoResult> {
  return request<ISearchRepoResult>('/search/repositories', { params })
}
