import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonRow,
  IonCol,
} from "@ionic/react";
import { useState, useRef, useEffect } from "react";
import { API_LINK } from "./config";
import axios from "axios";

interface IMessage {
  id: number;

  content: string;
  dateEnvoie: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>(() => {
    const storedMessages = localStorage.getItem("messages");
    if (storedMessages) {
      return JSON.parse(storedMessages);
    }
    return [];
  });
  const [input, setInput] = useState<string>("");


  const messageContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let id_technicien = localStorage.getItem("id");

    try {
      const response = await axios.post(
        `${API_LINK}/envoie_message/${id_technicien}`,
        { content: input }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    const newMessage: IMessage = {
      id: messages.length + 1,

      content: input,
      dateEnvoie: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    axios
      .get(`${API_LINK}/messages/99`)
      .then((response) => {
        console.log(response.data);
        const message_admin = response.data.data[0];
        console.log(message_admin);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons color="meduim" slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Chat</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="chat-container">
          <div
            className="message-container chat-container-top "
            ref={messageContainerRef}
          >
            {messages.map((message) => (
              <div key={message.id} className="sent">
                <span className="text">{message.content}</span>
                <span className="date-envoi">
                  {formatDate(message.dateEnvoie)}
                </span>
              </div>
            ))}
          
          </div>

          <form className="chat-form" onSubmit={handleSubmit}>
            <IonRow>
              <IonCol size="9">
                <input
                  type="text"
                  placeholder="Aa"
                  value={input}
                  onChange={handleInputChange}
                  className="chat-input chat-container-bottom"
                />
              </IonCol>
              <IonCol size="3">
                <button type="submit" className="send-button">
                  Send
                </button>
              </IonCol>
            </IonRow>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Chat;
