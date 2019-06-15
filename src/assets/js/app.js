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
    accordionPanel: document.querySelector('.accordion-panel'),
    apiURL: 'https://api.myjson.com/bins/jw3rg',
    loader: document.querySelector('#loader')
  }

  
  //Construct Accordion Here
  const constructAccordion = function(data) {
    return (
       `<div class="accordion-wrapper">
            <h3>
              <button class="accordion-trigger" aria-expanded="false" aria-control="accordion-${data.id}" data-trigger="accordion-${data.id}">
                <span class="button-text" data-trigger="accordion-${data.id}">
                  Q:${data.question}
                </span>
                <span class="button-icon" data-trigger="accordion-${data.id}"></span>
              </button>
            </h3> 
            
            <div class="accordion-panel" role="region"  aria-labelledby="accordion-${data.id}" data-panel="accordion-${data.id}" hidden>
              <p>${data.answer}</p>
            </div>
          </div> `
      )
  }


  //Get Dynamic Data from API
  const getData = function () {
    axios.get(settings.apiURL)
      .then(function(response) {
        const faqs = response.data.faqs; // Get all Faqs
        dataLooper(faqs);
      })
      .catch(function(err) {
        console.log(err);
      })
  }

  //Loop over the data and create Accordion
  const dataLooper = function(data) {
    data.forEach(function (d) {
    //Get Accordion Created
      const accordion = constructAccordion(d);

      //Remove Loader Gif 
      settings.loader.style.display = "none";

      //Inject Accordion into the DOM
      settings.accordionContainer.innerHTML += accordion;

      //Making first Accordion Visible
      firstElementVisible();


    })
  }

  //Set First Element of the accordion to expanded on load
  const firstElementVisible = function() {
    const parent = document.querySelector('#accordion');
    const firstChild = parent.children[0];
    const firstTrigger = firstChild.childNodes[1].childNodes[1];
    firstTrigger.setAttribute('aria-expanded', 'true');
    const dataAttribute = firstTrigger.getAttribute('data-trigger');
    //panel
    panelToggle(firstTrigger, dataAttribute)
  }

  //Panel Toggle
  const panelToggle = function (trigger, dataAttrib) {  
    const allPanels = document.querySelectorAll('[data-panel]');
    const currentTrigger = trigger.getAttribute('aria-expanded');
    const currentPanel = document.querySelector('[data-panel="'+ dataAttrib +'"]');

    allPanels.forEach(function(p) {
      p.setAttribute('hidden', true)
    })

    if(currentTrigger === 'true'){
      currentPanel.removeAttribute('hidden')
    } 
  }

  //Add EventListeners 
  const bindUIActions = function() {
    //Loader gif display
    settings.loader.style.display = "block"; 


    settings.accordionContainer.addEventListener('click', function (event) {
      event.stopPropagation();
      if(!event.target.matches('.accordion-trigger')) return;
      
      //Accordion Trigger
      const allTriggers = document.querySelectorAll('[data-trigger]');
      const dataAttrib = event.target.getAttribute('data-trigger');  
      let ariaExpanded = event.target.getAttribute('aria-expanded');

      //Toggling the Aria-expanded attribute
      if(ariaExpanded === 'true') {
          ariaExpanded = 'false'
        } else {
          ariaExpanded = 'true'
      }
      
      //setting all Triggers to Aria-Expanded false
      allTriggers.forEach(function(t) {
        t.setAttribute('aria-expanded', 'false');
      })

      // Clicked Accordion Trigger
      event.target.setAttribute('aria-expanded', ariaExpanded)

      //Panel
      panelToggle(event.target, dataAttrib)
      

    },false)
  }

  const init = () => {    
    getData();
    bindUIActions();
  }

  init();
 

}());