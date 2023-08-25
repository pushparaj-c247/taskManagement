

interface obj {
  validatePassword(password: string): boolean;
  _id: string
  name: string;
  email: string;
  password: string;
  role: string;
}

interface demo {
  assignedTo: string;
  search: string
}
interface sort {
  columns: string,
  pos: number,
  search: string

}
export { obj, demo, sort };
