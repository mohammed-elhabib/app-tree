<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-center" style="font-size: 60px">
        Tree Project
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-end">
        <v-btn outlined  @click="addTreeDailogOpen">New Tree</v-btn>
      </v-col>
    </v-row>
    <v-divider thickness="2" class="my-2" />

    <v-row>
      <v-col class="d-flex flex-wrap">
        <div
          v-for="tree in trees"
          :key="tree.prev"
          class="tree-card align-center"
        >
          <v-img
            v-if="tree.imageUrl"
            height="100"
            width="150"
            contain
            :src="tree.imageUrl"
          ></v-img>
          <v-img
            v-else
            height="100"
            width="150"
            class="ml-5 mt-5"
            contain
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIDXT3c9JC_84lVe97tBsomsmAy-rMIMGrWg&usqp=CAU"
          ></v-img>
          <div class="prev-tree mt-5">{{ tree.prev }}</div>
          <div class="d-flex justify-center">
            <v-btn icon @click="viewTree(tree)"><v-icon>mdi-card-search-outline</v-icon></v-btn>
            <v-btn icon @click="deleteTree(tree)"><v-icon>mdi-delete</v-icon></v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
        <AddTreeView v-if="addTreeDailog" @close="addTreeDailog=false" :isOpened="addTreeDailog" @added="addTree" />

  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import treeModule from "@/store/treeModule";
import ITree from "@/entities/tree.type";
import AddTreeView from "@/ui/views/AddTreeView.vue"

@Component({ components: {AddTreeView} })
export default class Home extends Vue {
  addTreeDailog=false;
  get trees(): ITree[] {
    return treeModule.trees;
  }
  mounted() {
    treeModule.getAll();

  }
  addTreeDailogOpen(){

    this.addTreeDailog=true;
  }
  addTree(){
        this.addTreeDailog=false;
  }
  viewTree(tree: ITree){
    this.$router.push("/tree/"+tree.id)
  }
  deleteTree(tree: ITree){
   treeModule.setTrees( treeModule.trees.filter(x=>x!==tree));
  }
}
</script>
<style scoped>
.tree-card {
  padding: 2px;
  height: 200px;
  width: 200px;
  margin: 10px;
  border: 1px solid cadetblue;
}

.prev-tree {
  text-align: center;
}
.menu-btn {
  position: absolute;
  visibility: collapse;
  right: 0px;
  top: 0px;
  z-index: 500;
}
</style>