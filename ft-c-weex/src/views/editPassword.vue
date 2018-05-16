<template>
  <div class="wrapper">
    <input maxlength="24" class="input" type="tel" placeholder="原密码" v-model="password.value" @input="onInput" @change="onChange" />
    <input maxlength="24" class="input" type="tel" placeholder="新密码" v-model="newPassword.value" @input="onInput" @change="onChange" />
    <div class= ></div>
    <text class="text">密码长度至少6个字符，最多24个字符</text>
    <button text="确定" :disabled="false" class="bind-btn" :primary="true" :clickHandler="onBind"></button>
  </div>
</template>

<script>
  import Button from '../components/Button.vue'
  import fetchData from '../lib/fetchData'
  export default {
    data () {
      return {
        password: {
          value: ''
        },
        newPassword: {
          value: ''
        },
        verifyNewPassword: {
          value: ''
        }
      }
    },
    components: { Button },
    methods: {
      onInput (e) {
        console.log('input', e)
      },
      onChange (e) {
        console.log('change', e)
      },
      onBind () {
        console.log('onBind')
      }
    }
  }
</script>

<style>
  .wrapper{
    padding-top:78px;
    justify-content: flex-start;
    align-items: center;
  }
  .input{
    color: #999999;
    font-size:30px;
    padding-left:22px;
    width:630px;
    height:90px;
    border-bottom: 1px solid #BBBBBB;
    margin-bottom:38px;
  }

  .end{
    margin-bottom:20px;
  }

  .bind-btn{
    width:630px;
    height:90px;
    margin-top:80px;
  }
  .text{
    font-size: 24px;
    color: #999999;
    width: 590px;
    margin-left: 20px;
  }
</style>
