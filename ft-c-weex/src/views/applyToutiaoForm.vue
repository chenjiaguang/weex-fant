<template>
  <scroller ref="wrapper" class="apply-toutiao-wrapper" style="align-items:stretch;flex:1;" @viewappear="viewAppear">
    <div style="align-items:center;flex:1;" v-if="show_page">
      <div class="section">
        <text class="section-header">主要信息填写</text>
        <div :class="[validate && formErr.avatar.err ? 'err-item' : 'correct-item', 'form-item']" style="height:160px;justify-content: flex-end;padding-bottom:35px;">
          <div style="flex-direction: row">
            <text class="item-title">请上传头像</text>
            <div class="err-tip" v-if="validate && formErr.avatar.err">
              <image class="err-icon" :src="err_icon"></image>
              <text class="err-title">{{formErr.avatar.err_text}}</text>
            </div>
          </div>
          <text style="font-size:24px;line-height:34px;color:#999999;">选择文件要求清晰、健康、代表品牌形象</text>
          <image v-if="input_data.avatar.src" :src="input_data.avatar.src" style="width:120px;height:120px;position:absolute;bottom:40px;right:0;border-radius:60px;"></image>
          <image v-else :src="default_avatar" style="width:120px;height:120px;position:absolute;bottom:40px;right:0;"></image>
        </div>
        <div :class="[validate && formErr.toutiao_name.err ? 'err-item' : 'correct-item', 'form-item']">
          <text class="item-title">头条号名称</text>
          <div class="item-value-tip">
            <input :class="['item-value', input_data.toutiao_name ? '' : 'empty-input']" placeholder="请输入1-10个字" v-model="input_data.toutiao_name" />
            <div class="err-tip" v-if="validate && formErr.toutiao_name.err">
              <image class="err-icon" :src="err_icon"></image>
              <text class="err-title" style="width:269px;">{{formErr.toutiao_name.err_text}}</text>
            </div>
          </div>
        </div>
        <div :class="[validate && formErr.phone.err ? 'err-item' : 'correct-item', 'form-item']">
          <text class="item-title">联系电话</text>
          <div class="item-value-tip">
            <input type="tel" :class="['item-value', input_data.phone ? '' : 'empty-input']" placeholder="请输入正确的联系电话" v-model="input_data.phone" />
            <div class="err-tip" v-if="validate && formErr.phone.err">
              <image class="err-icon" :src="err_icon"></image>
              <text class="err-title" style="width:269px;">{{formErr.phone.err_text}}</text>
            </div>
          </div>
        </div>
        <div :class="[validate && formErr.area.err ? 'err-item' : 'correct-item', 'form-item']">
          <text class="item-title">专注领域</text>
          <div class="item-value-tip" @click="pickArea">
            <div style="flex:1;"><text :class="['item-value', input_data.area_label_arr[input_data.area_selected] ? '' : 'empty-input']">{{input_data.area_label_arr[input_data.area_selected] || '请选择专注领域'}}</text></div>
            <div class="err-tip" v-if="validate && formErr.area.err">
              <image class="err-icon" :src="err_icon"></image>
              <text class="err-title" style="width:269px;">{{formErr.area.err_text}}</text>
            </div>
            <image :src="arrow_icon" style="width:11px;height:18px;position:absolute;right:0;top:47px;"></image>
          </div>
        </div>
        <div :class="['form-item']" style="border-bottom-width:0;">
          <div style="flex:1;flex-direction: row;align-items: center;">
            <text class="item-title" style="flex:1;">简介</text>
            <div class="err-tip" v-if="validate && formErr.intro.err">
              <image class="err-icon" :src="err_icon"></image>
              <text class="err-title" style="width:269px;">{{formErr.intro.err_text}}</text>
            </div>
          </div>
          <textarea v-model="input_data.intro" :class="[validate && formErr.intro.err ? 'err-textarea' : 'correct-textarea', input_data.intro ? '' : 'empty-input']" rows="3" placeholder="10~30字，简单介绍你的头条号。要求内容完整通顺，无特殊符号"></textarea>
        </div>
      </div>
      <div class="section-separator"></div>
      <div class="section">
        <text class="section-header">负责人资料</text>
        <div :class="[validate && formErr.id_card_pic.err ? 'err-item' : 'correct-item', 'form-item']" style="height:160px;justify-content: flex-end;padding-bottom:35px;">
          <div style="flex-direction: row">
            <text class="item-title">手持身份证正面照</text>
            <div class="err-tip" v-if="validate && formErr.id_card_pic.err">
              <image class="err-icon" :src="err_icon"></image>
              <text class="err-title">{{formErr.id_card_pic.err_text}}</text>
            </div>
          </div>
          <text style="font-size:24px;line-height:34px;color:#999999;">照片要求要有持证人的半身像，</text>
          <text style="font-size:24px;line-height:34px;color:#999999;">身份证信息可明显识别</text>
          <image v-if="input_data.id_card_pic.src" :src="input_data.id_card_pic.src" style="width:120px;height:120px;position:absolute;bottom:40px;right:0;"></image>
          <image v-else :src="default_pic" style="width:120px;height:78px;position:absolute;bottom:40px;right:0;"></image>
        </div>
        <div :class="[validate && formErr.real_name.err ? 'err-item' : 'correct-item', 'form-item']">
          <text class="item-title">真实姓名</text>
          <div class="item-value-tip">
            <input :class="['item-value', input_data.real_name ? '' : 'empty-input']" placeholder="请输入真实姓名" v-model="input_data.real_name" />
            <div class="err-tip" v-if="validate && formErr.real_name.err">
              <image class="err-icon" :src="err_icon"></image>
              <text class="err-title" style="width:269px;">{{formErr.real_name.err_text}}</text>
            </div>
          </div>
        </div>
        <div :class="[validate && formErr.id_card_num.err ? 'err-item' : 'correct-item', 'form-item']">
          <text class="item-title">身份证号</text>
          <div class="item-value-tip">
            <input :class="['item-value', input_data.id_card_num ? '' : 'empty-input']" placeholder="请输入真实身份证号" v-model="input_data.id_card_num" />
            <div class="err-tip" v-if="validate && formErr.id_card_num.err">
              <image class="err-icon" :src="err_icon"></image>
              <text class="err-title" style="width:269px;">{{formErr.id_card_num.err_text}}</text>
            </div>
          </div>
        </div>
        <text style="font-size:28px;line-height:40px;padding-top:30px;">负责人资料提交审核通过后，不可进行修改</text>
      </div>
      <div class="section-separator" v-if="account_type.toString() === '2'"></div>
      <div class="section" v-if="account_type.toString() === '2'">
        <text class="section-header">组织机构资料</text>
        <div :class="[validate && formErr.organization_name.err ? 'err-item' : 'correct-item', 'form-item']">
          <text class="item-title">组织名称</text>
          <div class="item-value-tip">
            <input :class="['item-value', input_data.organization_name ? '' : 'empty-input']" placeholder="请输入组织名称" v-model="input_data.organization_name" />
            <div class="err-tip" v-if="validate && formErr.organization_name.err">
              <image class="err-icon" :src="err_icon"></image>
              <text class="err-title" style="width:269px;">{{formErr.organization_name.err_text}}</text>
            </div>
          </div>
        </div>
        <div :class="[validate && formErr.organization_address.err ? 'err-item' : 'correct-item', 'form-item']">
          <text class="item-title">组织地址</text>
          <div class="item-value-tip">
            <input :class="['item-value', input_data.organization_address ? '' : 'empty-input']" placeholder="请输入正确的地址" v-model="input_data.organization_address" />
            <div class="err-tip" v-if="validate && formErr.organization_address.err">
              <image class="err-icon" :src="err_icon"></image>
              <text class="err-title" style="width:269px;">{{formErr.organization_address.err_text}}</text>
            </div>
          </div>
        </div>
        <div :class="['form-item']">
          <text class="item-title">官网地址</text>
          <div class="item-value-tip">
            <input :class="['item-value', input_data.organization_website ? '' : 'empty-input']" placeholder="请输入正确的官网地址" v-model="input_data.organization_website" />
            <div class="err-tip" v-if="false">
              <image class="err-icon" :src="err_icon"></image>
              <text class="err-title" style="width:269px;">{{''}}</text>
            </div>
          </div>
        </div>
        <text style="font-size:28px;line-height:40px;padding-top:30px;">组织机构资料提交审核通过后，不可进行修改</text>
      </div>
      <div style="width:690px;flex-direction: row;align-items:center;height:50px;margin-top:16px;margin-bottom:28px;" @click="changeAgreement">
        <image :src="checked_icon" v-if="agreement" style="width:20px;height:20px;margin-right:20px;"></image>
        <image :src="uncheck_icon" v-else style="width:20px;height:20px;margin-right:20px;"></image>
        <text style="font-size:24px;color:#333333;">我已同意</text><text style="font-size:24px;color:#FF3F53;" @click="goAgreement">《范团头条号用户协议》</text>
        <div class="err-tip" style="margin-left:16px;" v-if="validate && formErr.agreement.err" @click="stopPropagation">
          <image class="err-icon" :src="err_icon"></image>
          <text class="err-title" style="width:213px;">{{formErr.agreement.err_text}}</text>
        </div>
      </div>
      <button text="下一步" :disabled="{value: stop_apply}" :primary="true" :clickHandler="goNext" style="width:690px;height:90px;margin-bottom:80px;"></button>
    </div>
    <!--<text @click="pickImage">调用上传图片</text>-->
  </scroller>
