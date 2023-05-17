<template>
<div class="m-search-input">
    <div class="wrapper">
        <svg class="icon" height="16" version="1.1" viewBox="0 0 1024 1024"
             width="16" xmlns="http://www.w3.org/2000/svg">
            <path
                    d="M955.733333 923.733333l-149.333333-153.6C876.8 693.333333 917.333333 593.066667 917.333333 490.666667c0-224-181.333333-405.333333-405.333333-405.333334S106.666667 266.666667 106.666667 490.666667s181.333333 405.333333 405.333333 405.333333c64 0 125.866667-14.933333 183.466667-42.666667 10.666667-4.266667 14.933333-17.066667 8.533333-27.733333-4.266667-10.666667-19.2-14.933333-27.733333-8.533333-51.2 25.6-106.666667 38.4-164.266667 38.4-200.533333 0-362.666667-162.133333-362.666667-362.666667S311.466667 128 512 128s362.666667 162.133333 362.666667 362.666667c0 100.266667-42.666667 196.266667-115.2 264.533333-8.533333 8.533333-8.533333 21.333333 0 29.866667 2.133333 2.133333 4.266667 4.266667 8.533333 4.266666l157.866667 162.133334c4.266667 4.266667 10.666667 6.4 14.933333 6.4 6.4 0 10.666667-2.133333 14.933333-6.4 6.4-6.4 8.533333-19.2 0-27.733334z"
                    fill="currentColor"></path>
        </svg>
        <input placeholder="请输入关键词">
    </div>
</div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
.m-search-input {
  display: flex;
  align-items: center;
  flex-shrink: 0;

  .wrapper {
    box-sizing: border-box;
    background-color: rgb(227, 62, 62);
    position: relative;
    color: rgb(248, 267, 267);
    padding: 2px 10px;
    border-radius: 50px;
  }

  svg {
    position: relative;
    top: -2px;
  }

  input {
    background-color: transparent;
    border: 0;
    outline: none;
    width: 150px;
    caret-color: white;
    font-size: 14px;
    position: relative;
    top: -2px;

    &::placeholder {
      color: rgb(239, 146, 146);
    }
  }
}
</style>
