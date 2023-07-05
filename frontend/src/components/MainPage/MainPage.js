import './MainPage.css'
import kenny from "./Images/kenny.png";
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
            <img class="fadeinout2" src={kenny} />
            <img class="fadeinout3" src={kenny} />
            <img class="fadeinout4" src={kenny} />
        </div>
      </div>
      </>
    );
  }
  
  export default MainPage;