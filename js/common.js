"use strict"
function getData(url, obj){
        let req = fetch(url, {
            method: 'POST',
            body: ''
        }).then(response => response.text()).then(text => {
            obj.innerHTML = text;
            main()
        })
    }
function main(){                    

/* DOM Elements */
    let $DOM = {
    root: document.getElementById('root'),
    masthead:  document.getElementById('masthead'),
    mheadWrap: document.querySelectorAll('.mheadWrap'),
    mheadToggle: document.getElementById('mheadToggle'),
    mheadNavigation: document.getElementById('mheadRightContainer'),
    link: document.getElementsByTagName('a'),
    langSw: document.getElementById('langSwitch')
    }

/* RegExp Templates */
    let regExpT = { 
      anchLink: /^#[A-z0-9]/
    }   

/* Masthead Wrap */
    window.addEventListener('scroll', ()=>{
      (window.scrollY >= 10) ? $DOM.masthead.style.cssText = "padding: 0" : $DOM.masthead.style.cssText = "";
    })
        for(let elm of $DOM.mheadWrap){
            elm.style.height = $DOM.masthead.offsetHeight + 'px';
        }


    $DOM.mheadToggle.addEventListener('click', ()=>{

        if(window.getComputedStyle($DOM.mheadNavigation).getPropertyValue('right') != '0px'){
            $DOM.mheadNavigation.style.cssText = 'right: 0';
            $DOM.mheadToggle.dataset.checked = 'true';
        }
        else{
            $DOM.mheadNavigation.style.cssText = '';
            $DOM.mheadToggle.dataset.checked = 'false';
        }

    })

    $DOM.langSw.addEventListener('click', ()=>{

        if($DOM.langSw.dataset.value === 'UA'){
            getData('/RU', $DOM.root)
        }
        else if($DOM.langSw.dataset.value === 'RU'){
            getData('/UA', $DOM.root)
        }

    })         

/* Anchor Smooth Scroll */

        for(let elm of $DOM.link){
            elm.addEventListener('click', function(e){
                let href = elm.getAttribute('href');
                    if (regExpT.anchLink.test(href)){
                        e.preventDefault()    
                            document.querySelector(href).scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            })
                    }
                })
            }



}