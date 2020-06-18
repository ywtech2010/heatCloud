<template>
  <div :class="['common-container', bgColor]">
    <slot name="common" />
  </div>
</template>

<script>
  export default {
    props: {
      bgColor: {
        type: String,
        default() {
          return 'white';
        },
      },
    },
  };
</script>

<style lang="scss" scoped>
  .common-container {
    min-height: calc(100vh - 50px);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: row;
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
