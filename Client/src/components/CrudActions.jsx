function CrudActions({
  element,
  setTotalElements,
  setAction,
  handleCurrentElementDeleting,
  setSelectedElementOnClick,
}) {
  return (
    <div>
      <button
        onClick={(event) => {
          event.preventDefault();
          setAction("EDIT");
          if (setSelectedElementOnClick) {
            setSelectedElementOnClick(element.title);
          }
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
