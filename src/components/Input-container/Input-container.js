import React from "react";
import { GetResult } from "../../App";

function InputContainer({ handler }) {
  const onGetResult = React.useContext(GetResult);

  return (
    <div className="input-container">
      <div className="title-search-container">
        <input
          className="title-search-input"
          type="text"
          placeholder="Title, expertise, companies or benefits"
          onChange={handler}
        />
        <button className="title-search-btn" onClick={onGetResult}>
          Search
        </button>
      </div>
    </div>
  );
}

export default InputContainer;
