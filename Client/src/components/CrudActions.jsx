function CrudActions({
  element,
  setTotalElements,
  setAction,
  handleCurrentElementDeleting,
}) {
  return (
    <div>
      {/* <button
        onClick={(event) => {
          event.preventDefault();
          setCrudAction("ADD");
        }}
      >
        Add
      </button> */}
      <button
        onClick={(event) => {
          event.preventDefault();
          setAction("EDIT");
        }}
      >
        Edit
      </button>
      <button
        onClick={(event) => {
          event.preventDefault();
          handleCurrentElementDeleting(element, setTotalElements);
          setAction("REMOVE");
        }}
      >
        Remove
      </button>
    </div>
  );
}

export default CrudActions;
