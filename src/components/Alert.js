import React from "react"; 
import { useContext } from "react"; 
import AlertContext from "../Context/Alert/alertContext";

    
 const Alert = (props) => { 
const { alerts } = useContext(AlertContext);
return (
        <div>
          <div
            className={`alert alert-${alerts.type}  alert-dismissible fade show`}
            role="alert"
          
          >
            {alerts.message}
          </div>
        </div>   
      ); 
};
   
export default Alert;