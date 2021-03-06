<template>
  <div class="home">
    <h1 class="title">
      GitHub Stars Rank
    </h1>
    <VanSearch
      @search="handleSearch"
      v-model="listQuery.q"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
    >
      <template #action>
        <span @click="handleSearch">搜索</span>
      </template>
    </VanSearch>
    <div class="cnt-wrap">
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
          class="list-item"
        >
          <div class="list-item-header">
            <h3 class="list-item-title">
              {{ item.name }}
            </h3>
            <span class="list-item-update-time">
              <VanIcon name="calender-o" />
              <span>{{ item.updated_at }}</span>
            </span>
          </div>
          <p class="list-item-description">
            {{ item.description }}
          </p>
          <div class="list-item-action">
            <div class="action-item">
              <VanIcon name="eye-o" />
              <span class="action-item-num">
                {{ item.watchers_count }}
              </span>
            </div>
            <div class="action-item">
              <VanIcon name="star-o" />
              <span class="action-item-num">
                {{ item.stargazers_count }}
              </span>
            </div>
            <div class="action-item">
              <VanIcon name="cluster-o" />
              <span class="action-item-num">
                {{ item.forks_count }}
              </span>
            </div>
          </div>
        </div>
      </VanList>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { showNotify } from 'vant'
import { searchRepoList } from '@/services/repo'
import type { IRepo } from '@/types'

defineOptions({
  name: 'Home',
})

const isLoading = ref(false)
const isFinished = ref(false)
const listQuery = reactive({
  q: 'javascript',
  sort: 'stars',
  per_page: 20,
  page: 1,
})
const list = ref<IRepo[]>([])

const fetchData = async () => {
  isLoading.value = true

  const {
    items = [],
    // eslint-disable-next-line camelcase
    total_count,
  } = await searchRepoList(listQuery)

  list.value.push(...items)

  listQuery.page++
  isLoading.value = false

  // eslint-disable-next-line camelcase
  if (listQuery.page * listQuery.per_page >= total_count) {
    isFinished.value = true
  }
}
const handleSearch = () => {
  if (!listQuery.q) {
    showNotify({ type: 'warning', message: '请输入关键词后搜索' })
    return
  }

  listQuery.page = 1
  list.value = []
  fetchData()
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;

  .title {
    padding: 20px 30px 0;
    text-align: center;
    font-size: 40px;
    color: #666;
  }

  .cnt-wrap {
    position: relative;
    z-index: 233;
    flex: 1 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .list-item {
    padding: 24px 0;
    margin: 0 24px;
    border-bottom: 1px solid #efefef;
    font-size: 28px;

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    &-title {
      flex: 1 0;
      margin-right: 40px;
      font-size: 32px;
      color: #333;
      @include ellipsis;
    }

    &-update-time {
      display: inline-flex;
      align-items: center;
      white-space: nowrap;
      font-size: 24px;
      color: #666;

      .van-icon {
        margin-right: 10px;
        font-size: 32px;
      }
    }

    &-description {
      margin-bottom: 20px;
      word-break: break-all;
      text-align: justify;
      color: #999;
    }

    &-action {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .action-item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1 0;
        font-size: 24px;
        color: #666;

        .van-icon {
          margin-right: 20px;
          font-size: 28px;
        }
      }
    }

    &:last-of-type {
      border-bottom: none;
    }
  }
}
</style>
