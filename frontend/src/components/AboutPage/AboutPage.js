import './AboutPage.css';
import kenny from "./Images/kenny.png";
import ernest from "./Images/ernest.png";
import lauren from "./Images/lauren.png";
import misha from "././Images/misha.png";
import shanna from "./Images/shanna.png";
import {BsGithub} from 'react-icons/bs';
import {FaLinkedin} from 'react-icons/fa';


export const AboutPage = () => {
    return (
        <>
            <div className='about-background'>
                <div className='about-title'> Meet the Creators! </div>
                <span className='all-people'>
                    <span>
                        <div className='person-container'>
                            <img className='picture' src={kenny} alt='kenny image' />
                            <div className='person'> Kenny Ngo </div>
                            <div className='social-links'>
                                <a href='https://github.com/kennyvungo'>
                                    <BsGithub className='github1'/>
                                </a>
                                <a href='https://www.linkedin.com/in/kennyvungo/'>
                                    <FaLinkedin className='linkedin1' />
                                </a>
                            </div>
                        </div>
                    </span>
                    <span>
                        <span className='person-container'>
                            <img className='picture' src={ernest} alt='kenny image' />
                            <div className='person'> Ernest Tan </div>
                            <div className='social-links'>
                                <a href='https://github.com/ertan96'>
                                    <BsGithub className='github1'/>
                                </a>
                                <a href='https://www.linkedin.com/in/ernest-tan3'>
                                    <FaLinkedin className='linkedin1' />
                                </a>
                            </div>
                        </span>
                    </span>
                    <span>
                        <span className='person-container'>
                            <img className='picture' src={lauren} alt='kenny image' />
                            <div className='person'> Lauren Cary </div>
                            <div className='social-links'>
                                <a href='https://github.com/laurencary'>
                                    <BsGithub className='github1'/>
                                </a>
                                <a href='https://www.linkedin.com/in/laurengarmstrong/'>
                                    <FaLinkedin className='linkedin1' />
                                </a>
                            </div>
                        </span>
                    </span>
                    <span>
                        <span className='person-container'>
                            <img className='picture' src={misha} alt='kenny image' />
                            <div className='person'> Misha Bansal </div>
                            <div className='social-links'>
                                <a href='https://github.com/mishkebab'>
                                    <BsGithub className='github1'/>
                                </a>
                                <a href='https://www.linkedin.com/in/mishabansal/'>
                                    <FaLinkedin className='linkedin1' />
                                </a>
                            </div>
                        </span>
                    </span>
                    <span>
                        <span className='person-container'>
                            <img className='picture' src={shanna} alt='kenny image' />
                            <div className='person'> Shanna Le </div>
                            <div className='social-links'>
                                <a href='https://github.com/shannale'>
                                    <BsGithub className='github1'/>
                                </a>
                                <a href='https://www.linkedin.com/in/shanna-le/'>
                                    <FaLinkedin className='linkedin1' />
                                </a>
                            </div>
                        </span>
                    </span>
                </span>
                <span className='description'>
                RendezView is a quick, easy-to-use event scheduling application. 
                </span>
            </div>

        </>
    )
}