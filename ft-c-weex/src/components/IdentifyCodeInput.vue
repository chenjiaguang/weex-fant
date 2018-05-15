<template>
  <div class="box-wrapper">
    <image :src="clear_icon" style="width:0;height:0;"></image>
    <input class="input" type="tel" :placeholder="placeholder" v-model="code.value" @input="onInput" @change="onChange" @focus="onFocus" @blur="onBlur" />
    <div class="get-wrapper">
      <div v-if="code.value && is_focus" class="clear-btn" @click="onClear">
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
        clear_icon: '../static/images/icon_delete.png',
        count: '',
        timer: null,
        is_focus: false
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
      onFocus () {
        this.is_focus = true
      },
      onBlur () {
        this.is_focus = false
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
