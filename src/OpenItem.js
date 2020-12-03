import React from 'react';
import { db } from "./firebase";
import AcUnitIcon from '@material-ui/icons/AcUnit';

const OpenItem = ({id}) => {
    const openInputData = () => {
        console.log(db.collection("posts").doc(id));
        //image.getElementById(id).append(Feed);
      };
      return (
        <div key={id}>
        <td>
          <button onClick={openInputData}>
            <AcUnitIcon/>
          </button>
        </td>
        </div>
      );

}

export default OpenItem




