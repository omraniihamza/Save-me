
import './Home.css';
import React, {useState } from 'react';
import { useHistory } from 'react-router-dom';

import { IonInput,IonPage,IonContent,IonButton,useIonToast } from '@ionic/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_LINK } from './config';

const Home: React.FC = () => {

  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  const [loginError, setloginError] = useState(0);
  const [loginErrorMessage, setloginErrorMessage] = useState("");
  const history = useHistory();
  const [present] = useIonToast();


  const presentToast = (position: "top") => {
    present({
      message: "login error  ! ",
      duration: 1500,
      position: position,
    });
  };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (email.trim()=="") {
        setloginError(1);
        setloginErrorMessage("email required.");
      
      }else 

      if(password.trim()=="") {
        setloginError(2);
        setloginErrorMessage("password required.");
      }
     

      
      try {
        const response = await axios.post(`${API_LINK}/logintechnicien`, { email, password });
  
        console.log(response.data);
    console.log(response.data.user[0].email);
    const id= response.data.user[0].id;
    localStorage.setItem("id", id);
    console.log(id)
  history.push('/Menu/profile'); 
      } catch (error) {
        console.error(error);
        presentToast("top");
      }
    };
 

  




  return ( 
   <IonPage>
     <IonContent >
     <div  className='span'><span><b>Welcome,</b></span></div>
     <div className='span1'><span ><b>Sign in to continue!</b></span></div>
        <div className='container-input'>
         
   
        <form className='container-form' onSubmit={handleLogin}>     
        <div className='input-form'>
        <IonInput
  
    type="email"
   
    label="Email"
    value={email}
    labelPlacement="floating"
    helperText="Enter a valid email"
    errorText="Invalid email"
    onIonInput={(e: any) => setEmail(e.target.value)}
   
  >
  </IonInput>
  {loginError === 1 && (
            <div className="error-message">{loginErrorMessage}</div>
          )}
  <IonInput
  
    type="password"
   
    label="Password"
    value={password}
    labelPlacement="floating"
    helperText="Enter a valid password"
    onIonInput={(e: any) => setPassword(e.target.value)}

  ></IonInput>
    {loginError === 2 && (
            <div className="error-message">{loginErrorMessage}</div>
          )}
        </div>
        <div  className='forget-pwd'>  <Link to="/ForgetPwd" >Forget password?</Link></div>
    <IonButton color='tertiary' type="submit"   className='login_btn' expand="block" >Login</IonButton>
  </form>
  
        </div>

 
       </IonContent>
   

   </IonPage>
      
  );
}

export default Home;
