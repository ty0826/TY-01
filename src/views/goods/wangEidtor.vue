<template>
  <div id="text"></div>
</template>

<script>
// 引入模块：
import E from 'wangeditor'
export default {
  data() {
    return {
      editor: ''
    }
  },
  mounted() {
    this.editor = new E('#text')
    this.editor.create()
    //自动焦点
    this.editor.config.focus = false
    // 配置 onchange 回调函数 获取输入内容
    this.editor.config.onchange = (newHtml) => {
      this.$emit('getNwehtml', newHtml)
    }
    //配置触发onchange的频率
    this.editor.config.onchangeTimeout = 500
  }
  // 1. 清空内容 editor.txt.clear() 清空编辑器内容。
  //  2. 设置内容 editor.txt.html('') 获取 html
  //   3. 配置菜单 1. 配置菜单使用 editor.config.menus 定义显示哪些菜单和菜单的顺序
  //   4. ，用户操作（鼠标点击、键盘打字等）导致的内容变化之后，会自动触发 onchange 函数执行
}
</script>

<style></style>
