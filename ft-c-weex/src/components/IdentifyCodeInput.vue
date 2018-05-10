<template>
  <div class="box-wrapper">
    <input class="input" type="tel" :placeholder="placeholder" v-model="code.value" @input="onInput" @change="onChange" />
    <div class="get-wrapper">
      <div v-if="code.value" class="clear-btn" @click="onClear">
        <image class="clear-image" :src="clear_icon"></image>
      </div>
      <div class="get-btn">
        <text :class="['get-btn-text', (disabled || Boolean(count)) ? 'disabled' : '']" @click="onGet">{{getText}}</text>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['code', 'disabled', 'placeholder', 'inputHandler', 'changeHandler', 'getHandler'],
    data () {
      return {
        clear_icon: 'data:image/png;base64,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',
        count: '',
        timer: null
      }
    },
    computed: {
      getText () {
        return this.count === '' ? '获取验证码' : '重新获取' + (this.count === 0 ? '' : '(' + this.count + ')')
      }
    },
    methods: {
      onInput (e) {
        this.inputHandler && this.inputHandler(this.phone, e)
      },
      onChange (e) {
        this.changeHandler && this.changeHandler(this.phone, e)
      },
      onClear () {
        this.code.value = ''
      },
      onGet () {
        if (this.disabled || Boolean(this.count)) {
          return false
        }
        this.getHandler && this.getHandler(this.phone)
      },
      resetCount () {
        this.count = 59
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          if (this.count <= 0) {
            clearInterval(this.timer)
          } else {
            this.count -= 1
          }
        }, 1000)
      }
    }
  }
</script>

<style scoped>
  .box-wrapper{
    flex-direction: row;
    border-bottom-width:1px;
    align-items: stretch;
  }
  .input{
    flex:1;
    font-weight:normal;
    padding-left:22px;
  }
  .clear-btn{
    width:86px;
    height:66px;
    flex:0;
    justify-content: center;
    align-items: center;
  }
  .clear-image{
    width:26px;
    height:26px;
  }
  .get-wrapper{
    flex-direction: row;
    align-items:center;
  }
  .get-btn{
    width:210px;
    height:40px;
    border-left-width:1px;
    border-left-color:#999;
    justify-content: center;
    align-items: center;
  }
  .get-btn-text{
    font-size:30px;
    color:#1EB0FD;
  }
  .disabled{
    color:#999999;
  }
</style>
