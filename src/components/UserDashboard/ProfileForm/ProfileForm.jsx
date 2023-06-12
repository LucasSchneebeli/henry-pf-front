import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./ProfileForm.module.css";
import ReturnToHomeButton from '../../ReturnToHomeButton/ReturnToHomeButton';
import Review from '../Reviews/Review';
import PersonalData from '../PersonalData/PersonalData';
import OrdersProfile from '../OrdersProfile/OrdersProfile';

export default function ProfileForm() {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState();
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate()
  const mySwal = withReactContent(Swal);
  const [orders, setOrders] = useState(false);
  const [profile, setProfile] = useState(true);
  const [reviews, setReviews] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);

   useEffect(() => {
    if(!isAuthenticated) navigate("/")
    else{
      if(!editMode){
      axios.get(`${process.env.REACT_APP_HOST_NAME}/orders/${user?.sub}`)
    .then(res => {
      setProfileData(res.data)
   }) 
   .catch(err => console.log("ERROR", err))
  }
}
  }, [user?.sub], editMode)

  const handleOrders = () => {
    setProfile(false);
    setOrders(true);
    setReviews(false)
  }

  const handleProfile = () => {
    setOrders(false);
    setProfile(true);
    setReviews(false)
  }

  const handleReviews = () => {
    setOrders(false);
    setProfile(false);
    setReviews(true);
  }


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleEditClick = (e) => {
    e.preventDefault()
    setEditMode(true);
  };


  const toggleItems = (orderNumber) => {
    if (selectedOrders.includes(orderNumber)) {
      setSelectedOrders(selectedOrders.filter(so => so !== orderNumber));
    } else {
      setSelectedOrders(selectedOrders.concat(orderNumber));
    }
  };

  const handleSaveClick = (e) => {
    e.preventDefault()
    setEditMode(false);
    console.log(profileData);
    if (profileData.idNumber === "") profileData.idNumber = null
    axios.put(`${process.env.REACT_APP_HOST_NAME}/users/${user?.sub}`, { ...profileData })
      .then(() => {
        mySwal.fire({
          html: <strong>The info has been updated</strong>,
          icon: "success",
        })
      }).catch(err => console.log("ERROR", err))
  }

  return (

    <div>
      <ReturnToHomeButton />
      <div className={styles.ProfileForm}>
        <h1>Profile Account</h1>
      <div className={styles['selector-container']}>
          <div className={styles['selector']}>
            <h4 onClick={handleProfile} className={styles[`${profile}`]}>Personal Data</h4>
            <h4 onClick={handleOrders} className={styles[`${orders}`]}>Orders</h4>
            <h4 onClick={handleReviews} className={styles[`${reviews}`]}>Reviews</h4>
          </div>
          <div data-visible={`${profile}`} className={styles[`selector-content`]}>
            <PersonalData profileData={profileData} handleEditClick={handleEditClick} handleInputChange={handleInputChange} handleSaveClick={handleSaveClick} editMode={editMode}/>
          </div>
          <div data-visible={`${orders}`} className={styles[`selector-content`]}>
            <OrdersProfile selectedOrders={selectedOrders} profileData={profileData} toggleItems={toggleItems} />
          </div>
          <div data-visible={`${reviews}`} className={styles[`selector-content`]}>
            <Review orders={profileData?.orders} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}


