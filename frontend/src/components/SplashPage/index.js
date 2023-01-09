import React from 'react'
import './Splash.css';
import { Link } from "react-router-dom";
import slackLogo from '../LoginFormPage/slack-logo.png'
import slackDisplay from './splashDisplay.png'

function Splash() {
  return (
    <>
        <body className='is-down-scroll'>
            <a className='c-button v--primary c-skip-link is-focusable'>Skip to main content</a>
            <div className='u-visually-hidden'></div>
            <header>
                  <nav className='c-nav c-nav--primary t-dark-bg c-nav--yext'>
                      <div className='c-nav__row o-nav--primary o-content-container'>
                          <div className='c-slacklogo'>
                            <img src={slackLogo} height="75"></img>
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
        </body>
    </>
  )
}

export default Splash