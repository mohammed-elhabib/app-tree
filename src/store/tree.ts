import INode from "@/entities/node.type";
import {Node} from "@/entities/node";
import { VuexModule, Module, Mutation } from "vuex-class-modules";
@Module
export class TreeModule extends VuexModule{
  _tree: INode=new Node({title:"parent",imageUrl:"data:image/jpeg;base64,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"}as INode)
  _drowLinks=false;
  get tree(){
      return this._tree;
  }
  get drowLinks(){
      return this._drowLinks;
  }
  @Mutation
   setDrowLinks(newValue: boolean){
      this._drowLinks=newValue;
  }
}
import store from "./index";
export default new TreeModule({ store, name: "tree" });