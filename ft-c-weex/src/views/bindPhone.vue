<template>
  <div class="wrapper">
    <phone-input class="input-item" :phone="phone" placeholder="请输入手机号" prefix="+86" :inputHandler="onInput" :changeHandler="onChange"></phone-input>
    <identify-code-input ref="codeInput" class="input-item" :code="code" placeholder="请输入验证码" :inputHandler="onInput" :changeHandler="onChange" :getHandler="getCode" :disabled="phone.value.length !== 11"></identify-code-input>
    <button text="立即绑定" :disabled="disableBind" :primary="true" class="bind-btn" :clickHandler="onBind"></button>
  </div>
</template>

<script>
import PhoneInput from '../components/PhoneInput.vue'
import IdentifyCodeInput from '../components/IdentifyCodeInput.vue'
import Button from '../components/Button.vue'
import fetchData from '../lib/fetchData'
let modal = weex.requireModule('modal')
export default {
  data () {
    return {
      phone: {
        value: ''
      },
      code: {
        value: ''
      },
      disableRequestBind: {
        value: false
      },
      get_url: 'http://fanttest.fantuanlife.com/sms/send'
    }
  },
  components: { PhoneInput, IdentifyCodeInput, Button },
  computed: {
    disableBind () {
      return {
        value: this.disableRequestBind.value || this.phone.value.length !== 11 || !this.code.value
      }
    }
  },
  methods: {
    onInput (e) {
      console.log('input', e)
    },
    onChange (e) {
      console.log('change', e)
    },
    getCode () {
      let sData = {
        phone: this.phone.value
      }
      fetchData(
        this.get_url,
        sData,
        {
          success: (res) => {
            if (res && Boolean(res.error) && res.msg) {
              modal.toast({
                message: res.msg,
                duration: 2
              })
            } else if (res && !res.error) {
              modal.toast({
                message: '正在发送验证码，请注意查收',
                duration: 2
              })
            }
          },
          fail: (res) => {
            console.log('fail', res)
          }
        }
      )
    },
    onBind () {
      console.log('onBind')
      this.disableRequestBind.value = true
    }
  }
}
</script>

<style scoped>
  .wrapper{
    flex:1;
    padding-top:88px;
    justify-content: flex-start;
    align-items: center;
  }
  .input-item{
    width:630px;
    height:90px;
    border-bottom-color: #BBBBBB;
    margin-bottom:38px;
  }
  .bind-btn{
    width:630px;
    height:90px;
    margin-top:42px;
  }
</style>
