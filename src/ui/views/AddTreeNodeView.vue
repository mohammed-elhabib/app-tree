<template>
  <v-dialog
  v-model="dialog"
  hide-overlay
  width="50%"

  >
  <v-container>
  <v-row>
  <v-col class="header d-flex text-white justify-center">
  Add New Child
  </v-col>
  </v-row>
  <v-row>
        <v-col cols="3" class="d-flex   align-center">Parent</v-col>

  <v-col class="d-flex  py-10 align-center"> 
             <v-img max-height="50" max-width="100" contain :lazy-src="node.imageUrl"></v-img>
          <span>
            {{ node.title }}
          </span>
        </v-col></v-row>
      <v-row no-guter>
      <v-col cols="3">Title</v-col>
      <v-col><v-text-field dense hide-details outlined v-model="newNode.title"></v-text-field></v-col>
      </v-row>
    <v-row no-guter>
      <v-col cols="3">Image Url</v-col>
      <v-col><v-text-field dense hide-details outlined v-model="newNode.imageUrl"></v-text-field></v-col>
      </v-row>
          <v-row >
    <v-col class="d-flex justify-end">
    <v-btn color="#609fa2" class="mx-2" outlined @click="add" >save</v-btn>
    <v-btn color="red" class="mx-2"  @click="$emit('close')" outlined >cancel</v-btn>
    </v-col>
      </v-row>
  </v-container>
  </v-dialog>

</template>

<script lang="ts">
import INode from "@/entities/node.type";
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({ components: {} })
export default class AddTreeNodeView extends Vue {
  @Prop() isOpened!: boolean;
  @Prop() node!: INode
  newNode: INode={}as INode;
  dialog=false;
  mounted(){
    this.dialog=this.isOpened;
  }
  add(){
if (!this.node.children) this.node.children = [];
    (this.node.children as any[]).push(this.newNode);
    this.$emit("added");
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

  background:cadetblue;
  color: white;
  font-weight: bold;
  font-size:20px;
 
}
</style>