<template>
  <div v-if="Object.keys(detailDescribe).length !== 0" class="describe-container">
    <p class="desc">{{detailDescribe.desc}}</p>
    <div class="model">{{detailDescribe.detailImage[0].key}},模特图片</div>
    <vue-preview :slides="photoData()" class="img-prev"></vue-preview>
    
    <div class="service">
      <img class="service-img" :src="servicePhoto.src">
      <div class="preview">点击图片预览更多高清大图</div>
    </div>
    
<!--    <ul class="img-list">-->
<!--      <img v-for="(item,index) in detailDescribe.detailImage[0].list" :src="item" :key="index" title="模特图片" alt="模特图片">-->
<!--    </ul>-->
  </div>
</template>

<script>
    export default {
        name: "Detaildescribe",
        props:['detailDescribe'],
        data(){
            return {
                servicePhoto:{},
            }
        },
        methods:{
            //修改图片数据列表
            photoData(){
                const photoData = this.detailDescribe.detailImage[0].list.map((item)=>{
                    const photo = {};
                    photo.w = item.split('_')[2].split('.')[0].split('x')[0];
                    photo.h = item.split('_')[2].split('.')[0].split('x')[1];
                    photo.src = item;
                    photo.msrc = item;
                    photo.title = '模特图片';
                    photo.alt = '模特图片';
                    return photo
                });
                this.servicePhoto =  photoData.pop();
                return photoData
            }
        },
        
    }
</script>

<style lang="less" scoped>
 .describe-container {
    margin-top: 0.185rem;
  
    .desc {
      position: relative;
      padding: 0.37rem 0.741rem;
    
      &::after {
        content: '';
        display: block;
        width: 1.481rem;
        height: 3px;
        background-color: hotpink;
        position: absolute;
        top: 0;
        left: 0.37rem;
      }
    
      &::before {
        content: '';
        display: block;
        width: 1.481rem;
        height: 3px;
        background-color: hotpink;
        position: absolute;
        bottom: 0;
        right: 0.37rem;
      }
    }
  
    .model {
      font-size: 16px;
      padding: 0 0.37rem;
      text-align: center;
      margin: 0.185rem 0;
    }
  
   .service{
     position: relative;
     
     .service-img{
       width: 100%;
     }
     .preview{
       position: absolute;
       width: 7.407rem;
       height: 40px;
       font-size: 16px;
       background-color: rgba(0,0,0,0.3);
       text-align: center;
       line-height: 40px;
       top: -0.926rem;
       left: 50%;
       color: white;
       transform: translateX(-50%);
       
     }
    
   }
   
  
    /*ul{*/
    /*  img{*/
    /*    width: 100%;*/
    /*    margin-bottom:0.185rem;*/
    /*  }*/
    /*}*/
  
    /deep/ .img-prev {
      .my-gallery {
        display: flex;
        overflow: hidden;
        figure {
          flex:100% 0 0;
          padding:10px 20px;
          a {
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 7.407rem;
              height: 7.407rem;
            }
          }
        }
      }
    }
    
  }
  
</style>