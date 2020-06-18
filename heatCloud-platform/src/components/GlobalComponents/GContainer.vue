<template>
  <sub-container :bgColor="'white'">
    <slot slot="sub" name="content"></slot>
  </sub-container>
</template>

<script>
  import SubContainer from '@/components/GlobalComponents/SubContainer'
  export default {
    components: {SubContainer}
  }
</script>

<style lang="scss" scoped>
  .sub-container {
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
</style>
