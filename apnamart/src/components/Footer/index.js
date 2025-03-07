import './index.css'
import { Link } from 'react-router-dom'
import { PATHS } from '../../config'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import GitHubIcon from '@mui/icons-material/GitHub';
import VideocamIcon from '@mui/icons-material/Videocam';


const Footer = () => {
    // mt-5
    return (
        <>
            <footer className="footer bg-warning  pt-3 text-break">
                <div className="footer-content space-between ms-2">
                    <div className="d-flex flex-column">
                        <strong>Quick Links:</strong>
                        <Link className="text-decoration-none text-dark smalltext" to={PATHS.ABOUT}><PersonIcon color="primary" />  About Developer</Link>
                        <Link  className="text-decoration-none text-dark smalltext" to={PATHS.FAQ}><QuestionAnswerIcon style={{color:"white"}} />  FAQs</Link>
                        <a className="text-decoration-none text-dark smalltext" rel="noreferrer" href="https://docs.google.com/document/d/1YxklTIsA_-LT4kgL1NqV5QiiaFTREqcV4CqnrISY7aA/edit?usp=sharing" target="_blank"><DescriptionIcon /> Documentation </a>
                        <a className="text-decoration-none text-dark smalltext" rel="noreferrer" href="https://github.com/attainu/capstone-ashwin-nema-au16/tree/dev" target="_blank"><GitHubIcon /> Source Code </a>
                        <a className="text-decoration-none text-dark smalltext" rel="noreferrer" href="https://drive.google.com/file/d/19L7mqQr4PpDAlbzlhNklxWuZ39ehP88R/view?usp=sharing" target="_blank"><VideocamIcon /> Video Demo </a>
                    </div>
                    <div className="d-flex flex-column">
                        <strong>Contact us:  </strong>
                        <div>
                            <a rel="noreferrer" href="https://twitter.com/ashwin_nema" target="_blank"><TwitterIcon color="primary" ></TwitterIcon>  </a>
                            <a rel="noreferrer" href="https://www.linkedin.com/in/ashwin-nema-4223671a5/" target="_blank"><LinkedInIcon color="primary" ></LinkedInIcon>  </a>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                  ©All rights reserved. Apna Mart
                </div>
            </footer>
        </>
    )
}

export default Footer