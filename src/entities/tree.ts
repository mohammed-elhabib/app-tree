import  INode from "./node.type"
import  {Node} from "./node"
import ITree from "./tree.type";
export class Tree implements ITree{
    title: string;
    imageUrl: string;
    root: INode;
    id: number
    prev: string;
    constructor(tree: ITree){
        this.id=tree?.id;
        this.title=tree?.title;
        this.prev=tree?.prev;
        this.root=(tree?.root!==null)?new Node(tree.root):tree?.root;
        this.imageUrl=tree?.imageUrl;
    }

}
