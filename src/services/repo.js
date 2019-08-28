import request from '@utils/request'

/**
 * get repo list by query params
 */
export function searchRepoList (params) {
  return request('/search/repositories', { params })
}
