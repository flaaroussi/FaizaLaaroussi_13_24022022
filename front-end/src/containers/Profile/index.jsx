import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import AccountCard from '../../components/AccountCard'
import { accounts } from '../../datas/accounts'
import { getProfile } from '../../redux/middlewares/userMiddleware';
import './style.scss'

/**
 * @description afficher page profil
 * @returns 
 */

export default function Profile(){

   const dispatch = useDispatch();
   const userState = useSelector((state) => state.userReducer) 
   
   useEffect(() => {
      //charger les données de l'utilisateur via l api aprés chqua chargement
      //de la page profil
      dispatch(getProfile(userState.token))   
      document.title = `Argent Bank - Profile`
   }, []);
  

  
  const userConnected = userState.user ? `${userState.user.firstName}  ${userState.user.lastName}` :''
   return (
   <main className="main bg-dark">
      <header className='header'>
        <h1>Welcome back<br />{userConnected}!</h1>
        <Link to='/userInfos' className="edit-button">Edit Name</Link>
      </header>

      <h2 className="sr-only">Accounts</h2>
      <section className='accounts'>
         {
            accounts.map((account)=>{
               return <AccountCard key={account.id} name={account.name} amount ={account.amount} description={account.description} />
            })
         }         
      </section>
   </main>
   )
}