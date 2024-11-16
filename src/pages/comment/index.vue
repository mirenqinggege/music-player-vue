<script setup lang="ts">
import {computed, reactive, shallowRef, watchPostEffect} from "vue";
import {Comments, PageParams} from "@/types";
import {getPlayerStore} from "@/store";
import {getCommentList, likeComment, unlikeComment} from "@/api/comment.ts";
import MPagination from "@/components/pagination/MPagination.vue";

const playerStore = getPlayerStore();

const commentList = shallowRef<Array<Partial<Comments>>>([])
const hotCommentList = shallowRef<Array<Partial<Comments>>>([])
const totalComment = shallowRef(0)
const pageParams = reactive<PageParams>({pageSize: 10, pageNum: 1})
const allComments = computed(() => {
  const hotList = hotCommentList.value
  const list = commentList.value
  return [
    {
      label: '最热评论',
      list: hotList,
      empty: hotList.length === 0,
      total: hotList.length
    },
    {
      label: '全部评论',
      list: list,
      empty: list.length === 0,
      total: totalComment.value
    }
  ].filter(v => !v.empty)
})

function loadComment() {
  const id = playerStore.getSongInfo.id;
  if (id) {
    getCommentList(id, pageParams)
        .then((data) => {
          commentList.value = data.comments
          if (data.hotComments) {
            hotCommentList.value = data.hotComments
          }
          totalComment.value = data.total
        })
  }
}

function handleLikeComment(commentId: number, flag: boolean) {
  const id = playerStore.getSongInfo.id;
  if (id) {
    const result = flag ? unlikeComment(commentId, id) : likeComment(commentId, id)
    result.then(loadComment)
  }
}

watchPostEffect(() => {
  const songInfo = playerStore.getSongInfo;
  if (songInfo.id) {
    (async () => 1)()
        .then(i => pageParams.pageNum = i)
        .then(loadComment)
  }
})
</script>

<template>
  <div class="comment">
    <template v-for="listItem in allComments" :key="listItem.label">
      <h5>{{ listItem.label }}({{ listItem.total }})</h5>
      <ul>
        <li v-for="item in listItem.list" :key="item.commentId">
          <div class="avatar">
            <img :src="item.user.avatarUrl" alt="">
          </div>
          <div class="flex-fill">
            <a href="javascript: void 0">{{ item.user.nickname }}</a>:
            {{ item.content }}
            <div class="replied" v-if="item.beReplied.length > 0">
              <a href="javascript: void 0">@{{ item.beReplied[0].user.nickname }}</a>:
              {{ item.beReplied[0].content }}
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <small>{{ item.timeStr }}</small>
              <div>
                <a @click="handleLikeComment(item.commentId, item.liked)"
                   href="javascript: void 0">{{ item.liked ? '已赞' : '点赞' }}({{ item.likedCount }})</a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </template>
    <m-pagination @change="loadComment()" v-model:page-num="pageParams.pageNum" :page-size="pageParams.pageSize"
                  :total="totalComment"/>
  </div>
</template>

<style scoped lang="less">
.comment {
  font-size: 12px;
  padding-inline: 30px;
  width: 700px;
  margin-bottom: 20px;

  ul {
    list-style: none;
    padding-inline: 20px;

    li {
      align-items: center;
      display: flex;
      gap: 20px;
      margin-block: 20px;
      background-color: #FFFFFD;
      position: relative;

      a {
        text-decoration: unset;
      }

      &:after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        height: 1px;
        width: 100%;
        background-color: #f8f4f3;
      }

      &:first-child {
        flex-shrink: 0;
      }

      p {
        text-indent: 2em;
      }

      .avatar img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
      }

      .replied {
        background-color: #F5F5F3;
        padding: 6px;
        border-radius: 6px;
        margin-block: 4px;
        color: #898987;
      }
    }
  }
}
</style>