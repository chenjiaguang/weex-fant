<template>
  <div class="bind-phone-wrapper" style="flex:1;padding-top:52px;justify-content: flex-start;align-items: center;width:750px;">
    <div class="main-text">
      <text class="tip-text">为保证您的账号安全，需要进行短信验证，验证成功方可进行下一步操作</text>
      <div class="phone-box">
        <text class="phone-text">{{showPhone}}</text>
      </div>
    </div>
    <identify-code-input ref="codeInput" class="input-item" :code="code" placeholder="请输入验证码" :inputHandler="onInput" :changeHandler="onChange" :getHandler="getCode" :disabled="!phone.value || stop_get_code"></identify-code-input>
    <button text="下一步" :disabled="disableNext" :primary="true" class="bind-btn" :clickHandler="onNext"></button>
    <text style="font-size:24px;line-height:30px;margin-top:42px;padding-top:15px;padding-bottom:25px;color:#1EB0FD;" @click="contact">收不到验证码？</text>
  </div>
</template>

<script>
  import PhoneInput from '../components/PhoneInput.vue'
  import IdentifyCodeInput from '../components/IdentifyCodeInput.vue'
  import Button from '../components/Button.vue'
  import FtNavigator from '../lib/FtNavigator'
  let modal = weex.requireModule('modal')
  export default {
    data () {
      return {
        phone: {
          value: '17508959493'
        },
        code: {
          value: ''
        },
        disableRequestNext: {
          value: false
        },
        get_url: this.$domain + '/sms/send',
        next_url: this.$domain + '/sms/verify',
        stop_get_code: false
      }
    },
    components: { PhoneInput, IdentifyCodeInput, Button },
    computed: {
      disableNext () {
        return {
          value: this.phone.value.length !== 11 || !this.code.value
        }
      },
      showPhone () {
        let value = this.phone.value
        let left_str = value.substring(0, 3)
        let right_str = value.substring(value.length - 4)
        return left_str + ' **** ' + right_str
      }
    },
    methods: {
      onInput (e) {
        console.log('input', e)
      },
      onChange (e) {
        console.log('change', e)
      },
      contact () {
        modal.alert({
          message: '请联系客服处理\n客服电话：40011111'
        })
      },
      navigate (weex, web) {
        let options = {
          instance: this,
          weex_url: weex,
          web_url: web
        }
        FtNavigator.push(options)
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
      onNext () {
        let sData = {
          phone: this.phone.value,
          code: this.code.value
        }
        let reg = /^1[34578][0-9]\d{4,8}$/
        let error_text = ''
        if (!reg.test(this.phone.value)) {
          error_text = '手机号错误'
        } else if (this.disableRequestNext) {
          error_text = '正在验证...'
        }
        if (error_text) {
          modal.toast({
            message: error_text,
            duration: 2
          })
          return false
        }
        this.$fetchData(
          this.next_url,
          sData,
          {
            before: () => {
              this.disableRequestNext = true
            },
            after: () => {
              this.disableRequestNext = false
            },
            success: (res) => {
              if (res && Boolean(res.error) && res.msg) {
                modal.toast({
                  message: res.msg,
                  duration: 2
                })
              } else if (res && !Boolean(res.error)) {
                // 下一步，进入修改页面
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
  .main-text{
    width:690px;
    align-items:center;
  }
  .tip-text{
    font-size:28px;
    line-height:44px;
    color:#666666;
  }
  .phone-box{
    padding-top:48px;
    padding-bottom:63px;
    justify-content: center;
    align-items:center;
  }
  .phone-text{
    font-size:42px;
    line-height:50px;
    color:#333333;
    font-weight:700;
  }
  .input-item{
    width:630px;
    height:90px;
    border-bottom-color: #BBBBBB;
  }
  .bind-btn{
    width:630px;
    height:90px;
    margin-top:100px;
  }
</style>
