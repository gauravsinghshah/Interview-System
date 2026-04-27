import { FileArchive } from "lucide-react";
const List = (props) => {
  return (
    <div className="ml-2 flex w-auto justify-between bg-white p-2 text-2xl font-bold text-black">
      <span className="mt-1">{props.name}</span>
      <span className="mt-1">{props.role}</span>
      <button
        onClick={""}
        className="hover:bg-pb flex flex-row gap-2 rounded-xl border-2 p-1 hover:scale-105 hover:text-white hover:shadow-2xl hover:shadow-cyan-600"
      >
        <FileArchive className="m-0 mt-2 p-0" size={20} />
        RESUME
      </button>
    </div>
  );
};

export default List;
