import Types from "mongoose";

interface objs {
  subject: string;
  description: string;
  assignedTo: Types.ObjectId;
  assignedBy: Types.ObjectId;
  statusType: string;
  Date: Date;
}
export default objs;
