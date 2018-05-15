<template>
  <div :class="['button', Boolean(primary) ? 'primary-btn' : 'default-btn', Boolean(disabled.value) ? (Boolean(primary) ? 'disabled-primary-btn' : 'disabled-default-btn') : '',]" @click="onClick">
    <text :class="['button-text', Boolean(primary) ? 'primary-text' : 'default-text', Boolean(disabled.value) ? (Boolean(primary) ? 'disabled-primary-text' : 'disabled-default-text') : '']">{{text}}</text>
  </div>
</template>

<script>
  export default {
    props: ['text', 'disabled', 'clickHandler', 'primary'],
    data () {
      return {}
    },
    methods: {
      onClick (e) {
        console.log(111)
        if (!this.disabled.value && this.clickHandler) {
          this.clickHandler(e)
        }
      }
    },
  }
</script>

<style scoped>
  .button{
    border-radius:6px;
    justify-content: center;
    align-items: center;
  }
  .button-text{
    font-size:34px;
  }
  .default-btn{
    border-width:2px;
    border-color:#1EB0FD;
  }
  .primary-btn{
    background-color: #1EB0FD
  }
  .disabled-primary-btn{
    background-color: #97DBFF;
  }
  .disabled-default-btn{

  }
  .default-text{
    color:#1EB0FD;
  }
  .primary-text{
    color:#ffffff
  }
  .disabled-primary-text{
    color:#ffffff;
  }
  .disabled-default-text{

  }
</style>
