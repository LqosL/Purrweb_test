// import Slider from './slider_class';

import Slider from "./slider_class.js" ;

const picturesLinks = [
    'assets/slider_images/0.jpg',
    'assets/slider_images/1.jpg',
    'assets/slider_images/2.jpg',
    'assets/slider_images/3.jpg',
    'assets/slider_images/4.jpg',
    'assets/slider_images/5.jpg',
    'assets/slider_images/6.jpg',
    'assets/slider_images/7.jpg',
    'assets/slider_images/8.jpg',
    'assets/slider_images/9.jpg',
]
window.addEventListener('load', ()=> {
    const slider = new Slider(picturesLinks);
    const sliderElement = slider.element;
    slider.fillSlider(sliderElement)
    document.body.appendChild(sliderElement)

});