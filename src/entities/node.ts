import  INode from "./node.type"
export class Node implements INode{
    id: number

    children: INode[];
    title: string;
    imageUrl: string;
    parent!: INode;

    constructor(node: INode){
        this.children=node?.children?.map(x=>new Node(x));
        this.children.forEach(x=>x.parent=this);
        this.id=node?.id;
        this.title=node?.title;
        this.imageUrl=node?.imageUrl;
        this.parent=node?.parent;
    }
}
