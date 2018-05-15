<!--绑定手机、重新绑定手机（重新绑定则传如rebind:true、没有该参数则为第一次绑定）-->
<template>
  <div class="bind-phone-wrapper" style="flex:1;padding-top:88px;justify-content: flex-start;align-items: center;width:750px;">
    <phone-input class="input-item" :phone="phone" placeholder="请输入手机号" prefix="+86" :inputHandler="onInput" :changeHandler="onChange"></phone-input>
    <identify-code-input ref="codeInput" class="input-item" :code="code" placeholder="请输入验证码" :inputHandler="onInput" :changeHandler="onChange" :getHandler="getCode" :disabled="!phone.value || stop_get_code"></identify-code-input>
    <button :text="is_rebind ? '绑定' : '立即绑定'" :disabled="disableBind" :primary="true" class="bind-btn" :clickHandler="onBind"></button>
    <text class="rebind-tip" v-if="is_rebind">一旦绑定新手机号，原手机号不可再用于登录</text>
  </div>
</template>

<script>
import PhoneInput from '../components/PhoneInput.vue'
import IdentifyCodeInput from '../components/IdentifyCodeInput.vue'
import Button from '../components/Button.vue'
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
      get_url: this.$domain + '/sms/send',
      bind_url: this.$domain + '/user/phone/bind',
      stop_get_code: false,
      is_rebind: weex.config.params && weex.config.params.rebind
    }
  },
  components: { PhoneInput, IdentifyCodeInput, Button },
  computed: {
    disableBind () {
      return {
        value: !this.phone.value || !this.code.value
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
      let reg = /^1[34578][0-9]\d{4,8}$/
      let error_text = ''
      if (!reg.test(this.phone.value)) {
        error_text = '请输入正确手机号'
      }
      if (error_text) {
        modal.toast({
          message: error_text,
          duration: 2
        })
        return false
      }
      this.$fetchData(
        this.get_url,
        sData,
        {
          before: () => {
            this.stop_get_code = true
          },
          after: () => {
            this.stop_get_code = false
          },
          success: (res) => {
            if (res && Boolean(res.error) && res.msg) {
              modal.toast({
                message: res.msg,
                duration: 2
              })
            } else if (res && !Boolean(res.error)) {
              this.$refs['codeInput'].resetCount()
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
      let reg = /^1[34578][0-9]\d{4,8}$/
      let error_text = ''
      if (this.disableRequestBind.value) {
        error_text = '正在绑定...'
      } else if (!reg.test(this.phone.value)) {
        error_text = '手机号错误'
      }
      if (error_text) {
        modal.toast({
          message: error_text,
          duration: 2
        })
        return false
      }
      let sData = {
        phone: this.phone.value,
        code: this.code.value,
        token: ''
      }
      this.$fetchData(
        this.bind_url,
        sData,
        {
          before: () => {
            this.disableRequestBind.value = true
          },
          after: () => {
            this.disableRequestBind.value = false
          },
          success: (res) => {
            if (res && Boolean(res.error) && res.msg) {
              modal.toast({
                message: res.msg,
                duration: 2
              })
            } else if (res && !Boolean(res.error)) {
              // 进入登陆后页面
            }
          },
          fail: (res) => {
            console.log('fail', res)
          }
        }
      )
    }
  }
}
</script>

<style scoped>
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
  .rebind-tip{
    width:630px;
    font-size:24px;
    line-height:30px;
    margin-top:37px;
    color:#666666;
  }
</style>
