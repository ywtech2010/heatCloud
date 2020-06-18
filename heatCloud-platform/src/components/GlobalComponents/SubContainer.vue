<template>
  <div :class="['sub-container', bgColor]">
    <slot name="sub"/>
  </div>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default() {
        return 'white'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .sub-container {
    min-height: calc(100vh - 90px);
    position: relative;
    overflow: hidden;
    margin: 20px;
    * {
      box-sizing: border-box;
    }
  }
  .gray {
    background: #f2f1f6;
  }
  .white {
    background: #fff;
  }
</style>
