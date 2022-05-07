<template>
  <div>
    <el-tree :props="props" :load="loadNode" lazy accordion @node-click="cliclNode"> </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      }
    }
  },
  methods: {
    //点击事件，给GoodsDialog传值
    cliclNode(data,node) {
      this.$emit('changeNode',data)
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.$api.getTreeList().then(({ data: res }) => {
          return resolve(res.result)
        })
      }
      if (node.level >= 1) {
        this.$api.getTreeList({ id: node.data.cid }).then((res) => {
          if (res.data.status === 200) {
            return resolve(res.data.result)
          } else {
            return resolve([])
          }
        })
      }
    }
  }
}
</script>

<style></style>
