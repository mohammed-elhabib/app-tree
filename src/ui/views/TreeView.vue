<template>
  <div>
    <div class="header">
      <v-btn class="addScale" 
      small
        icon
        @click="changeScale(true)" 
        ><v-icon>mdi-magnify-plus-outline</v-icon></v-btn>
      <v-btn
        class="negativeScale"
        @click="changeScale(false)"
        small
        icon
        
        ><v-icon>mdi-magnify-minus-outline</v-icon></v-btn   >
    </div>
    <div
      :style="'height:' + heigthContainer + 'px; ' + scacle"
      ref="containerDiv"
      class="container"
    >
      <svg ref="linksContainer" class="element"></svg>
      <tree-node
        v-if="showPrint"
        ref="treeRef"
        :drowTree="drowTree"
        :linksContainer="container"
        @update-tree="updateTree"
        class="element"
        :item="treeItems"
      />
    </div>

  </div>
</template>

<script lang="ts">

import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import treeModule from "@/store/treeModule";

@Component({ components: {} })
export default class TreeView extends Vue {
  @Ref() linksContainer!: SVGSVGElement;
  @Ref() containerDiv!: HTMLDivElement;
  @Ref() treeRef!: any;
  @Prop() id!:number;
  scaleView = 1;
  drowTree = false;
  showPrint = false;
  updateTree() {
    this.drowTree = false;
    this.linksContainer.innerHTML = "";
    this.showPrint = false;
    this.$nextTick().then(() => {
      this.showPrint = true;
      this.$nextTick().then(() => {
        this.drowTree = true;
      });
    });
  }

  mounted() {
    treeModule.getTree(this.id).then(x=>{
        treeModule.setCuurrentTree(x); 
             this.showPrint = true;
             this.drowTree = true;
             this.updateTree()
    })
  }
  changeScale(add: boolean) {
    if (add) {
      this.scaleView += 0.1;
    } else {
      this.scaleView -= 0.1;
    }
  }
  get container() {
    return this.drowTree && this.linksContainer;
  }
  get treeItems() {
    return treeModule.currentTree?.root;
  }
  get heigthContainer() {
    return this.drowTree ? this.treeRef?.heigth : 0;
  }
  get scacle() {
    return "transform: scale(" + this.scaleView + ");";
  }
}
</script>
<style scoped>
.container {
  position: relative;
  width: 100%;
  z-index: 10;
  margin-top:10px
}
.element {
  width: 100%;
  height: 100%;
  position: absolute;
}
.header {
  padding: 2px;
  width: 100%;
  border:1px solid cadetblue;
  z-index: 500;
}
</style>