import INode from "./node.type";

export default interface ITree {
    id: number
    root: INode;
    title: string;
    imageUrl: string;
    prev: string;
}