import './MainPage.css'
// import kenny from "./Images/kenny.png";
import phone from "./Images/phone.gif";
import calendar from "./Images/calendar.gif";
import party from "./Images/party.gif";
// import link from "./Images/link.gif";
import nostress from "./Images/nostress.gif";

function MainPage() {
    return (
      <>
      <div class='center'>
        <div className='home-background'>
            <div className='home-page-title'>RendezView</div>
            <div className='home-page-description'>
                ...make planning easier
            </div>
        </div>
        <div className='images'>
            <div className="fadeinout1">
              <img src={nostress} className='main-page-img'/>
              <p className="instructions-text">
                1. Create an event
              </p>
            </div>
            <div  className="fadeinout2">
              <img className='main-page-img' src={phone} />
              <p className="instructions-text">
                2. Everyone fills out a schedule
              </p>
            </div>
            <div  className="fadeinout3">
              <img className='main-page-img' src={calendar} />
              <p className="instructions-text">
                3. Let us find the best time for you
              </p>
            </div>
            <div  className="fadeinout4">
              <img className='main-page-img' src={party} />
              <p className="instructions-text">
                4. RendezView
              </p>
            </div>
        </div>
      </div>
      </>
    );
  }
  
  export default MainPage;