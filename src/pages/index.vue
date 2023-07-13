<script lang="ts" setup>
import { showNotify } from 'vant'
import { searchRepoList } from '@/services/repo'
import { formatTime } from '@/utils'
import type { IRepo } from '@/types'

const isLoading = ref(false)
const isFinished = ref(false)
const listQuery = ref({
  q: 'javascript',
  sort: 'stars',
  per_page: 20,
  page: 1,
})
const list = ref<IRepo[]>([])

const fetchData = async () => {
  isLoading.value = true

  const { items = [], total_count: totalCount } = await searchRepoList(
    listQuery.value,
  )

  list.value.push(...items)

  listQuery.value.page++
  isLoading.value = false

  if (listQuery.value.page * listQuery.value.per_page >= totalCount) {
    isFinished.value = true
  }
}
const handleSearch = () => {
  if (!listQuery.value.q) {
    showNotify({ type: 'warning', message: '请输入关键词后搜索' })
    return
  }

  listQuery.value.page = 1
  list.value = []
  fetchData()
}
</script>

<template>
  <div class="flex flex-col h-screen relative">
    <h1 class="text-3xl font-semibold p-6 text-center">GitHub Stars Rank</h1>
    <VanSearch
      @search="handleSearch"
      v-model="listQuery.q"
      placeholder="请输入搜索关键词"
      shape="round"
      show-action
    >
      <template #action>
        <span @click="handleSearch">搜索</span>
      </template>
    </VanSearch>
    <div class="flex-1 min-h-0 of-y-auto">
      <VanList
        @load="fetchData"
        v-model:loading="isLoading"
        :finished="isFinished"
        finished-text="no more data"
      >
        <div
          v-for="item in list"
          :key="item.node_id"
          :title="item.name"
          class="text-lg mx-2 my-3 p-4 flex flex-col gap-3 shadow"
        >
          <div
            class="flex flex-col gap-2 items-start justify-between md:flex-row md:items-center"
          >
            <h3 class="text-xl font-semibold truncate">
              {{ item.name }}
            </h3>
            <span class="op-80">
              <VanIcon name="calender-o" />
              <span>{{ formatTime(item.updated_at) }}</span>
            </span>
          </div>
          <p class="op-70">
            {{ item.description }}
          </p>
          <div class="flex items-center justify-between">
            <div class="p-2 flex gap-2 items-center">
              <VanIcon name="eye-o" />
              <span class="op-75">
                {{ item.watchers_count }}
              </span>
            </div>
            <div class="p-2 flex gap-2 items-center">
              <VanIcon name="star-o" />
              <span class="op-75">
                {{ item.stargazers_count }}
              </span>
            </div>
            <div class="p-2 flex gap-2 items-center">
              <VanIcon name="cluster-o" />
              <span class="op-75">
                {{ item.forks_count }}
              </span>
            </div>
          </div>
        </div>
      </VanList>
    </div>
  </div>
</template>
