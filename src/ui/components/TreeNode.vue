<template>
  <div class="vue-tree" >
    <div class="dom-container" ref="treeRef">
      <div class="children" v-if="leftDirection">
        <div v-for="(chlid, i) in leftChlidren" :key="i">
          <tree-node
            :lavel="nextLavel"
            :drowTree="drowTree"
            :parentPosition="position"
            @update-tree="$emit('update-tree')"
            direction="left"
            :linksContainer="linksContainer"
            :parent="valueRef"
             @delete="deleteChild"
            :item="chlid"
          />
        </div>
      </div>
      <div ref="valueRef" class="value"  >
        <div class="d-flex align-center"> 
             <v-img v-if="item.imageUrl"  max-height="50"  max-width="100" contain :lazy-src="item.imageUrl"></v-img>
             <v-img v-else  max-height="50"  max-width="100" contain :lazy-src="imge"></v-img>
          
          <span>
            {{ item.title }}
          </span>
        </div>
        <v-menu  elevation="0"   offset-y left>
      <template v-slot:activator="{ on, attrs }">
                <v-btn small icon  v-on="on" v-bind="attrs" class="menu-btn"
          ><v-icon>mdi-dots-vertical</v-icon></v-btn
        ></template>
              <v-list>
        <v-list-item
        @click="addChild"
        >
          <v-list-item-title class="text-capitalize"  >new chlid</v-list-item-title>
        </v-list-item>   
         <v-list-item
         v-if="lavel!==0"
        >
          <v-list-item-title class="text-capitalize" @click="$emit('delete',item)">delete</v-list-item-title>
        </v-list-item>
      </v-list>
        </v-menu>
      
      </div>

      <div class="children" v-if="rightDirection">
        <div v-for="(chlid, i) in rightChlidren" :key="i">
          <tree-node
            :lavel="nextLavel"
           :drowTree="drowTree"
            :parentPosition="position"
            direction="right"
            :linksContainer="linksContainer"
            @update-tree="$emit('update-tree')"
            :parent="valueRef"
            :item="chlid"
            @delete="deleteChild"
          />
        </div>
      </div>
    </div>
    <AddTreeNodeView :node="item" v-if="addChildDailog" @close="addChildDailog=false" :isOpened="addChildDailog" @added="added"/>

  </div>
</template>

<script lang="ts">
import AddTreeNodeView from "@/ui/views/AddTreeNodeView.vue"

import { Vue, Component, Prop, Ref, Watch } from "vue-property-decorator";
import * as d3 from "d3";
import INode from "@/entities/node.type";
@Component({ components: {AddTreeNodeView} })
export default class TreeNode extends Vue {
  @Prop() item!: INode;
  @Prop() parent!: HTMLDivElement;
  @Ref() valueRef!: HTMLDivElement;
  @Ref()  treeRef!:HTMLDivElement;
  @Prop() linksContainer!: SVGSVGElement;
  @Prop() parentPosition!: [any, any];
  @Prop({ default: 0 }) lavel!: number;
  @Prop({ default: "" }) direction!: string;
  @Prop() drowTree!: boolean;
  addChildDailog=false
  localParent = [0, 0];
  offsetLeft = 0;
  offsetTop = 0;
  imge="https://i.pinimg.com/originals/5c/4d/1a/5c4d1ac934848c57de3b11effb65853a.png";
  first=false;
  mounted() {
    this.first=true;
    this.offsetLeft =
      this.direction === "left"
        ? this.valueRef.offsetLeft + this.valueRef.offsetWidth
        : this.valueRef.offsetLeft;
    this.offsetTop = this.valueRef.offsetTop;
  }

  get leftChlidren() {
    return this.lavel == 0
      ? (this.item.children as any[])?.slice(
          0,
          (this.item.children as any[]).length / 2
        )
      : this.item.children;
  }
  get nextLavel() {
    return this.lavel + 1;
  }
  get rightChlidren() {
    return this.lavel == 0
      ? (this.item.children as any[])?.slice(
          (this.item.children as any[]).length / 2,
          (this.item.children as any[]).length
        )
      : this.item.children;
  }
  get leftDirection() {
    return (
      (this.lavel == 0 || this.direction === "left") &&
      (this.item.children as any[])?.length > 0
    );
  }
  get rightDirection() {
    return (
      (this.lavel == 0 || this.direction === "right") &&
      (this.item.children as any[])?.length > 0
    );
  }
  get position() {
    return this.offsetTop !== 0 && this.offsetLeft !== 0
      ? [this.offsetLeft, this.offsetTop + 25]
      : undefined;
  }
  addChild() {
       this.addChildDailog=true;
  }
  added(){
    
    this.$emit('update-tree');
    this.addChildDailog=false;
  }
  deleteChild(child: INode){
    this.item.children= this.item.children.filter(x=>x!==child);
    this.$emit('update-tree');
  }
  @Watch("drowTree")
  drowLink() {
    if (this.drowTree&&this.parentPosition && this.position && this.linksContainer) {
      this.localParent[0] =
        this.direction === "left" && this.lavel > 1
          ? this.parentPosition[0] - this.parent.offsetWidth
          : this.direction === "right"
          ? this.parentPosition[0] + this.parent.offsetWidth
          : this.parentPosition[0];
      this.localParent[1] = this.parentPosition[1];
      const path = d3.path();
      path.moveTo(...this.position);
      path.lineTo(...this.localParent);
      this.linksContainer.innerHTML +=
        '<path  d=" ' +
        path.toString() +
        '" stroke="red" stroke-width="1" fill="none" />';
    }
  }
  get heigth(){
    return this.first&&this.treeRef.offsetHeight;
  }
}

</script>
<style scoped>
.dom-container {
  margin: 10px;
  display: flex;
  justify-content: center;
}
.value {
  margin-top: 10px;
  margin-right: 50px;
  padding: 10px;
  align-self: center;
  position: relative;
}
.value:hover{
  border: 1px solid gray;
}
.value:hover .menu-btn{
  visibility: visible;
}
.menu-btn {
  position: absolute;
visibility: collapse;
right: 0px;
top: 0px;
}
.point {
  font-size: 9px;
}
.v-sheet.v-list{
  padding: 0 !important;
  background:#dfdede;
}
::v-deep .v-list-item{
  min-height: 30px !important;
  border-bottom:1px solid gray ;
  cursor: pointer;
}
::v-deep .v-list-item .v-list-item__title{
  font-size: 12px;
  font-weight: bold;
}
</style>