</template>

<script>
import Button from '../components/Button.vue'
const modal = weex.requireModule('modal')
const picker = weex.requireModule('picker')
const storage = weex.requireModule('storage')
export default {
  data () {
    return {
      show_page: false,
      account_type: 1,
      default_avatar: '../static/images/apply_default_avatar.png',
      default_pic: '../static/images/apply_default_pic.png',
      area_arr: [],
      area_label_arr: [],
      area_selected: null,
      uncheck_icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABV0lEQVRYR+2YMUoEMRSG/5fAsiIIA+MprBRbC0HwBNO54CDMmCtss9rsFaIDssKWcwJB2MJWtvMUDgwuiMtC8iToYjWkGmaEpEnxw8uf7/0p8gg/i9I0jYfD4bm19grAETPv/WqtbES0ArAUQjys1+un2WxWAWByZrIsOySiKYATZl4AeAPw1YqTv6I7AA6I6BTACzOPi6JYOjL7g8FgzszHUkoF4LmqqlVZlqZNQ0mSyDiOXRfOjDGaiF43m82IlFIX1tp7IcSl1rps00RTbaVUYq19FELklOf5gpk/pZQjrXXdkaHIGDMnol1n6IOZ7+q6HrfdpqbLuvZFUTQlomsXaAZwWxTFTRd0tmdmWebOnwRDTV0IhHz5DIQCIR8Bnx4yFAj5CPj0kKFAyEfAp4cMBUI+Aj49ZOj/EurdR7F3X+neDRt6N47p3cBq+xwdqY5Heu/OyzcyjW2e3DSkkwAAAABJRU5ErkJggg==',
      checked_icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAACvUlEQVRYR82YS2hTQRSGv5NoH75bWktEjULcqDW0WHThohurCIJudKNuFHGpO61gBaFYQS2uqiKIxQddtYiCD1B0pWCgCK3FVyNSrQ+warGv3COTGJrEpLlpbtLM8l7m3m/O/585Z0YIDxVfBxWhYrZYqvsRalV1QeRdboaI/EQJuESuuEe592YX30BUDIz3NjVqaTPQgJpneRwiCtwXlzQGt0tAfB1aOVas7ahuBlx5RIn9lYXIg6JR2Ssru3RPCL2W98gkrlxE3cg+8XZajxStn6HIxP1WkMfi7bKGcm1gu4s1RpflnSFjqoIZeQUqcYOlMGalXn/egOa44cJ64cmgcj0IqXTJC1BVCZyrFTZVCr/H4Vi3xZ2B5FA5BzIwJ6uFBo8w69+W+2scWnosbn6AiQT5cgpkZLq8QdhYMQkTdU/ba+V0j5KYUTkDipUp1sIjIbgVVJpeJk/unAAlk8lAGZj298r5PmV4InmmOQ40lUxX3ylnelPDGERHgaYrU2ysHAPKRibbQP5FsGIedH2curJkK5MtoFXz4WyNC38ZtL6yuPSWpEZ0Qqa0QCYyp9ZFYKLZcaNfae1ThsYnpzsl05RApW5oqxPqq+I7WVMQH35WjgQ0nL5OypQ2QotL4GKd4C8T3Akd9tMvSkuvcnR1pDZlsunZ6XFSZtmSUmhcI2z1CLNjOm1TpX+MKQuL4suBnU0vKyAzubwITqwVdi5LfxCxs+llDRTeOYlU691ewfgrcRhvGcOnqk12INJ6KPEjxsAHfMIhH8yN9hBE+pm7A8rx7vjsyxQiYyAzwbSfO5ZCs98YPSLhs+/K4RfKpz/810ZMFyrj0rHNA03VQv8wHHzuXGSiC8gYyChWWw7BYRgcmW4cUs/LGMh5hPgvFt5BseCO0gV32VBw1zEFd2EV9biJ1Mxe6clXw/IXYG2U2OewuiQAAAAASUVORK5CYII=',
      err_icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAADkklEQVRYR82YTWxUVRTHf+f2c/xA0w0Jq8ZFE2MCC6MTF9ApJS1oIjbTGTCjMXHBChLckBAWwoKQuNEEN3RhYqRROoyVhVYIpS0spBoXkOiChemKyIaoFNoZpveQ+97M0Bk6nfdmXuK87cw95/f+57x7PoSAj6JC/IMXia31IWvbsfYdRHYA/aAv+2bkH2AJ1VsY8yPacZuVjvssnn8giAZxJUH+pHtSL1FkDOxelDd8CEyDs9aDE34D8zOx7u9lZvK/Rv42BVIQhtIj6NoplNeAFxoZrPP7MsIfSMenzE1dEairVl0gHU31kddjqB4FepoEqT2WR+QL8vKZ/JK9v5HNDYF0+MAAtngSSxLojgimbKaAIYexJ2V2+k6t7WeAPJhicRJ43WVpxDBlcy5kv9PZmZHZC1VQVQ69MBXsl1gOBoQpIHxDtznteSrYEygfBlRVMXzHqjm8PnwVIC+BE+NnUP0koEHH/CedXbtl9tt7jkeH399KsTAHvBpQ2QIinzN/8Xg50Z8CDaVHsWuXQiWwcEnmc++td66J5A8o+wMCub/lMR37ZW7qsneTeW/m3TP2Mko8hCF3PCsLF9NVQEPjU1hNhbIjLNJpRuVq9l/xbuBE+iPUng1/z0QEBMuIOcJ89mvReGYLsdUJlAOh3sovFdEo5MfqAiu9h0QTB/vRx7PAK/8rEPyFdA2LDqXexdrpALVpA94IFQKLMWOig8lzwKHw6kQcMh9gQjQxfhPVkF9XGT9ShVweLTqgv1Hd2hYKidwTTSRX0WareeQK5dsRqP1CdjN8yahk3Iws5N6uKh2DyZ+AfU3lpJfULX32rqE3u7meXfIAdqX6EXut1HM3wzTR6sX4GOEKSs6vJCRRRkC7mqApXYwtlQ7PrWulHvkA+lzAxm4j3lLpaKm4NqFDvSOV4tpS+xEZ0NP2wxN6X2YLK6suF5opIXcQ+cqPmH4MDITGdA1arHfEDZKttbDIXayMyY3srx7PztSbGJ0G3RYC6tkWtpyZ4Zt8brCQGyw36KVBYQHVnQGB6jf5HtRbqT56Q4xBwi1i2+Iyczbvh/5IDyt3F1HcEqLRs/kYVD6tw2MDFE3QQXEZwwnUTPn3kE1jcTNaox1AaVC0mdrpNYJRWh4Ct0svtB30+QbShBulK0q58PW0ybKhAtVO65j1srfNwqoKyqkVz9Ss9NzXJDUrPV1CqVnpTT7YbEm13s8TWw7WuPgcchkAAAAASUVORK5CYII=',
      arrow_icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAbCAYAAACa9mScAAAB4ElEQVRIS62VPWjbQBTH319SB8dTaQKFjiXQqR+rAwEJIy9eQkFkDV26pR+BDKFdAh2zuJnTodBCAx1NkO2b4uDUa6Fb2qnQYtV4cEwjvVfO1ME5GkXUuvHevd/97937QKvVusfMOyJyn4gOmHnL9/2vAIQyLjQajUMRKenz2lFE2sz83Pf946wghGH4nYhuTl3KRPTFtu3A87zPWcRoyFMi2iaiouHQA7Bi2/aR67pxGgzdbneu3+8/YeYNANenDwP4RkSbURR9DILg92UgaEO73S4Mh8M1Edk1IDpGPwGsl8vl96mQiVEptZokSU1E5g3YmYg8LhaL70ql0qkJGyuZLBFBs9l8KCKviGjRAJ3qfcdxXruu279gM6lKKYeZl5lZy18w7EPLsmq9Xm8rCIJkYrugZNqhXq/fdRxnn4huE5FlqNodjUYvqtXqr3F+pX1dGIYPAOxoZQBM0NskSV5WKpWTVMjfGC0y8x6AcVafPwE402VSKBQepUImDp1O58ZgMNgHsCQi1wzYm0wQ7aSUuhPHcYOIbhkh+JEJopSaj+P4w38puSomIqJbR3pMZv6dmfLkqowFUIui6PKMzaV2ZqrimftJLp0tlx6bS7f/19yxLOuZ53mfMs+dPCbgH1J6XJGebIY/AAAAAElFTkSuQmCC',
      avatar: {
        value: '',
        src: ''
      },
      toutiao_name: '',
      phone: '',
      area: '',
      intro: '',
      id_card_pic: {
        value: '',
        src: ''
      },
      real_name: '',
      id_card_num: '',
      organization_name: '',
      organization_address: '',
      organization_website: '',
      agreement: true,
      validate: false,
      stop_apply: false,
      input_data: {
        area_arr: [],
        area_label_arr: [],
        area_selected: null,
        avatar: {
          value: '',
          src: ''
        },
        toutiao_name: '',
        phone: '',
        area: '',
        intro: '',
        id_card_pic: {
          value: '',
          src: ''
        },
        real_name: '',
        id_card_num: '',
        organization_name: '',
        organization_address: '',
        organization_website: ''
      }
    }
  },
  components: { Button },
  computed: {
    formErr () {
      let obj = {
        avatar: {
          err: !this.input_data.avatar.value,
          err_text: '请上传头像'
        },
        toutiao_name: {
          err: !this.input_data.toutiao_name || this.input_data.toutiao_name.length > 10,
          err_text: '请输入1~10字，不含特殊符号的头条号名称'
        },
        phone: {
          err: !(/^1[34578][0-9]\d{8}$/.test(this.input_data.phone)),
          err_text: '请输入正确的联系电话'
        },
        area: {
          err: !this.input_data.area,
          err_text: '请选择专注的领域'
        },
        intro: {
          err: !this.input_data.intro || this.input_data.intro.length < 10 || this.input_data.intro.length > 30,
          err_text: '请选择专注的领域'
        },
        id_card_pic: {
          err: !this.input_data.id_card_pic.value,
          err_text: '请上传手持身份证正面照'
        },
        real_name: {
          err: !this.input_data.real_name,
          err_text: '请输入真实姓名'
        },
        id_card_num: {
          err: !this.input_data.id_card_num,
          err_text: '请输入身份证号'
        },
        organization_name: {
          err: !this.input_data.organization_name,
          err_text: '请输入组织名称'
        },
        organization_address: {
          err: !this.input_data.organization_address,
          err_text: '请输入组织地址'
        },
        agreement: {
          err: !this.agreement,
          err_text: '需阅读并同意范团用户协议'
        }
      }
      let err_num = 0
      for (let i in obj) {
        if (obj[i].err) {
          err_num += 1
        }
      }
      obj.err_num = err_num
      return obj
    }
  },
  methods: {
    viewAppear () {
      console.log('viewAppear')
      const animation = weex.requireModule('animation')
      const animation_el = this.$refs['wrapper']
      animation.transition(animation_el, {
        styles: {
          'backgroundColor': '#f5f5f5'
        },
        duration: 500, //ms
        timingFunction: 'ease',
        delay: 0 //ms
      })
    },
    pickImage () {
      modal.toast({
        message: 'pickImage',
        duration: 0.3
      })
      Nat.image.pick({
        limit: 3,
        showCamera: true
      }, (err, ret) => {
        console.log(ret.paths)
      })
    },
    pickArea () {
      if (!this.input_data.area_arr || this.input_data.area_arr.length === 0) {
        this.initArea(this.pickArea)
        return false
      }
      picker.pick({
        index: this.input_data.area_selected || 0,
        items: this.input_data.area_label_arr,
        textColor: '#333333',
        confirmTitle: '确认',
        cancelTitle: '取消',
        confirmTitleColor: '#1EB0FD',
        cancelTitleColor: '#666666',
        title: '选择专注领域',
        titleColor: '#333333'
      }, event => {
        if (event.result === 'success') {
          this.input_data.area_selected = event.data
          this.input_data.area = this.input_data.area_arr.filter(item => item.label === this.input_data.area_label_arr[event.data])[0].value
        }
      })
    },
    initArea (callback) {
      this.$fetchData(
        this.$domain + '/news/apply/initform',
        {},
        {
          success: (res) => {
            if (res && Boolean(res.error) && res.msg) {
              modal.toast({
                message: res.msg,
                duration: 2
              })
            } else if (res && !Boolean(res.error)) {
              this.input_data.area_arr = res.data.category_list
              this.input_data.area_label_arr = res.data.category_list.map((item) => {
                return item.label
              })
              callback && callback()
            }
          },
          fail: (res) => {
            console.log('fail', res)
          }
        }
      )
    },
    changeAgreement () {
      this.agreement = !this.agreement
    },
    stopPropagation (event) {
      event.stopPropagation()
    },
    goAgreement (event) {
      // 跳转范团头条用户协议
      this.$FtNavigator.push({weex_url: 'toutiaoAgreement', web_url: '/toutiao/agreement'})
      event.stopPropagation()
    },
    removeStorage (key, callback) {
      storage.removeItem(key, event => {
        callback && callback(event)
      })
    },
    goNext () {
      this.validate = true
      console.log('goNext', this.formErr.err_num)
      if (this.formErr.err_num > 0) {
        return false
      }
      let sData = {
        token: '',
        account_type: this.account_type,
        name: this.account_type,
        avatar: this.input_data.avatar.value,
        intro: this.input_data.intro,
        cid: this.input_data.area,
        phone: this.input_data.phone,
        real_name: this.input_data.real_name,
        idcard: this.input_data.id_card_num,
        id_img: this.input_data.id_card_pic.value,
        company: this.input_data.organization_name,
        address: this.input_data.organization_address,
        link: this.input_data.organization_website
      }
      this.$fetchData(
        this.$domain + '/news/apply',
        sData,
        {
          before: () => {
            this.stop_apply = true
          },
          after: () => {
            this.stop_apply = false
          },
          success: (res) => {
            if (res && Boolean(res.error) && res.msg) {
              modal.toast({
                message: res.msg,
                duration: 2
              })
            } else if (res && !Boolean(res.error)) {
              modal.toast({
                message: '申请成功提交',
                duration: 1
              })
              this.$FtNavigator.push({weex_url: 'applyToutiaoSuccess', web_rul: '/toutiao/success'})
            }
          },
          fail: (res) => {
            console.log('fail', res)
          }
        }
      )
    }
  },
  created () {
    this.initArea()
    storage.getItem('apply_account_type', event => {
      if (event.result.toString() === 'success' && event.data) {
        this.account_type = event.data
        if (event.data.toString() === '1') { // 个人
          storage.getItem('apply_form_person', eve => { // 获取个人表单缓存数据
            if (eve.result.toString() === 'success' && eve.data) {
              this.input_data = JSON.parse(eve.data)
              this.removeStorage('apply_form_person')
              this.show_page = true
            } else {
              this.show_page = true
            }
          })
        } else { // 组织机构
          storage.getItem('apply_form_organization', eve => { // 获取组织机构表单缓存数据
            if (eve.result.toString() === 'success' && eve.data) {
              this.input_data = JSON.parse(eve.data)
              this.removeStorage('apply_form_organization')
              this.show_page = true
            } else {
              this.show_page = true
            }
          })
        }
        this.removeStorage('apply_account_type', (eve) => {
          if (eve.result.toString() !== 'success') {
            this.removeStorage('apply_account_type')
          }
        })
      } else {
        this.show_page = true
      }
    })
  },
  beforeDestroy () {
    let _obj = Object.assign({}, this.input_data)
    console.log('_obj', _obj)
    if (this.account_type.toString() === '1') { // 个人
      storage.setItem('apply_form_person', JSON.stringify(_obj))
    } else { // 组织机构
      storage.setItem('apply_form_organization', JSON.stringify(_obj))
    }
  }
}
</script>

