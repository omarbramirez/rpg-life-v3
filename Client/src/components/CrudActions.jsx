const DESKTOP = import.meta.env.VITE_REACT_USAGE;
function CrudActions({
  element,
  setTotalElements,
  setAction,
  handleCurrentElementDeleting,
  setSelectedElementOnClick,
}) {
  return (
    <>
      {DESKTOP === "desktop" && (
        <div className="crudActions">
          <button
            className="button sub--button"
            onClick={(event) => {
              event.preventDefault();
              setAction("EDIT");
              if (setSelectedElementOnClick) {
                setSelectedElementOnClick(element.title);
              }
            }}
          >
            EDIT
          </button>
          <button
            className="button sub--button"
            onClick={(event) => {
              event.preventDefault();
              handleCurrentElementDeleting(element, setTotalElements);
              setAction("REMOVE");
            }}
          >
            REMOVE
          </button>
        </div>
      )}
    </>
  );
}

export default CrudActions;
