import { User } from "@/context/AuthContext";
import ProductType from "./product";


type CommentType = {
    _id: string;
    content: string;
    user: User;
    product: ProductType;
    createdAt: string;
};


export default CommentType;