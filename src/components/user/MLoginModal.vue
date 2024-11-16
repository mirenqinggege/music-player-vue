<template>
  <div v-if="show" class="m-login-modal">
    <div v-if="qrcodeLogin" class="body">
      <div class="top">
        <span @click="handlerClose">
        <svg class="icon" fill="currentColor" height="32" version="1.1" viewBox="0 0 1024 1024"
             width="32" xmlns="http://www.w3.org/2000/svg">
          <path d="M512 1255.489906"></path>
          <path
              d="M718.519288 688.227064 543.827304 513.637418l174.180292-174.180292c8.801119-8.801119 8.801119-23.128523 0-31.827304-8.801119-8.801119-23.128523-8.801119-31.827304 0L512 481.810114 337.819708 307.629822c-8.801119-8.801119-23.230861-8.596442-31.929642 0.102339l0.102339-0.102339c-8.801119 8.801119-8.698781 23.026184 0.102339 31.827304l174.180292 174.180292L305.58305 688.227064c-8.801119 8.801119-8.801119 23.128523 0 31.827304 8.801119 8.801119 23.128523 8.801119 31.827304 0L512 545.464721 686.691985 720.054367c8.801119 8.801119 22.923846 8.903458 31.724965 0.102339l0.102339-0.102339C727.218069 711.355587 727.218069 697.028183 718.519288 688.227064z"></path>
        </svg>
        </span>
      </div>
      <div class="center">
        <div class="text-center title">
          扫码登录
        </div>
        <div class="qrcode">
          <img v-if="qrcode" :src="qrcode" alt=""/>
          <div v-if="authorizing" class="shadow d-flex justify-content-center align-items-center">
            扫描成功
          </div>
        </div>
        <div class="other" @click="handlerPhoneLogin">
          选择其他登录模式 >
        </div>
      </div>
    </div>
    <div v-else class="body">
      <div class="top">
        <span @click="handlerClose">
        <svg class="icon" fill="currentColor" height="32" version="1.1" viewBox="0 0 1024 1024"
             width="32" xmlns="http://www.w3.org/2000/svg">
          <path d="M512 1255.489906"></path>
          <path
              d="M718.519288 688.227064 543.827304 513.637418l174.180292-174.180292c8.801119-8.801119 8.801119-23.128523 0-31.827304-8.801119-8.801119-23.128523-8.801119-31.827304 0L512 481.810114 337.819708 307.629822c-8.801119-8.801119-23.230861-8.596442-31.929642 0.102339l0.102339-0.102339c-8.801119 8.801119-8.698781 23.026184 0.102339 31.827304l174.180292 174.180292L305.58305 688.227064c-8.801119 8.801119-8.801119 23.128523 0 31.827304 8.801119 8.801119 23.128523 8.801119 31.827304 0L512 545.464721 686.691985 720.054367c8.801119 8.801119 22.923846 8.903458 31.724965 0.102339l0.102339-0.102339C727.218069 711.355587 727.218069 697.028183 718.519288 688.227064z"></path>
        </svg>
        </span>
      </div>
      <div class="center">
        <div class="text-center title">
          密码登录
        </div>
        <div class="login-form">
          <div id="phone" class="m-input-group">
            <input v-model="loginFormInstance.countrycode" readonly/>
            <input v-model="loginFormInstance.phone" placeholder="请输入手机号"/>
          </div>
          <div class="m-input-group">
            <input v-model="loginFormInstance.password" placeholder="请输入密码" type="password"/>
          </div>
          <div class="submit text-center" @click="doLogin">
            登&nbsp;&nbsp;&nbsp;录
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref, Ref, watchPostEffect} from 'vue'
import {checkQr, getQrcodeKey, getQrcodeUrl} from '@/api/login'
import {getCookieStore, getMySongListStore, getRecommendSongListStore, getRecommendStore} from '@/store'
import {UnwrapNestedRefs} from '@vue/reactivity'

const qrcodeLogin: Ref<boolean> = ref(true)

interface LoginForm {
  phone: string
  countrycode: string
  captcha?: string
  password?: string
  rememberLogin: string
}

