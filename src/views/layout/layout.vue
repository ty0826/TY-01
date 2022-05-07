<template>
  <div class="layout">
    <!-- 左侧导航部分 -->
   <div class="menu" :iscollapse="isCollapse"> 
     <Mymenu :iscollapse="isCollapse" ></Mymenu>
     </div>
    <!-- 右侧内容部分 -->
   <div class="content">
      <Content @change="Collapses" :class="{isActive:isCollapse }"  :isCollapse="isCollapse"></Content>
   </div>
  </div>
</template>

<script>
import Mymenu from '@/views/layout/Mymenu.vue'
import Content from '@/views/layout/Content.vue'
export default {
  data(){
    return{
    isCollapse:false
    }
  },
  methods:{
    Collapses(){
      this.isCollapse=!this.isCollapse
    }
  },
components:{
  Mymenu,
  Content
}
}
</script>

<style lang='less' scoped>
.layout{
  width: 100%;
  display: flex;
  .menu{
    // width: 200px;
    // min-height: 700px;
    background-color: rgba(226, 14, 14, 0.933);
    position:fixed;
    bottom: 0;
    top: 0;
  }
  .content{
    width: 1336px;
    margin-left: 200px;
  }
  .isActive{
    width: 1460px;
    margin-left: -138px;
  }
}
 

</style>