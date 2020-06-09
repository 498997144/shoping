<template>
  <div class="home-container">
<!--    顶部栏区域-->
    <topbar class="top-bar">
      <p slot="middle">购物街</p>
    </topbar>
<!--    轮播区域-->
    <swiper ref="mySwiper" :options="swiperOptions" class="swiper">
      <swiper-slide v-for="(item) in swiperData" :key="item.image" class="swiper-slide">
        <a :href="item.link">
          <img :src="item.image" :alt="item.title" :title="item.title">
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
<!--    推荐区域-->
    <ul class="recommend">
      <li v-for="(item,index) in recommendData" :key="index">
        <a :href="item.link">
          <img :src="item.image" :alt="item.title" :title="item.title">
          <span>{{item.title}}</span>
        </a>
      </li>
    </ul>
<!--    特点区域-->
    <feature></feature>
<!--    切换导航区域-->
    <tabcontorl class="tab-contorl" @tabToogle="tabToogle" ref="tabcontorl"></tabcontorl>
    <!--    swiper滑动上拉刷新，下拉加载更多-->
    <swiper class="local-swiper" :options="swiperScrolloption" ref="swiper" style="height:8.889rem;padding-bottom:3px;">
      <div class="refresh" ref="refresh">释放刷新</div>
      <swiper-slide style="height:auto;">
        <!--    商品列表区域-->
        <Goodslist :goods="goodsList"></Goodslist>
      </swiper-slide>
      <div class="loadmore" ref="loadmore">加载更多</div>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
<!--    返回顶部按钮-->
    <Backtop v-show="backTop" @click.native="backClick"></Backtop>
  </div>
</template>

<script>
  import Topbar from "../../components/common/topbar/Topbar";
  import Feature from "./homechild/Feature";
  import Tabcontorl from "../../components/content/tabcontorl/Tabcontorl";
  import Goodslist from "../../components/content/goods/Goodslist";
  import Backtop from "../../components/common/backtop/Backtop";
  export default {
      name:'Home',
      data(){
          return {
              refreshEnd:false,   //刷新结束控制
              loadmoreEnd:false,  //加载结束控制
              backTop:false,      //返回顶部控制
              swiperData: [],     //轮播图数据
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
              }, //轮播图配置
              recommendData: [],    //推荐区域数据
              goods: {
                  pop: {page: 0, list: []},
                  new: {page: 0, list: []},
                  sell: {page: 0, list: []},
              },         //商品数据
              currentType: 'pop',   //请求商品数据类型,默认为pop
              swiperScrolloption: {
                  scrollbar: {
                      el: '.swiper-scrollbar',
                      // hide: true,
                  },
                  direction:'vertical',
                  slidesPerView:'auto',
                  freeMode:true,
                  mousewheel: true,
                  setWrapperSize: true,
                  on:{
                      //下拉发送请求刷新数据
                      touchMove:()=>{
                          const swiper = this.$refs.swiper.$swiper;
                          const refresh = this.$refs.refresh;
                          if(swiper.translate >100){
                              swiper.setTransition(300);
                              swiper.setTranslate(100);
                              swiper.touchEventsData.isTouched=false;
                              refresh.innerText = '正在刷新...';
                              swiper.allowTouchMove=false;
                              this.getGoodsdata(this.currentType);
                          }
                          const loadmore = this.$refs.loadmore;
                          let slidesheight = 0;
                          for(let i=0;i<swiper.slides.length;i++){
                              slidesheight+= swiper.slides[i].offsetHeight;
                          }
                          const endTranslate = swiper.height - slidesheight-100;
                          // console.log(endTranslate,'++++',swiper.translate)
                          if(swiper.translate < endTranslate){
                              loadmore.innerText = '正在加载';
                              swiper.allowTouchMove=false;
                              this.getGoodsdata(this.currentType,this.goods[this.currentType].page++);
                          }
                          if(swiper.translate < -3000){
                              this.backTop = true;
                          }
                          else {
                              this.backTop = false
                          }

                      },
                      touchStart: () => {
                          if (this.refreshEnd) {
                              const refresh = this.$refs.refresh;
                              refresh.innerText = '释放刷新';
                              this.refreshEnd = false;
                          }
                          if(this.loadmoreEnd){
                              const loadmore = this.$refs.loadmore;
                              loadmore.innerText = '释放加载';
                              this.loadmoreEnd = false;
                          }
                      },
                   // momentumBounce:() =>{
                   //     const swiper = this.$refs.swiper.$swiper;
                   //     const loadmore = this.$refs.loadmore;
                   //     // let slidesheight = 0;
                   //     // for(let i=0;i<swiper.slides.length;i++){
                   //     //     slidesheight+= swiper.slides[i].offsetHeight;
                   //     // }
                   //     // const endTranslate = swiper.height - slidesheight-60;
                   //     // if(swiper.translate < endTranslate){}
                   //     if(swiper.translate < -100){
                   //         loadmore.innerText = '正在加载';
                   //         swiper.allowTouchMove=false;
                   //         swiper.params.virtualTranslate=true;
                   //         this.getGoodsdata(this.currentType,this.goods[this.currentType].page++);
                   //     }
                   //
                   // },
                   
                  },
              },  //商口列表滚动区域配置
              windowscrollendY:0,//离开页面时窗口滚动的位置;
              swiperEnd_Y:0, //离开页面时swiper滚动的位置;
          }
      },
      computed:{
          goodsList(){
            return this.goods[this.currentType].list;
          }, //商品列表数据的属性计算
          tabresult(){
              return this.$refs.tabcontorl.$el.offsetTop;
          }, //获取吸顶元素距离顶部的原始值
          swiper(){
              return this.$refs.swiper.$swiper;
          },  // 拿到swiper对象的简写
          tabcontorl(){
              return this.$refs.tabcontorl.$el;
          },
      },
      methods:{
          //点击回到顶部方法 //商品列表一起返回顶部
          backClick(){
              window.scroll(0,0);
              this.$refs.swiper.$swiper.setTranslate(0);
              this.$refs.swiper.$swiper.setTransition(3000);
          },
          //tab切换展示对应的数据类型
          tabToogle(index){
              switch (index) {
                  case 0:
                      return this.currentType = 'pop';
                  case 1:
                      return this.currentType = 'new';
                  case 2:
                      return this.currentType = 'sell';
              }
          },
          //window滚动监听方法
          windowScroll(){
                  // if(window.pageYOffset >= 987){
                  //     this.backTop = true;
                  // }else {
                  //     this.backTop = false;
                  // }
                  this.windowscrollendY = window.pageYOffset;
                  if(window.pageYOffset + 60 >= this.tabresult){
                      this.tabcontorl.classList.add('tab-contorl-active');
                  }
                  else{
                      this.tabcontorl.classList.remove('tab-contorl-active');
                  }
          },
          
          //    网络请求相关方法
          //    请求轮播图，和推荐数据方法
          async getData() {
              const response = await this.axios.get('/home/multidata');
              if (response.status === 200) {
                  const data = response.data.data;
                  this.swiperData = data.banner.list;
                  this.recommendData = data.recommend.list;
              }
          },
          //    请求商品数据方法 控刷上拉加载和下拉刷新
          async getGoodsdata(type,page=1){
              const response = await this.axios.get(`/home/data`,{params:{type,page}});
              if(response.status === 200){
                  // console.log(response)
                  const data  = response.data.data.list;
                  this.goods[type].list = this.goods[type].list.concat(data);
                  this.goods[type].page++;
                
                
                  this.$refs.refresh.innertext = '数据更新完成';
                  this.$refs.loadmore.innertext = '数据加载完成';
                  this.refreshEnd=true;
                  this.loadmoreEnd=true;
                  this.$refs.swiper.$swiper.allowTouchMove=true;
                  this.$refs.swiper.$swiper.params.virtualTranslate=false;
                
              }
          }
      },
      created(){
          //发送请求获取轮播图，和推荐数据
          this.getData();
          //默认获取所有第一页商品列表数据
          this.getGoodsdata('pop');
          this.getGoodsdata('sell');
          this.getGoodsdata('new');
      },
      mounted(){
        //  显示返回顶部按钮以及吸顶效果
          window.addEventListener("scroll",this.windowScroll);
      },
      deactivated(){
          this.swiperEnd_Y = this.swiper.translate;
          window.removeEventListener('scroll',this.windowScroll);
      },
      activated(){
          window.scroll(0,this.windowscrollendY);
          this.swiper.setTranslate(this.swiperEnd_Y);
          window.addEventListener('scroll',this.windowScroll);
      },
      destroyed(){
          window.removeEventListener("scroll", this.windowScroll);
      },
      components:{
        topbar:Topbar,
        feature:Feature,
        tabcontorl:Tabcontorl,
        Goodslist,
        Backtop,
      },
  }
