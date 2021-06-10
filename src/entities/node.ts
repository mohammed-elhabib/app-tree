import  INode from "./node.type"
export class Node implements INode{
    children: INode[];
    title: string;
    imageUrl: string;
    constructor(node: INode){
this.children=node?.children;
this.title=node?.title;
this.imageUrl=node?.imageUrl;
    }
}
