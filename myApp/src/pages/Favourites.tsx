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

  import React, { useEffect, useState } from "react";
 
  import './Home.css'
import axios from "axios";
import { API_LINK } from "./config";

  const Favorites: React.FC = () => {
    
const [data,setData]= useState([]);
    
    useEffect(() => {
      axios.get(`${API_LINK}/favoris/:id_technicien`)
        .then((response) =>
        {
          setData(response.data.data);
          console.log(response.data.data); 


        }) 
        .catch((error) => {
          console.log(error)
        }); },
         []);

         
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
              <IonButtons slot="start">
                  <IonMenuButton/>
              </IonButtons>
            <IonTitle>Favourites</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent>
      
   
        </IonContent>
      </IonPage>
    );
  };
  
  export default Favorites;


