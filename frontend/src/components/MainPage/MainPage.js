import './MainPage.css'
import kenny from "./Images/kenny.png";
import phone from "./Images/phone.gif";
import calendar from "./Images/calendar.gif";
import party from "./Images/party.gif";
function MainPage() {
    return (
      <>
      <div class='center'>
        <div className='home-background'>
            <div className='home-page-title'>Meet&Greet</div>
            <div className='home-page-description'>
                ...make planning easier
            </div>
        </div>
        <div className='images'>
            <img class="fadeinout1" src={kenny} />
            <img class="fadeinout2" src={calendar} />
            <img class="fadeinout3" src={phone} />
            <img class="fadeinout4" src={party} />
        </div>
      </div>
      </>
    );
  }
  
  export default MainPage;