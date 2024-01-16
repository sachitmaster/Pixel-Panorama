// Get all img elements with the attribute data-enlargable
var imgElements = document.querySelectorAll('img[data-enlargable]');

// Add a click event listener to each img element
imgElements.forEach(function (imgElement) {
    imgElement.classList.add('img-enlargable');
    imgElement.addEventListener('click', function () {
        var src = imgElement.getAttribute('src');

        // Create a new div element
        var overlay = document.createElement('div');
        overlay.style.cssText = 'background: RGBA(0,0,0,.5) url(' + src + ') no-repeat center; background-size: contain; width: 100%; height: 100%; position: fixed; z-index: 10000; top: 0; left: 0; cursor: zoom-out;';

        // Add a click event listener to the overlay div to remove it when clicked
        overlay.addEventListener('click', function () {
            document.body.removeChild(overlay);
        });

        // Append the overlay div to the body
        document.body.appendChild(overlay);
    });
});
