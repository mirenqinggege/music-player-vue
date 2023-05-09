<template>
  <div class="m-window-control">
    <div class="split-line"></div>
    <button @click="handlerMinimize">
      <svg fill="currentColor" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           width="32" height="32">
        <path d="M512 1255.489906"></path>
        <path d="M498.081951 943.76654"></path>
        <path
          d="M772.963422 533.491105l-528.06716 0c-12.38297 0-22.514491-10.131521-22.514491-22.514491l0 0c0-12.38297 10.131521-22.514491 22.514491-22.514491l528.06716 0c12.38297 0 22.514491 10.131521 22.514491 22.514491l0 0C795.477913 523.359584 785.346392 533.491105 772.963422 533.491105z"></path>
      </svg>
    </button>
    <button @click="handlerMaximize">
      <svg fill="currentColor" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           width="32" height="32">
        <path d="M512 1255.489906"></path>
        <path d="M498.081951 943.76654"></path>
        <path
          d="M785.960424 410.377773c0-14.634419-11.871277-26.608035-26.608035-26.608035L204.677194 383.769738c-14.634419 0-26.608035 11.871277-26.608035 26.608035l0 349.998001c0 14.634419 11.871277 26.608035 26.608035 26.608035l554.675195 0c14.634419 0 26.608035-11.871277 26.608035-26.608035L785.960424 410.377773zM740.931441 741.954827 223.098141 741.954827 223.098141 428.798721l517.8333 0L740.931441 741.954827z"></path>
        <path
          d="M856.471717 294.735159l-554.675195 0c-12.485309 0-22.514491 10.029182-22.514491 22.514491s10.029182 22.514491 22.514491 22.514491L838.153108 339.764142l0 331.679392c0 12.485309 10.029182 22.514491 22.514491 22.514491s22.514491-10.029182 22.514491-22.514491l0-349.998001C883.182091 306.708775 871.106136 294.735159 856.471717 294.735159z"></path>
      </svg>
    </button>
    <button @click="handlerExit">
      <svg fill="currentColor" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           width="32" height="32">
        <path d="M512 1255.489906"></path>
        <path
          d="M718.519288 688.227064 543.827304 513.637418l174.180292-174.180292c8.801119-8.801119 8.801119-23.128523 0-31.827304-8.801119-8.801119-23.128523-8.801119-31.827304 0L512 481.810114 337.819708 307.629822c-8.801119-8.801119-23.230861-8.596442-31.929642 0.102339l0.102339-0.102339c-8.801119 8.801119-8.698781 23.026184 0.102339 31.827304l174.180292 174.180292L305.58305 688.227064c-8.801119 8.801119-8.801119 23.128523 0 31.827304 8.801119 8.801119 23.128523 8.801119 31.827304 0L512 545.464721 686.691985 720.054367c8.801119 8.801119 22.923846 8.903458 31.724965 0.102339l0.102339-0.102339C727.218069 711.355587 727.218069 697.028183 718.519288 688.227064z"></path>
      </svg>
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ipcRenderer} from 'electron'

function handlerMinimize() {
  ipcRenderer.invoke('minimize')
}

function handlerMaximize() {
  ipcRenderer.invoke('maximize')
}

function handlerExit() {
  ipcRenderer.invoke('exit')
}

</script>

<style lang="less" scoped>
.m-window-control {
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 10px;
  margin-left: 20px;

  button {
    background-color: transparent;
    border: 0;
    outline: none;
    color: rgb(251, 217, 217);

    &:hover {
      color: white;
      text-shadow: 0 0 2px white;
    }
  }

  .split-line {
    width: 1px;
    height: 30%;
  }
}
</style>
