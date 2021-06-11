import store from "./index";
import { TreeServcie } from "@/services/treeService";
import { VuexModule, Module, Mutation, Action, RegisterOptions } from "vuex-class-modules";
import ITree from "@/entities/tree.type";
import INode from "@/entities/node.type";
import { Tree } from "@/entities/tree";
@Module
export class TreeModule extends VuexModule{
  service = new TreeServcie();

  @Action
  public getAll(): Promise<ITree[]> {
    return this.service.getAll().then(x=>{this.setTrees(x);return x;});
  }

  @Action
  public createTree(tree: ITree): Promise<ITree> {
    return this.service.createTree(tree);
  }
  
  @Action
  public updateTree(tree: ITree): Promise<ITree> {
    return this.service.updateTree(tree);
  }

  @Action
  public deleteTree(idNode: number): Promise<boolean> {
    return this.service.deleteTree(idNode);
  }
  @Action
  public getTree(id: number): Promise<ITree> {
    return this.service.getTree(id).then(x=>new Tree(x));
  }

  _currentTree: ITree={}as ITree;
  
  _drowLinks=false;
  _trees: ITree[]=[]
  get currentTree(){
      return this._currentTree;
  }
  get drowLinks(){
      return this._drowLinks;
  }
  @Mutation
   setDrowLinks(newValue: boolean){
      this._drowLinks=newValue;
  }
  @Mutation
  setCuurrentTree(newTree: ITree){
        this._currentTree=newTree;
  }
 
  get trees(){
      return this._trees;
  }
  @Action
  addTree(newTree: ITree){
      this._trees.push(newTree);
  }
  @Mutation
  setTrees(tress: ITree[]){
      this._trees=tress;
  }
  constructor(options: RegisterOptions){
      super(options);
  }

}

export default new TreeModule({ store, name: "tree" });