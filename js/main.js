

var vm=new Vue({
    el:'#app',
    data:{
       appKey:'51511235a0ef510d',
       key:'53oSwuRV3DTS8TiCpAjjuUdRaChTlcXP',
       salt:(new Date).getTime(),
       q:'',
       from:'',
       to:'',
       res:{},
           // 翻译后的文字
      q300:'',
      // 翻译后的音频地址
      audioSrc:'',
      //  element ui 单选框数据 待翻译的语种
      optionsFrom: [{
        value: 'zh-CHS',
        label: '中文'
      }, {
        value: 'yue',
        label: '粤语'
      }, {
        value: 'en',
        label: '英文'
      }, {
        value: 'ja',
        label: '日文'
      }, {
        value: 'ko',
        label: '韩文'
      }, {
        value: 'fr',
        label: '法文'
      }, {
        value: 'es',
        label: '西班牙文'
      }, {
        value: 'ru',
        label: '俄文'
      }],
    // 单选框  目标翻译的语种
     optionsTo: [{
      value: 'zh-CHS',
      label: '中文'
    }, {
      value: 'yue',
      label: '粤语'
    }, {
      value: 'en',
      label: '英文'
    }, {
      value: 'ja',
      label: '日文'
    }, {
      value: 'ko',
      label: '韩文'
    }, {
      value: 'fr',
      label: '法文'
    }, {
      value: 'es',
      label: '西班牙文'
    }, {
      value: 'ru',
      label: '俄文'
    }],
    // dialog显示
    centerDialogVisible: false,
  },
    methods:{
// 翻译方法

  // ------------------------------------------------------------------
 doTranslate(){
   axios.jsonp('https://openapi.youdao.com/api',
       {
          params: {
          q: this.q,
          appKey: this.appKey,
          salt: this.salt,
          from: this.from,
          to: this.to,
          sign: this.sign,
          signType: "v3",
          curtime: this.curTime
      }
          }).then((data)=>{
          this.res = data
          console.log(this.res);
          this.q300 = this.res.translation[0];
          this.audioSrc=this.res.tSpeakUrl;
          this.centerDialogVisible = true;
          }).catch(function(error){
                 console.log(error);
                })
        },
        // 关闭dialog刷新页面
    doRefresh(){
      location.reload();
    }
  
  
     },
    computed: {
      q1:function(){
        var len = this.q.length;
        if (len <= 20) return this.q;
        return this.q.substring(0, 10) + len + this.q.substring(len - 10, len);
      },
      curTime:function(){
       return Math.round(new Date().getTime() / 1000)
      },
      str1:function(){
        return this.appKey + this.q1 + this.salt + this.curTime + this.key
      },
      sign:function(){
        return sha256(this.str1)
      }
    }
 });