const List = (props) => {
  return (
    <div className="mr-2 ml-2 w-5xl bg-white p-2 text-black">
      <span className="font-sans text-2xl font-bold text-black">
        {props.name}
      </span>
    </div>
  );
};

export default List;
