<template>
  <div class="m-user-profile">
    <div class="profile">
      <img v-if="!hasCookie" src="@/assets/userProfile.png" alt=""/>
      <img v-if="hasCookie" :src="loginUser?.avatarUrl" :alt="loginUser?.nickname">
    </div>
    <div v-if="!cookieStore.hasCookie" class="login-please" @click.stop="handlerShowLogin">
      请登录
    </div>
    <div v-if="cookieStore.hasCookie">
      {{ loginUser?.nickname }}
    </div>
    <div class="icon">
      <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           width="14" height="14" fill="currentColor">
        <path d="M941.808046 195.931415 512 828.068585 82.191954 195.931415Z"></path>
      </svg>
    </div>
  </div>
  <m-login-modal v-model:show="show"/>
</template>

<script lang="ts" setup>
import MLoginModal from '@/components/user/MLoginModal.vue'
import {computed, ComputedRef, ref, Ref, watchPostEffect} from 'vue'
import {getCookieStore, getUserStore} from '@/store'
import {UserInfo} from '@/types'


const show: Ref<boolean> = ref(false)

function handlerShowLogin() {
  show.value = true
}

const cookieStore = getCookieStore()
const userStore = getUserStore()

const loginUser: ComputedRef<UserInfo | undefined> = computed(() => userStore.getLoginUser)
const hasCookie: ComputedRef<boolean> = computed(() => cookieStore.hasCookie)

watchPostEffect(() => {
  const hasCookie = cookieStore.hasCookie
  console.log(hasCookie)
  if (hasCookie) {
    userStore.fetchUserInfo()
  }
})

</script>

<style lang="less" scoped>
.m-user-profile {
  display: flex;
  align-items: center;
  word-break: keep-all;
  font-size: 14px;

  & > div:not(:first-child) {
    margin-left: 5px;
  }

  .profile {
    width: 30px;
    height: 30px;
    background-color: rgb(244, 244, 244);
    border-radius: 50%;
    box-sizing: border-box;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
