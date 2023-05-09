<template>
  <div class="m-user-profile">
    <div class="profile">
      <img v-if="!hasCookie" src="@/assets/userProfile.png" alt=""/>
      <img v-if="hasCookie" :src="loginUser?.avatarUrl" :alt="loginUser?.nickname">
    </div>
    <div v-if="!hasCookie" class="login-please" @click.stop="handlerShowLogin">
      请登录
    </div>
    <div v-if="hasCookie" @click.stop="handlerShowUserControl">
      {{ loginUser?.nickname }}
    </div>
    <div class="icon">
      <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           width="14" height="14" fill="currentColor">
        <path d="M941.808046 195.931415 512 828.068585 82.191954 195.931415Z"></path>
      </svg>
    </div>
    <m-user-control v-model:show="userControlShow"/>
  </div>
  <m-login-modal v-model:show="loginShow"/>
</template>

<script lang="ts" setup>
import MLoginModal from '@/components/user/MLoginModal.vue'
import MUserControl from '@/components/user/MUserControl.vue'
import {computed, ComputedRef, ref, Ref, watchPostEffect} from 'vue'
import {getCookieStore, getUserStore} from '@/store'
import {UserInfo} from '@/types'


const loginShow: Ref<boolean> = ref(false)
const userControlShow: Ref<boolean> = ref(false)


function handlerShowLogin() {
  loginShow.value = true
}

function handlerShowUserControl() {
  userControlShow.value = !userControlShow.value
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
  font-size: 12px;
  position: relative;

  & > div:not(.m-user-control) {
    cursor: pointer;
  }

  & > div:not(.m-user-control):hover {
    color: white;
  }

  svg.icon {
    position: relative;
    top: -2px;
  }

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
