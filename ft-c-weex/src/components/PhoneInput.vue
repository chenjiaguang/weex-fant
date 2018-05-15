<template>
  <div class="box-wrapper">
    <image :src="clear_icon" style="width:0;height:0;"></image>
    <div class="prefix-wrapper" @click="">
      <text class="prefix">{{prefix}}</text>
    </div>
    <input :maxlength="11" class="input" type="tel" :placeholder="placeholder" v-model="phone.value" @input="onInput" @change="onChange" @focus="onFocus" @blur="onBlur" />
    <div class="clear-wrapper">
      <div v-if="phone.value && is_focus" class="clear-btn" @click="onClear">
        <image class="clear-image" :src="clear_icon"></image>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['phone', 'prefix', 'placeholder', 'inputHandler', 'changeHandler', 'focusHandler', 'blurHandler'],
    data () {
      return {
        is_focus: false,
        clear_icon: '../static/images/icon_delete.png'
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
        this.phone.value = ''
      },
      onFocus () {
        this.is_focus = true
        this.focusHandler && this.focusHandler()
      },
      onBlur () {
        this.is_focus = false
        this.blurHandler && this.blurHandler()
      },
    }
  }
</script>

<style scoped>
  .box-wrapper{
    flex-direction: row;
    border-bottom-width:1px;
    align-items: stretch;
  }
  .prefix-wrapper{
    justify-content:center;
  }
  .prefix{
    width:100px;
    font-size:30px;
    font-weight:bold;
    padding-left:20px;
  }
  .input{
    flex:1;
    font-weight:normal;
    padding-left:22px;
  }
  .clear-wrapper{
    justify-content:center;
  }
  .clear-btn{
    width:66px;
    height:66px;
    justify-content: center;
    align-items: center;
  }
  .clear-image{
    width:26px;
    height:26px;
  }
</style>
