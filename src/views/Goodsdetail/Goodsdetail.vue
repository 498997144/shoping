<template>
  <div class="goods-detail-container">
<!--    顶部导航区-->
    <Topbar class="top-bar">
      <span slot="left" class="iconarrow-lift" @click="$router.go(-1)"></span>
      <li slot="middle" @click="tabClick(index)" :class="{hotpink:index == currentIndex}"
          v-for="(item,index) in titles" :key="index" >{{item}}</li>
    </Topbar>
<!--    祥情轮播区-->
    <swiper ref="detailSwiper" :options="swiperOptions" class="swiper">
      <swiper-slide v-for="(item,index) in swiperData" :key="index" class="swiper-slide">
        <a>
          <img :src="item">
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
<!--    祥情信息展示-->
    <div ref="shop" class="detail-info">
      <p class="title">{{detailInfo.itemInfo.title}}</p>
      <ul class="price">
        <li class="realprice hotpink">{{detailInfo.itemInfo.lowNowPrice}}</li>
        <li class="oldpcice">{{ detailInfo.itemInfo.oldPrice }}</li>
        <li class="sale">{{ detailInfo.itemInfo.discountDesc }}</li>
      </ul>
      <ul class="detail">
        <li v-for="(item,index) in detailInfo.columns" :key="index">{{ item }}</li>
      </ul>
      <ul class="service">
        <li v-for="(item,index) in  detailInfo.services.slice(1)" :key="index">
          <img :src="item.icon">
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div  >
<!--    店铺信息展示-->
    <Shopinfo :shopInfo="shopInfo"></Shopinfo>
<!--    商店祥细信息描述-->
    <Detaildescribe :detailDescribe="detailDescribe"></Detaildescribe>
<!--    商品祥情参数-->
    <Detailparams :Detailparams="detailParams" ref="params"></Detailparams>
<!--    评论区-->
    <Comment :comment="comment" ref="comment" @loadEnd="loadEnd"></Comment>
<!--    推荐区-->
    <Recommend :recommend="recommend" ref="recommend"></Recommend>
<!--    底部栏-->
    <Bottombar></Bottombar>
<!--    返回顶部按钮-->
    <Backtop v-show="backTop" @click.native="backClick"></Backtop>
  </div>
</template>

<script>
  import Topbar from "../../components/common/topbar/Topbar";
  import Shopinfo from "./children/Shopinfo";
  import Detaildescribe from "./children/Detaildescribe";
  import Detailparams from "./children/Detailparams";
  import Comment from "./children/Comment";
  import Recommend from "./children/Recommend";
  import Bottombar from "./children/Bottombar";
  import {backTop} from "../../common/mixin";
  
    export default {
        name: "Goodsdetail",
        data(){
            return {
                id:this.$route.params.id, //商品祥情ID
                titles:['商品','参数','评论','推荐'], //顶部导航数据
                currentIndex:0, // 顶部导航索引
                swiperData:[], //轮播图数据
                swiperOptions: {
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    loop: true,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false,
                    },
                    speed: 750,
                    initialSlide: 1,
                    // zoom:true,
                }, //轮播图配置
                detailInfo:{
                    itemInfo:{},
                    columns:[],
                    services:[],
                }, //祥情信息数据
                shopInfo:{}, //店铺信息数据
                detailDescribe:{}, //商品祥情描述数据
                detailParams:{}, //祥情数据
                comment:{},//评论数据
                recommend:[], //推荐数据
                EloffsetTops:[], //组件距离顶部的高度;
                scrollEnd:true,
                scrollTimer:null,
            }
        },
        
        computed:{
            shopoffsetTop(){
                return this.$refs.shop.offsetTop;
            },
            paramsoffsetTop(){
                return this.$refs.params.$el.offsetTop
            },
            commentoffsetTop(){
                return this.$refs.comment.$el.offsetTop
            },
            recommendoffsetTop(){
                return this.$refs.recommend.$el.offsetTop
            },
        },
        methods:{
            //等待子组件图片加完成再绑定滚动事件，准确获取距离顶部的高度。
            loadEnd(){
                window.addEventListener('scroll',this.windowScrolltab);
            },
            //窗口滚动事件，tab切换联动
            windowScrolltab(){
                const [[a,b,c,d]] = [[this.shopoffsetTop,this.paramsoffsetTop,this.commentoffsetTop,this.recommendoffsetTop]]
                if(!this.EloffsetTops.length){
                    this.EloffsetTops.push(a,b,c,d);
                }
                console.log(this.EloffsetTops);
                if(this.scrollTimer){
                    clearTimeout(this.scrollTimer);
                }
                this.scrollTimer = setTimeout(()=> {
                    this.scrollEnd = true;
                    if(this.scrollEnd){
                       if(this.EloffsetTops.length == 4 ){
                           this.EloffsetTops.push(1000000);
                       }
                        for(let i = 0;i <  this.EloffsetTops.length - 1;i++){
                            if (this.currentIndex !== 0 && window.pageYOffset >=  this.EloffsetTops[i] && window.pageYOffset < this.EloffsetTops[i + 1]){
                                this.currentIndex = i;
                            }
                        }
                        // this.EloffsetTops.forEach((item,index)=>{
                        //     if(this.currentIndex !== index && ((index < this.EloffsetTops.length - 1 && window.pageYOffset >= item && window.pageYOffset < this.EloffsetTops[index+1])
                        //         || (index == this.EloffsetTops.length - 1 && window.pageYOffset >= item))){
                        //         this.currentIndex = index;
                        //     }
                        // });
                    }
                },30);
                
            },
            //获取tab联动元素距离顶部的高度
            // getElementHeight(){
            //    this.EloffsetTops.push(this.$refs.shop.offsetTop);
            //    this.EloffsetTops.push(this.$refs.params.$el.offsetTop);
            //    this.EloffsetTops.push(this.$refs.comment.$el.offsetTop);
            //    this.EloffsetTops.push(this.$refs.recommend.$el.offsetTop);
            //     console.log(this.EloffsetTops)
            // },
            //tab点击切换
            //点击tab切换
            tabClick(index){
                console.log(this.EloffsetTops);
                this.scrollEnd = false;
                const [[a,b,c,d]] = [[this.shopoffsetTop,this.paramsoffsetTop,this.commentoffsetTop,this.recommendoffsetTop]]
                if(!this.EloffsetTops.length){
                    this.EloffsetTops.push(a,b,c,d);
                }
                this.currentIndex = index;
                window.scroll(0,this.EloffsetTops[this.currentIndex])
            },
            //根据ID请求祥情页数据
            async getDetaildata(id){
                let response = await this.axios.get('/detail',{params:{iid:id}});
                const data = response.data.result;
                this.swiperData = data.itemInfo.topImages; //轮播图数据
                //祥情信息数据
                this.detailInfo.itemInfo = data.itemInfo;
                this.detailInfo.columns = data.columns;
                this.detailInfo.services = data.shopInfo.services;
                //店铺信息数据
                this.shopInfo = data.shopInfo;
                //商品祥情描述数据
                this.detailDescribe = data.detailInfo;
                //祥情参数数据
                this.detailParams = data.itemParams;
                //评论数据
                this.comment = data.rate;
                
            },
            //请求推荐区域数据
            async getRcommend(){
                const response = await this.axios.get('/recommend');
                const data = response.data.data;
                this.recommend = data.list;
            },
        },
        created() {
            //请求祥情页数据
            this.getDetaildata(this.id);
            this.getRcommend();
        },
        mounted(){
            window.scroll(0,0);
        },
        updated(){
           
            //不一定能准确无误的获取正确的值
            // this.$nextTick(()=>{
            //     const [[a,b,c,d]] = [[this.shopoffsetTop,this.paramsoffsetTop,this.commentoffsetTop,this.recommendoffsetTop]]
            //     if(!this.EloffsetTops.length){
            //         this.EloffsetTops.push(a,b,c,d);
            //     }
            // })
            //使用此方法也无法准确获取到正确的值
            // this.$nextTick(()=>{
            //     // if(!this.EloffsetTops.length){
            //     //     this.getElementHeight();
            //     // }
            // });
        },
        destroyed(){
            window.removeEventListener("scroll", this.windowScrolltab);
        },
        mixins:[backTop],
        components:{
            Topbar,
            Shopinfo,
            Detaildescribe,
            Detailparams,
            Comment,
            Recommend,
            Bottombar,
        },
    }
