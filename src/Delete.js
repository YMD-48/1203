import React from 'react';
import { db } from "./firebase";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const Delete = ({id,title}) => {
    const DeleteInputData = () => {
        db.collection("posts").doc(id).delete();
      };
      return (
        <div key={id}>
        <td>
          <h2>{title}</h2>
          <button onClick={DeleteInputData}>
            <DeleteForeverIcon />
          </button>
        </td>
        </div>
      );

}

export default Delete




