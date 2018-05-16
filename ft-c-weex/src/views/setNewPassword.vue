<template>
  <div class="wrapper">
    <input maxlength="24" class="input" :type="inputType ? 'text' : 'password'" placeholder="新密码" v-model="password" :value = "password"/>
    <image :src="inputType ? password_hidden : password_visible" @click="alterInputType" style="width:42px;height:33px;position:absolute;top:110px;right: 60px;"></image>
    <text class="text">密码长度至少6个字符，最多24个字符</text>
    <button text="确定" :disabled="false" class="bind-btn" :primary="true" :clickHandler="onBind"></button>
  </div>
</template>

<script>
  import Button from '../components/Button.vue'
  import fetchData from '../lib/fetchData'
  const modal = weex.requireModule('modal');
  export default {
    data () {
      return {
        inputType : false,
        password_hidden  : '../static/images/password_hidden.png',
        password_visible : '../static/images/password_visible.png',
        password: '',
        password_create_url: this.$domain + '/user/password/create',
      }
    },
    components: { Button },
    methods: {
      alterInputType ()
      {
        let password=this.password;
        this.inputType=!this.inputType;
        this.$nextTick(()=>{
          this.password='';
          this.$nextTick(()=>{
            this.password=password
          })
        })
      },
      onBind () {
        console.log('onBind');
        if (this.password.length < 6 || this.password.length > 24) {
          modal.toast({
            message: '密码长度至少6个字符，最多24个字符',
            duration: 2
          });
          return false
        }

        let sData = {
          password: this.password,
          token: ''
        };
        this.$fetchData(
                this.password_create_url,
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
                    } else if (res && !res.error) {
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
