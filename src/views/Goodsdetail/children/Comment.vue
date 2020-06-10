<template>
  <div v-if="Object.keys(comment).length > 0 && comment.list" class="comment">
    <div class="title">
      <span>用户评价</span>
      <a href="javascript:;">更多</a>
    </div>
    <div class="avatar">
      <img :src="comment.list[0].user.avatar" @load="loadEnd">
      <span class="uname">{{comment.list[0].user.uname }}</span>
      <span>{{ comment.list[0].created | dateFormat}}</span>
    </div>
    <div class="content">
      <p>{{ comment.list[0].content }}</p>
      <div class="photo">
        <img v-for="(item,index) in comment.list[0].images" :src="item" :key="index">
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Comment",
        props:['comment'],
        methods:{
            loadEnd(){
                this.$emit('loadEnd')
            },
        },
    }
</script>

<style lang="less" scoped>
  .comment{
    margin-top: 0.185rem;
    .title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding:0 0.556rem;
      height: 0.741rem;
      border-top: 3px solid hotpink;
    }
    .avatar{
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 3px solid hotpink;
      padding:0.093rem 0;
      img{
        width: 0.741rem;
        border-radius:50%;
      }
      .uname{
        margin: 0 0.556rem;
      }
    }
    .content{
      border-top: 3px solid hotpink;
      p{
        text-indent: 2em;
        margin:0.185rem 0.37rem ;
      }
      .photo{
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        img{
          height: 1.852rem;
          margin:5px 10px;
        }
      }
    }
    
  }

</style>