import Types from "mongoose";

interface objs {
  subject: string;
  description: string;
  assignedTo: Types.ObjectId;
  assignedBy: Types.ObjectId;
  statusType: string;
  Date: Date;
}
interface queryObject {
  [x: string]: { $regex: string; $options: string | number };
}

interface filterQuery {
  $or: queryObject[];
}
export { objs, queryObject, filterQuery };
