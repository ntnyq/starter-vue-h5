<template>
  <div class="home">
    <h1 class="title">
      GitHub Stars Rank
    </h1>
    <van-search
      @search="onSearch"
      v-model="params.q"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
    >
      <span
        @click="onSearch"
        slot="action"
      >搜索</span>
    </van-search>
    <div class="cnt-wrap">
      <van-list
        v-model="isLoading"
        :finished="isFinished"
        @load="fetchData"
      >
        <div
          v-for="item in list"
          :title="item.name"
          :key="item.id"
          class="list-item"
        >
          <div class="list-item-header">
            <h3 class="list-item-title">
              {{ item.name }}
            </h3>
            <span class="list-item-update-time">
              <van-icon name="calender-o" />
              <span>{{ item.updated_at | formatTime('MM/dd hh:mm') }}</span>
            </span>
          </div>
          <p class="list-item-description">
            {{ item.description }}
          </p>
          <div class="list-item-action">
            <div class="action-item">
              <van-icon name="eye-o" />
              <span class="action-item-num">
                {{ item.watchers_count | formatNumber }}
              </span>
            </div>
            <div class="action-item">
              <van-icon name="star-o" />
              <span class="action-item-num">
                {{ item.stargazers_count | formatNumber }}
              </span>
            </div>
            <div class="action-item">
              <van-icon name="cluster-o" />
              <span class="action-item-num">
                {{ item.forks_count | formatNumber }}
              </span>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import {
  searchRepoList,
} from '@services/repo'

export default {
  name: 'Home',

  data () {
    return {
      isLoading: false,
      isFinished: false,
      params: {
        q: 'javascript',
        sort: 'stars',
        per_page: 20,
        page: 1,
      },
      list: [],
    }
  },

  methods: {
    onSearch () {
      if (!this.params.q) {
        this.$notify({ type: 'warning', message: 'Empty search word' })
        return
      }

      this.params.page = 1
      this.list = []
      this.fetchData()
    },

    async fetchData () {
      this.isLoading = true

      // eslint-disable-next-line camelcase
      const { items = [], total_count } = await searchRepoList(this.params)

      this.list.push(...items)

      this.params.page++
      this.isLoading = false

      // eslint-disable-next-line camelcase
      if (this.params.page * this.params.per_page >= total_count) {
        this.isFinished = true
      }
    },
  },
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
