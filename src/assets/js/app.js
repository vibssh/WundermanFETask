/* JS File for the App - Using ES6 Syntax */

//Import dependency Here
import axios from 'axios';

(function () {
  'use strict';

  console.log('App Launched'); // To make sure the everything is wired

  //Cache the Variables in settings
  const settings = {
    accordionContainer: document.querySelector('#accordion'),
    accordionTrigger: document.querySelector('.accordion-trigger'),
    accordionPanel: document.querySelector('.accordion-panel')
  }

  
  //Construct Accordion Here
  const constructAccordion = function() {
    return (
       `<div class="accordion-wrapper">
            <h3>
              <button class="accordion-trigger" aria-expanded="false" aria-control="accordion-0" data-trigger="accordion-0">
                <span class="button-text" data-trigger="accordion-0">
                  Q:What is Wunderman Thomson Commerce about?
                </span>
                <span class="button-icon" data-trigger="accordion-0"></span>
              </button>
            </h3> 
            
            <div class="accordion-panel" role="region" aria-labelledby="accordion-0" data-panel="accordion-0" hidden>
              <p>Building great sites for our clients. Simple</p>
            </div>
          </div> `
      )
  }



  //Add EventListeners 
  const bindUIActions = function() {
    settings.accordionContainer.addEventListener('click', function (addEventListener) {
      if(!event.target.hasAttribute('data-trigger')) return;
      
      const allTriggers = document.querySelectorAll('[data-trigger]');
      const allPanels = document.querySelectorAll('[data-panel]');



      allTriggers.forEach(function(trigger) {
        const dataAttrib = trigger.getAttribute('data-trigger');

        //Accordion Trigger
        const activeTrigger = document.querySelector('[data-trigger="'+dataAttrib+'"]'); 
        
        if(!activeTrigger) {
          //Remove activeClass from all triggers
          trigger.classList.remove('active');  
        } else {
          //Toggle Active Class on clicked Trigger
          trigger.classList.toggle('active');  
        }
        
        //Accordion Panel
        allPanels.forEach(function(panel) {
          //panel.hidden = true;
          const activeDataPanel = document.querySelector('[data-panel="'+dataAttrib+'"]');
          
          if(!activeDataPanel) {
            panel.hidden = true;
          } else {
            activeDataPanel.toggleAttribute('hidden');   
          }        
        });
      });
    },false)
  }

  const init = () => {
    const accordion = constructAccordion();
    settings.accordionContainer.innerHTML += accordion
    bindUIActions();
  }



  init();
  



}());