</script>

<style lang="less" scoped>
  /*首页整体调整*/
  .home-container{
    margin: 1.111rem 0;
  }
  
  /*顶部栏区域*/
  .top-bar{
    z-index: 5;
  p{
    color: white;
    font-size: 0.37rem;
    letter-spacing: 0.037rem;
  }
}

/*  轮播图区域*/
  .swiper{
    min-height: 5.2rem;
    .swiper-slide{
        a{
          display: block;
          width: 100%;
          img{
            width: 100%;
          }
        }
      }
  }
  
/*  推荐区域*/
  .recommend{
    display: flex;
    border-bottom: 0.185rem solid #eeeeee;
    border-top: 0.185rem solid #eeeeee;
    min-height: 2.296rem;
    li{
      flex:25%;
      a{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0.093rem 0;
        img{
          width: 1.481rem;
        }
        span{
          margin-top: 0.056rem;
          font-size:12px;
        }
      }
    }
  }
  
/*  导航切换区域以及吸顶动画*/
  @keyframes slowShow {
    from{
      opacity: 0;
    }
    to{
      opacity: 1;
    }
  }
  .tab-contorl{
    /*position: sticky;*/
    /*top: 1.111rem;*/
    background-color: #f4f4f4;
    z-index: 9;
  }
  .tab-contorl-active{
    position: fixed;
    width: 10rem;
    left: 50%;
    transform: translateX(-50%);
    top: 1.111rem;
    z-index: 9;
    animation:slowShow 0.7s ease;
  }
  
  /*上拉加载，下拉刷新区域*/
  .refresh{
    position:absolute;
    line-height:100px;
    top:-100px;
    left: 0;
    text-align:center;
    width:100%;
    font-size: 0.37rem;
  }
  .loadmore{
    position:absolute;
    line-height:100px;
    bottom:-100px;
    left: 0;
    text-align:center;
    width:100%;
    font-size: 0.37rem;
  }
  
</style>
