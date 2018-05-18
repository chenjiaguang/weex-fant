<template>
  <div class="wrapper">
    <input maxlength="24" class="input" type="password" placeholder="原密码" v-model="old_password" />
    <input maxlength="24" class="input end" :type="this.inputType ? 'text' : 'password'" placeholder="新密码" v-model="new_password"/>
    <image :src="this.inputType ? password_hidden : password_visible" @click="alterInputType" style="width:42px;height:33px;position:absolute;top:236px;right: 60px;"></image>
    <text class="text">密码长度至少6个字符，最多24个字符</text>
    <button text="确定" :disabled="false" class="bind-btn" :primary="true" :clickHandler="onBind"></button>
    <text style="font-size: 24px;color: #1EB0FD;margin-top: 60px;" @click="showAlert">忘记原密码？</text>
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
        old_password: '',
        new_password: '',
        password_change_url: this.$domain + '/user/password/change',
      }
    },
    components: { Button },
    methods: {
      alterInputType ()
      {
//        let password=this.new_password;
        this.inputType=!this.inputType;
//        this.$nextTick(() =>{
//          this.new_password = '';
//          this.$nextTick(() =>{
//            this.new_password = password
//          })
//        })
      },
      onBind () {
        console.log('onBind');
        if (this.new_password.length < 6 || this.new_password.length > 24) {
          modal.toast({
            message: '新密码长度至少6个字符，最多24个字符',
            duration: 2
          });
          return false
        }

        let sData = {
          old_password: this.old_password,
          new_password: this.new_password,
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

      },
      showAlert () {
        modal.alert({
          message: "请联系客服处理\n客服电话：400-3663-2552",
          okTitle: "确定"
        }, function (value) {
        })
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
