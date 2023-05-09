import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonMenuButton,
  IonButtons,
  IonImg,
  IonRow,
  IonCol,
} from "@ionic/react";
import { mailUnreadOutline, callOutline } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_LINK } from "./config";
import { useHistory } from 'react-router-dom';

interface Record {
  id: string;
  nom: string;
  prenom: string;
  code_postal: string;
  telephone: string;
  email: string;
}

const Profile: React.FC = () => {
  const [data, setData] = useState<Record>({
    id: "",
    nom: "",
    prenom: "",
    code_postal: "",
    telephone: "",
    email: "",
  });
  const history = useHistory();

  useEffect(() => {
    console.log("View entered");

    const id = localStorage.getItem("id");
    if (id === null) {
      history.push("/login");
      return;
    }
    console.log(id);

    axios
      .get(`${API_LINK}/ListTechnicien/${id}`)
      .then((response) => {
        setData(response.data.data[0]);
        console.log(response.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonImg src={require("../photo/buildings.jpg")} />

        <IonRow>
          <IonCol size="4">
            <div className="photo-container">
              <IonImg
                src={require("../photo/hamza.png")}
                className="my-photo"
              />
            </div>
          </IonCol>
          <IonCol>
            <div className="name-container">
              <span>
                <b>
                  {data.nom} {data.prenom}
                </b>
              </span>
            </div>
          </IonCol>
        </IonRow>
        <div className="informations">
          <br />
          <div className="information_text">
            <span>
              <b>Informations :</b>
            </span>
          </div>
          <IonRow>
            <IonCol size="2">
              <IonIcon
                className="mail_icon"
                icon={mailUnreadOutline}
                size="large"
              />
            </IonCol>
            <IonCol>
              {" "}
              <div className="email-container">
                <span>{data.email}</span>
              </div>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="2">
              <IonIcon
                className="phone_icon"
                icon={callOutline}
                size="large"
              >
                {" "}
              </IonIcon>
            </IonCol>
            <IonCol>
              {" "}
              <div className="phone-container">
                {" "}
                <span>{data.telephone}</span>{" "}
              </div>
            </IonCol>
          </IonRow>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