const loginFormInstance: UnwrapNestedRefs<LoginForm> = reactive({
  phone: '',
  countrycode: '86',
  rememberLogin: 'true'
})

const cookieStore = getCookieStore()
const mySongListStore = getMySongListStore();
const recommendSongListStore = getRecommendSongListStore();
const recommendStore = getRecommendStore();

interface Props {
  show: boolean
}

const props = defineProps<Props>()

interface Emits {
  (event: 'update:show', value: boolean): void

  (event: 'loginSuccess'): void

  (event: 'close'): boolean | undefined
}

const emits = defineEmits<Emits>()

function handlerClose() {
  const closeable = emits('close')
  if (closeable === false) {
    return
  }
  clearInterval(interval)
  emits('update:show', false)
}

const qrcode: Ref<string> = ref('')
const authorizing: Ref<boolean> = ref(false)
let interval: NodeJS.Timer | undefined

watchPostEffect(() => {
  const hasCookie = cookieStore.hasCookie
  if (props.show && qrcodeLogin.value && !hasCookie) {
    getQrcodeKey()
        .then(({unikey}) => {
          if (interval !== undefined) {
            clearInterval(interval)
            interval = undefined
          }
          interval = setInterval(() => {
            checkQr(unikey).then((data) => {
              clearInterval(interval)
              interval = undefined
              cookieStore.setCookie(data.cookie)
              mySongListStore.fetchMySongList()
                  .catch(() => mySongListStore.fetchMySongList())
                  .catch(() => mySongListStore.fetchMySongList())
                  .catch(() => mySongListStore.fetchMySongList())
              recommendSongListStore.fetchRecommendSongList()
              recommendStore.fetchSongList()
              alert("登陆成功")
              handlerClose()
            }).catch(({code, message}) => {
              console.log(code, message)
              if (code === 802) {
                // 授权中
                authorizing.value = true
              }
            })
          }, 1000)
          return getQrcodeUrl(unikey)
        })
        .then((imgUrl) => {
          qrcode.value = imgUrl
        })
        .catch((err) => {
          clearInterval(interval)
          interval = undefined
          console.log(err)
        })
  }
})

function handlerPhoneLogin() {
  if (interval) {
    clearInterval(interval)
    interval = undefined
  }
  qrcodeLogin.value = false
}

function doLogin() {

}
</script>

<style lang="less" scoped>
.m-login-modal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  color: rgb(120, 120, 120);

  .body {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 350px;
    height: 530px;
    background-color: white;
    box-shadow: 0 0 5px #aaa;

    .top {
      display: flex;
      justify-content: flex-end;
    }

    .center {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .title {
      margin: 40px 0 20px;
      font-size: 28px;
      color: black;
    }

    .qrcode {
      position: relative;
      width: 182px;
      height: 182px;
      margin-bottom: 100px;

      img {
        width: 100%;
        height: 100%;
      }

      .shadow {
        background-color: rgba(0, 0, 0, 0.7);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        font-size: 36px;
        color: white;
      }
    }

    .other {
      cursor: pointer;
      font-size: 12px;
      color: rgb(102, 102, 102);
    }

    .login-form {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;

      & > div {
        width: 260px;
      }

      input {
        outline: none;
        border-radius: 0;
        border-width: 1px;
        padding: 10px;
        border-color: rgb(217, 217, 217);
        border-style: solid;
        font-size: 14px;
      }

      #phone {

        input {
          width: calc(100% - 50px);
          flex-shrink: 1;
        }

        input:nth-child(1) {
          border-top-left-radius: 4px;
          width: 50px;
          text-align: center;
          flex-shrink: 0;
          border-right: 0;
        }

        input:nth-child(2) {
          border-top-right-radius: 4px;
        }
      }

      #phone + div {
        input {
          width: 100%;
          border-top: 0;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }

      .submit {
        margin-top: 40px;
        font-size: 16px;
        color: white;
        background-color: var(--primary-color);
        padding: 8px;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          background-color: rgb(229, 52, 52);
        }
      }
    }
  }
}
</style>
