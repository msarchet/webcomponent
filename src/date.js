(function() {     
    'use strict';    

    var dateElement = Object.create(HTMLElement.prototype);

    // This has to be at least at this level
    // if it's in a closure it will always be null
    var doc = (document.currentScript || document._currentScript).ownerDocument;

    dateElement.createdCallback = function() { 
        var shadow = this.createShadowRoot();

        var template = doc.querySelector('#date').content.cloneNode(true);
        shadow.appendChild(template);

        $(shadow.getElementById('datepicker')).datepicker();
    };

    var date = document.registerElement('x-date', { 
        prototype : dateElement 
    });
})();
