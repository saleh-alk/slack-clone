import React from 'react'
import './Splash.css';
import { Link } from "react-router-dom";
import slackLogo from '../LoginFormPage/icon.png'
import slackDisplay from './splashDisplay.png'
import airbnb from './Airbnb.png'
import nasa from './nasa.png'
import uber from './uber.png'
import target from './target.png'

function Splash() {
  return (
    <>
    <div className='body-of-splash'>
        <body className='is-down-scroll'>
            <a className='c-button v--primary c-skip-link is-focusable'>Skip to main content</a>
            <div className='u-visually-hidden'></div>
            <header>
                  <nav className='c-nav c-nav--primary t-dark-bg c-nav--yext'>
                      <div className='c-nav__row o-nav--primary o-content-container'>
                          <div className='c-slacklogo'>
                            <img src={slackLogo} height="75"></img>
                              <div className='logo-name'>Khakis</div>
                          </div>

                          <div className='c-nav--signed-out'>
                              <Link to="/login" className='c-nav--signed-out__link'>Sign In</Link>
                          </div>
                          <nav className='c-nav__list'>
                        
                            

                          </nav>
                      </div>
                  </nav>
            </header>

            <main>
                <section className='c-billboard v--homepage__section-billboard'>
                    <div className='c-billboard__content o-content-container v--inverse'>
                        <div className='c-billboard__illustration'>
                        <img src={slackDisplay} height="300">
                        </img>
                        
                        </div>
                    </div>

                    <header className='c-billboard__header c-billboard__header_control'>
                          <h1 className='o-hero__header__headline--jumbo u-text--reverse'>Great teamwork starts with a 
                              <span className='u-text--yellow'> digital HQ</span>
                          </h1>

                          <div className='c-billboard__header__cta--v-stack-on-small-desktop c-cta c-cta--signup'>
                              <Link to="/signup" className='c-button v--secondary'>SIGN UP WITH EMAIL</Link>
                          </div>
                         

                    </header>
                </section>
            </main>

            <div className='trusted-by'>
                      <div className='trusted-by-header'>TRUSTED BY COMPANIES ALL OVER THE WORLD</div>
                      <div className='companies-name'>
                        <img src={airbnb} height="35px" width="112px"></img>
                          <img src={nasa} height="67px" width="130px" className='logos'></img>
                          <img src={uber} height="35px" width="95px" className='logos'></img>
                          <img src={target} height="95px" width="85px" className='logos'></img>
                        
                      </div>
                      <video className='first-video' data-js-id="connectedness" loop muted playsInline>
                          <source src='https://a.slack-edge.com/9689dea/marketing/img/homepage/e2e-prospects/animations/webm/connectedness-mobile.webm' type='video/webm'></source>
                          <source src='https://a.slack-edge.com/9689dea/marketing/img/homepage/e2e-prospects/animations/mp4/connectedness-mobile.mp4' type='video/mp4' ></source>

                      </video>
                      
                      <div className='bring-team-section'>
                          <div>Bring your team together</div>
                          <p>At the heart of Khakis are channels: organized spaces for everyone and everything you need for work. In channels, it’s easier to connect across departments, offices, time zones and even other companies.</p>
                      </div>

                      <video className='second-video'>
                          <source src='https://a.slack-edge.com/9689dea/marketing/img/homepage/e2e-prospects/animations/webm/flexibility-mobile.webm' type="video/webm"></source>
                          <source src='https://a.slack-edge.com/9689dea/marketing/img/homepage/e2e-prospects/animations/mp4/flexibility-mobile.mp4' type='video/mp4'></source>

                    </video>

                    <div className='choose-how-work'>
                          <div>Choose how you want to work</div>
                          <p>In Khakis, you’ve got all the flexibility to work when, where and how it’s best for you. You can easily chat, send audio and video clips, or hop on a huddle to talk things out live.</p>
                    </div>

                    <video className='third-video'>
                          <source src='https://a.slack-edge.com/221d25b/marketing/img/homepage/e2e-prospects/animations/webm/speed.webm' type='video/webm'></source>
                          <source src='https://a.slack-edge.com/7460822/marketing/img/homepage/e2e-prospects/inline/animations/mp4/speed.mp4' type='video/mp4'></source>

                    </video>

                    <div className='move-faster'>
                          <div>Move faster with your tools in one place</div>
                          <p>With your other work apps connected to Khakis, you can work faster by switching tabs less. And with powerful tools like Workflow Builder, you can automate away routine tasks.</p>

                    </div>

            </div>

            <div className='teams'>
                      <div className='team-header'>Teams large and small rely on Khakis</div>
                      <p className='team-p'>Khakis securely scales up to support collaboration at the world’s biggest companies.</p>

                      <div className='team-percentages'>

                        <div className='teams-info'>
                            <div className='percentage'>85%</div>
                            <div className='about-team'>of users say Khakis has improved communication*</div>
                        </div>

                          <div className='teams-info'>
                              <div className='percentage'>86%</div>
                              <div className='about-team'>feel their ability to work remotely has improved*</div>
                          </div>

                          <div className='teams-info'>
                              <div className='percentage'>88%</div>
                              <div className='about-team'>feel more connected to their teams*</div>
                          </div>
                      </div>

                      <video className='fourth-video'>
                          <source src='https://a.slack-edge.com/93eaeb3/marketing/img/features/customer-awards/customer-awards-tmobile-quote-610x305@2x.mp4' type='video/mp4'></source>
                      </video>
                      
                      <div className='quote-by-person'>
                          <p>“We were able to create a large virtual network of employees that can communicate as though they are together. There was a lot of disruption in terms of where we worked, but in terms of how we worked—very little disruption.”</p>
                          <div className='author-of-quote'>Mark Smith</div>
                          <div className='role-of-author'>Senior Technical Product Manager, T-Mobile</div>

                      </div>

            </div>

            <footer className='footer-splash'>
                <div className='my-name'>By Saleh Alkaheli</div>
                <div className='portfolio-links'>
                  <a href="https://github.com/saleh-alk" target="_blank"><i class="fa-brands fa-github"></i></a>
                  <a href="https://www.linkedin.com/in/saleh-alkaheli-97971815a/" target="_blank" className='Linkedin-link'><i class="fa-brands fa-linkedin"></i></a>
                </div>
            </footer>
        </body>
    </div>
    </>
  )
}

export default Splash