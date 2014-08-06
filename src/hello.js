(function() {     
    'use strict';    

    var helloElement = Object.create(HTMLElement.prototype);

    // This has to be at least at this level
    // if it's in a closure it will always be null
    var doc = (document.currentScript || document._currentScript).ownerDocument;
    var nameElement = null;
    helloElement.createdCallback = function() { 
        var shadow = this.createShadowRoot();

        var template = doc.querySelector('#helloTemplate').content.cloneNode(true);
        shadow.appendChild(template);
        nameElement = shadow.querySelectorAll('.name')[0];
        var initVal = this.getAttribute('name');
        if(initVal) { 
            nameElement.textContent = " " + initVal;
        }
    };

    helloElement.attributeChangedCallback = function(attr, oldVal, newVal) { 
        if(attr === "name") {
            nameElement.textContent = " " +newVal;
        }
    };

    var hello = document.registerElement('x-hello', { 
        prototype : helloElement 
    });
})()
