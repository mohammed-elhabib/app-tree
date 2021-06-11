<template>
  <v-dialog
  v-model="dialog"
  hide-overlay
  width="50%"

  >
  <v-container   style="background: white;"
>
  <v-row>
  <v-col class="header d-flex text-white justify-center">
  Add New Tree
  </v-col>
  </v-row>

      <v-row no-guter>
      <v-col cols="3">Title</v-col>
      <v-col><v-text-field dense hide-details outlined v-model="newTree.title"></v-text-field></v-col>
      </v-row>
        <v-row no-guter>
      <v-col cols="3">Prev</v-col>
      <v-col><v-text-field dense hide-details outlined v-model="newTree.prev"></v-text-field></v-col>
      </v-row>
    <v-row no-guter>
      <v-col cols="3">Image Url</v-col>
      <v-col><v-text-field dense hide-details outlined v-model="newTree.imageUrl"></v-text-field></v-col>
      </v-row>
          <v-row >
    <v-col class="d-flex justify-end">
    <v-btn color="#609fa2" class="mx-2" outlined @click="addNewTree" >save</v-btn>
    <v-btn color="red" class="mx-2"  @click="$emit('close')" outlined >cancel</v-btn>
    </v-col>
      </v-row>
  </v-container>
  </v-dialog>

</template>

<script lang="ts">
import ITree from "@/entities/tree.type";
import { Component, Prop, Vue } from "vue-property-decorator";
import treeModule from "@/store/treeModule";

@Component({ components: {} })
export default class AddTreeView extends Vue {
  @Prop() isOpened!: boolean;
  newTree: ITree={}as ITree;
  dialog=false;
  mounted(){
    this.dialog=this.isOpened;
  }
  addNewTree(){
    treeModule.createTree(this.newTree).then(x=>{
      treeModule.addTree(this.newTree);
      this.$emit("added");
    })

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