
import Types from "mongoose";

interface objs {
  _id:  Types.ObjectId;
  subject: string;
  description: string;
  assignedTo: Types.ObjectId;
  assignedBy: Types.ObjectId;
  statusType: string;
  Date: Date;
  id: string
}
interface queryObject {
  [x: string]: { $regex: string; $options: string | number };
}

interface filterQuery {
  $or: queryObject[];
}


export { objs, queryObject, filterQuery };
