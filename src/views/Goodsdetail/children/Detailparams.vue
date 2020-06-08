<template>
  <div v-if="Object.keys(Detailparams).length > 0" class="detail-params">
    <table class="size">
      <tr v-for="(item,index) in Detailparams.rule.tables[0]" :key="index">
        <td v-for="(item,index) in item" :key="index">{{item}}:</td>
      </tr>
    </table>
    
    <table class="address">
      <tr v-for="(item,index) in Detailparams.info.set" :key="index">
        <td>{{item.key}}:</td>
        <td>{{item.value}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
    export default {
        name: "Detailparams",
        props:['Detailparams'],
    }
</script>

<style lang="less" scoped>
.detail-params{
  margin-top: 0.185rem;
  table{
    display: flex;
    flex-direction: column;
    align-items: center;
    tr {
      display: flex;
      width: 9.259rem;
      border-bottom: 1px solid #b4b4b4;
  
      &:hover {
        background-color: #f2f2f2;
      }
  
      td {
        flex: 1;
        text-align: center;
        height: 0.648rem;
        line-height: 0.648rem;
        &:nth-child(1){
          flex: 16% 0 1;
        }
        
      }
    }
  }
  
  /*.address{*/
  /*  display: flex;*/
  /*  flex-direction: column;*/
  /*  align-items: center;*/
  /*  tr{*/
  /*    display: flex;*/
  /*    width: 9.259rem;*/
  /*    border-bottom: 1px solid #b4b4b4;*/
  /*    &:hover{*/
  /*      background-color:hotpink;*/
  /*    }*/
  /*    td{*/
  /*      flex: 1;*/
  /*      text-align: center;*/
  /*      height: 0.648rem;*/
  /*      line-height: 0.648rem;*/
  /*    }*/
  /*  }*/
  /*}*/

}
</style>