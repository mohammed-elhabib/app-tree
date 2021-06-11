import INode from "@/entities/node.type";
import { Node } from "@/entities/node";
import { VuexModule, Module, Mutation, Action, RegisterOptions } from "vuex-class-modules";
@Module
export class NodeModule extends VuexModule {
  service = new NodeServcie();

  constructor(options: RegisterOptions) {
    super(options);
    
  }

  @Action
  public getAll(): Promise<INode[]> {
    return this.service.getAll();
  }

  @Action
  public createNode(nodeTree: INode): Promise<INode> {
    return this.service.createNode(nodeTree);
  }
  
  @Action
  public updateNode(nodeTree: INode): Promise<INode> {
    return this.service.updateNode(nodeTree);
  }

  @Action
  public deleteNode(args: {id:number,parentId: number}): Promise<boolean> {
    return this.service.deleteNode(args.id,args.parentId);
  }
  @Action
  public getNode(id: number): Promise<INode> {
    return this.service.getNode(id);
  }

}
import store from "./index";
import ITree from "@/entities/tree.type";
import { NodeServcie } from "@/services/nodeService";
export default new NodeModule({ store, name: "nodeTree" });