<style scoped>
  .section{
    width:750px;
    padding-top:35px;
    padding-left:30px;
    padding-right:30px;
    align-items:stretch;
  }
  .section-header{
    font-size:48px;
    line-height:58px;
    font-weight:700;
    color:#333333;
  }
  .item-title{
    font-size:28px;
    line-height:38px;
    color:#333333;
  }
  .err-tip{
    flex-direction: row;
    align-items:center;
    justify-content: flex-start;
    margin-left:23px;
  }
  .err-icon{
    width:24px;
    height:24px;
    margin-right:19px;
  }
  .err-title{
    font-size:24px;
    line-height:24px;
    color:#FF3F53;
  }
  .form-item{
    margin-top:35px;
  }
  .err-item{
    border-bottom-width:1px;
    border-bottom-color:#FF3F53;
  }
  .correct-item{
    border-bottom-width:1px;
    border-bottom-color:#e5e5e5;
  }
  .item-value-tip{
    flex-direction: row;
    padding-top:20px;
  }
  .item-value{
    font-size:32px;
    line-height:72px;
    height:72px;
    flex:1;
    font-weight:700;
    flex-direction:row;
    align-items:center;
  }
  .correct-textarea{
    font-size:32px;
    line-height:40px;
    color:#333333;
    font-weight:700;
    padding-top:16px;
    padding-bottom:14px;
    padding-left:12px;
    padding-right:12px;
    border-radius:4px;
    border-width:1px;
    border-color:#e5e5e5;
    margin-top:35px;
    height:152px;
  }
  .err-textarea{
    font-size:32px;
    line-height:40px;
    color:#333333;
    font-weight:700;
    padding-top:16px;
    padding-bottom:14px;
    padding-left:12px;
    padding-right:12px;
    border-radius:4px;
    border-width:1px;
    border-color:#FF3F53;
    margin-top:35px;
    height:152px;
  }
  .empty-input{
    font-weight:400;
    color:#999999;
  }
  .section-separator{
    width:750px;
    height:10px;
    background-color:#E5E5E5;
    margin-top:40px;
  }
</style>
