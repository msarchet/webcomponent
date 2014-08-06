(function() {     
    'use strict';    

    var cropElement = Object.create(HTMLElement.prototype);

    // This has to be at least at this level
    // if it's in a closure it will always be null
    var doc = (document.currentScript || document._currentScript).ownerDocument;
    var cropImage = null;

    cropElement.createdCallback = function() { 
        var shadow = this.createShadowRoot();

        var template = doc.querySelector('#cropTemplate').content.cloneNode(true);
        shadow.appendChild(template);
        cropImage = shadow.querySelector('#cropImage');
        this.setCrop(this.getAttribute('src'));
    };

    cropElement.setCrop = function(img) { 
        cropImage.src = img;        
        jQuery(cropImage).Jcrop();
    };

    cropElement.attributeChangedCallback = function(attribute, oldVal, newVal) {
        if(attribute === 'src') {
            cropElement.setCrop(newVal);
        }        
    };

    var crop = document.registerElement('x-crop', { 
        prototype : cropElement 
    });
})()
