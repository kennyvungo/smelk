import './AboutPage.css';
import kenny from "./Images/kenny.png";
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
                                <BsGithub className='github1'/>
                                <FaLinkedin className='linkedin1' />
                            </div>
                        </div>
                    </span>
                    <span>
                        <span className='person-container'>
                            <img className='picture' src={kenny} alt='kenny image' />
                            <div className='person'> Ernest Tan </div>
                            <div className='social-links'>
                                <BsGithub className='github1'/>
                                <FaLinkedin className='linkedin1' />
                            </div>
                        </span>
                    </span>
                    <span>
                        <span className='person-container'>
                            <img className='picture' src={kenny} alt='kenny image' />
                            <div className='person'> Lauren Armstrong </div>
                            <div className='social-links'>
                                <BsGithub className='github1'/>
                                <FaLinkedin className='linkedin1' />
                            </div>
                        </span>
                    </span>
                    <span>
                        <span className='person-container'>
                            <img className='picture' src={kenny} alt='kenny image' />
                            <div className='person'> Misha Bansal </div>
                            <div className='social-links'>
                                <BsGithub className='github1'/>
                                <FaLinkedin className='linkedin1' />
                            </div>
                        </span>
                    </span>
                    <span>
                        <span className='person-container'>
                            <img className='picture' src={kenny} alt='kenny image' />
                            <div className='person'> Shanna Le </div>
                            <div className='social-links'>
                                <BsGithub className='github1'/>
                                <FaLinkedin className='linkedin1' />
                            </div>
                        </span>
                    </span>
                </span>
                <span className='description'>
                    Meet&Greet is a quick, easy-to-use event scheduling application. 
                </span>
            </div>

        </>
    )
}