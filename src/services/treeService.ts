import INode from "@/entities/node.type";
import { Tree } from "@/entities/tree";
import ITree from "@/entities/tree.type";
import axios  from "axios";
export class TreeServcie {
    public getAll():Promise<ITree[]> {
        return axios.get("http://localhost:8081/api/tree/v1/getall").then(x => x.data as ITree[]);
    }
    public  createTree( tree: ITree):Promise<ITree> {
        return axios.post("http://localhost:8081/api/tree/v1/create",tree).then(x => x.data as ITree);

    }
    public  updateTree(tree: ITree):Promise<ITree> {
        return axios.post("http://localhost:8081/api/tree/v1/update",tree).then(x => x.data as ITree);
    }
    public  deleteTree( id: number):Promise<boolean> {
        return axios.get("http://localhost:8081/api/tree/v1/delete/"+id).then(x => x.data as boolean);
    }
    public  getTree( id: number):Promise<Tree> {
        return axios.get("http://localhost:8081/api/tree/v1/get/"+id).then(x => x.data as Tree);
    }
}