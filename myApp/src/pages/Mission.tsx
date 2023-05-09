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
  } from "@ionic/react";

  import React from "react";
  import './Home.css'
  const Mission: React.FC = () => {
    
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
              <IonButtons color="meduim" slot="start" >
                  <IonMenuButton />
              </IonButtons>
            <IonTitle>Missions</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent>
      
   
        </IonContent>
      </IonPage>
    );
  };
  
  export default Mission;
  