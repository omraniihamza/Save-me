import {
  IonPage,
  IonSplitPane,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRouterOutlet,
  IonInput,
  IonButton,
  IonIcon,
  IonMenuButton,
  IonButtons,
  IonToggle,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { RiSignalWifiOffLine } from "react-icons/ri";
import { API_LINK } from "./config";
import axios from "axios";
import React, { useState } from "react";
import "./Home.css";

const Notification: React.FC = () => {
  const [toggleValue, setToggleValue] = useState(true);
  const [data, setData] = useState([]);


        
 


  const handleToggleChange = async () => {
    setToggleValue(!toggleValue);
    if (!toggleValue){
    try {
      const response = await axios.post(`${API_LINK}/ToggleNotif/30`, );
  
      console.log(response.data);

  
  
    } catch (error) {
      console.error(error);
     
   

    }
  }else if (toggleValue) {
    try {
      const response = await axios.post(`${API_LINK}/ToggleNotifOff/30`, );
  
      console.log(response.data);

  
  
    } catch (error) {
      console.error(error);
     
   

    }

  }};

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButtons>
                  <IonMenuButton />
                </IonButtons>
              </IonCol>
              <IonCol>
                <IonToggle
                  className="toggle"
                  aria-label="Light toggle"
                  color="light"
                  checked={toggleValue}
                  onIonChange={handleToggleChange}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      {toggleValue ? (
        <IonContent>
          {/* actual page content goes here */}
        </IonContent>
      ) : (
        <IonContent color="medium"> 
         <RiSignalWifiOffLine className="offline" />
        </IonContent>
      )}
    </IonPage>
  );
};

export default Notification;