</script>

<style lang="less" scoped>
  .goods-detail-container{
    /*padding: 1.111rem 0;*/
    margin: 1.111rem 0;
    position: absolute;
    z-index: 5;
    width: 10rem;
    background-color: white;
  }
  /*顶部导航区域*/
  .top-bar{
    background-color: #f4f4f4;
    z-index: 5;
    span{
      font-size: 0.926rem;
    }
    li{
      flex: 1;
      font-size: 0.333rem;
      line-height: 1.111rem;
    }
  }

/*  轮播图区域*/
.swiper{
  
  min-height: 5.2rem;
  .swiper-slide{
    a{
      display: block;
      width: 100%;
      height: 5.2rem;
      overflow: hidden;
      position: relative;
      img{
        width: 100%;
        position: absolute;
        top: -1.852rem;
        left: 0;
      }
    }
  }
}

  /*祥情信息*/
  .detail-info{
    
    .title{
      height: 0.778rem;
      padding:0 0.278rem;
      margin: 0.185rem 0;
      line-height: 1.2;
      font-size: 0.333rem;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      
    }
    .price{
      display: flex;
      background-color: #fafafa;
      border-bottom: 1px solid#eeeeee;
      padding: 0.093rem 0;
      height: 0.667rem;
      li{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.852rem;
        margin-left: 0.278rem;
      }
      .realprice{
        font-size: 0.463rem;
      }
      .oldpcice{
        text-decoration-line: line-through;
        margin-top: 0.185rem;
      }
      .sale{
        border-radius: 0.222rem;
        background-color: hotpink;
        color: white;
        box-shadow: 0px 1px 3px 2px #ff79f9;
      }
    }
    
    .detail{
      display: flex;
      /*padding: 0.093rem 0;*/
      justify-content: space-around;
      background-color:#fafafa;
      border-bottom: 1px solid #eeeeee;
      height: 0.667rem;
      li{
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
      }
    }
  
    .service{
      display: flex;
      justify-content: space-around;
      height: 0.667rem;
      border-bottom: 1px solid #eeeeee;
      background-color: #fafafa;
      li{
        display: flex;
        justify-content: center;
        align-items: center;
        flex: auto;
        font-size: 12px;
      }
      img{
          width: 14px;
          margin-right: 0.093rem;
      }
    }
    
    
  }
</style>