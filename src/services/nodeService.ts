import INode from "@/entities/node.type";
import { Tree } from "@/entities/tree";
import axios  from "axios";
export class NodeServcie {
    public getAll():Promise<INode[]> {
        return axios.get("http://localhost:8081/api/nodeTree/v1/getall").then(x => x.data as INode[]);
    }
    
    public  createNode( nodeTree: INode):Promise<INode> {

        console.log(nodeTree)
        return axios.post("http://localhost:8081/api/nodeTree/v1/create",nodeTree).then(x => x.data as INode);

    }
    public  updateNode(nodeTree: INode):Promise<INode> {
        return axios.post("http://localhost:8081/api/nodeTree/v1/update",nodeTree).then(x => x.data as INode);
    }
    public  deleteNode( id: number,parentId: number):Promise<boolean> {
        return axios.get("http://localhost:8081/api/nodeTree/v1/delete/"+id+"/"+parentId).then(x => x.data as boolean);
    }
    public  getNode( id: number):Promise<INode> {
        return axios.get("http://localhost:8081/api/nodeTree/v1/get/"+id).then(x => x.data as INode);
    }
}