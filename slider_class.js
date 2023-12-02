const Directions = {
    left: "left",
    right: "right",
    none: "none"
}
export default class Slider {
    /**
     @param links {Array<string>}
      **/
    constructor(links) {
        this.links = links;
        this.currPage = 0;
        this.prevPage = 0;
        this.nextPage = 0;
        this.element = document.createElement('div');
        this.sliding = false;
    }

    backgroundIndexCounter(direction) {
        const oldNum = this.currPage;
        let newNum;
        let prevNum;
        let nextNum;

        if(this.links.length === 1) {
            newNum = 0;
            prevNum = 0;
            nextNum = 0;
        } else {
            if (direction === Directions.none) {
                newNum = oldNum;
            }
            if (direction === Directions.left) {
                newNum = oldNum - 1;
                if (newNum < 0) {
                    newNum = this.links.length - 1
                }
            }
            if (direction === Directions.right) {
                newNum = oldNum + 1;
                if (newNum > this.links.length - 1) {
                    newNum = 0;
                }
            }

            prevNum = newNum - 1;
            if (prevNum < 0) {
                prevNum = this.links.length - 1;
            }

            nextNum = newNum + 1;
            if (nextNum > this.links.length - 1) {
                nextNum = 0;
            }
        }

        this.currPage = newNum;
        this.prevPage = prevNum;
        this.nextPage = nextNum;
    }

    placeBackgrounds(element){
        const pictures_film = element.getElementsByClassName('pictures_film')[0];
        pictures_film.children[0].style.backgroundImage = `url("${this.links[this.prevPage]}")`;
        pictures_film.children[1].style.backgroundImage = `url("${this.links[this.currPage]}")`;
        pictures_film.children[2].style.backgroundImage = `url("${this.links[this.nextPage]}")`;
    }

    slide(direction, interactionMS = 300) {
        const navBlock = document.getElementsByClassName('slider__nav')[0];
        const buttons = Array.from(document.getElementsByClassName('button'));
        buttons.forEach((button)=>{
            button.disabled = true;
        });

        const pictures_film = document.getElementsByClassName('pictures_film')[0];
        const startPoint = Date.now();

        const k = direction === Directions.right ? -1 : 1;
        let counterID = setInterval(() => {
            const currPoint = Date.now();
            if (currPoint >= startPoint + interactionMS) {
                clearInterval(counterID);
                if (this.sliding === false) {
                    buttons.forEach((button) => {
                        button.removeAttribute('disabled');
                    });
                }
                this.backgroundIndexCounter(direction)
                pictures_film.children[0].style.backgroundImage = `url("${this.links[this.prevPage]}")`;
                pictures_film.children[1].style.backgroundImage = `url("${this.links[this.currPage]}")`;
                pictures_film.children[2].style.backgroundImage = `url("${this.links[this.nextPage]}")`;
                pictures_film.style.transform = `translate(0, 0)`
                this.redrawNavs(navBlock);
            }else{
                const timePassed = currPoint - startPoint;
                const done =  (timePassed / interactionMS) * 100;
                pictures_film.style.transform = `translate(${k * done * 0.333}%, 0)`
            }
        }, 1);
    }

    redrawNavs(element) {
        element.innerHTML = "";
        this.links.forEach((link, index)=> {
            const button = document.createElement('button');
            button.innerText = (index + 1).toString();
            index === this.currPage? button.className = "button nav__button nav__button_current" : button.className = 'button nav__button';
            button.addEventListener('click', ()=> {
                this.moveTo(index);
            });
            if (this.sliding) {
                button.disabled = true;
            }
            element.appendChild(button);
        })
    }

    moveTo(picNum) {
        if (this.currPage === picNum) return;
        this.sliding = true;
        const buttons = Array.from(document.getElementsByClassName('button'));
        buttons.forEach((button)=>{
            button.disabled = true;
        });

        const navBlock = document.getElementsByClassName('slider__nav')[0];
        const currPic = this.currPage;
        const goalPic = picNum ;
        let direction;
        (currPic > picNum) ? direction = Directions.left : direction = Directions.right;

        const steps = Math.abs(currPic - goalPic);
        let counter = 0;
        const slidingTime = 300;
        let mover = setInterval(()=>{
            if (counter < steps) {
                this.slide(direction, slidingTime);
                counter++;
            } else {
                clearInterval(mover)
                this.sliding = false;
                buttons.forEach((button)=>{
                    button.removeAttribute('disabled');
                });
                this.redrawNavs(navBlock);
            }
        }, slidingTime)
    }

    fillSlider(element) {
        element.className = 'slider';
        element.innerHTML =
            "<div class='slider__wrapper'>" +
            "   <button class='button slider__arrow arrow_left'>" +
            "       <svg width=\"40px\" height=\"40px\" viewBox=\"-4.5 0 20 20\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">" +
            "           <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">" +
            "               <g id=\"Dribbble-Light-Preview\" transform=\"translate(-345.000000, -6679.000000)\" fill=\"#FFFFFF\">" +
            "                   <g id=\"icons\" transform=\"translate(56.000000, 160.000000)\">" +
            "                       <path d=\"M299.633777,6519.29231 L299.633777,6519.29231 C299.228878,6518.90256 298.573377,6518.90256 298.169513,6519.29231 L289.606572,6527.55587 C288.797809,6528.33636 288.797809,6529.60253 289.606572,6530.38301 L298.231646,6538.70754 C298.632403,6539.09329 299.27962,6539.09828 299.685554,6538.71753 L299.685554,6538.71753 C300.100809,6538.32879 300.104951,6537.68821 299.696945,6537.29347 L291.802968,6529.67648 C291.398069,6529.28574 291.398069,6528.65315 291.802968,6528.26241 L299.633777,6520.70538 C300.038676,6520.31563 300.038676,6519.68305 299.633777,6519.29231\">" +
            "                       </path>" +
            "                   </g>" +
            "               </g>" +
            "           </g>" +
            "       </svg>"+
            "   </button>" +
            "   <div class='slider__viewport'>" +
            "       <div class='pictures_film'>" +
            "           <div class='picture picture_prev'>" +
            "           </div>" +
            "           <div class='picture picture_current'>" +
            "           </div>" +
            "           <div class='picture picture_next'>" +
            "           </div>" +
            "       </div>" +
            "   </div>" +
            "   <button class='button slider__arrow arrow_right'>" +
            "       <svg width=\"40px\" height=\"40px\" viewBox=\"-4.5 0 20 20\" version=\"1.1\">" +
            "           <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">" +
            "               <g id=\"Dribbble-Light-Preview\" transform=\"translate(-305.000000, -6679.000000)\" fill=\"#FFFFFF\">" +
            "                   <g id=\"icons\" transform=\"translate(56.000000, 160.000000)\">" +
            "                       <path d=\"M249.365851,6538.70769 L249.365851,6538.70769 C249.770764,6539.09744 250.426289,6539.09744 250.830166,6538.70769 L259.393407,6530.44413 C260.202198,6529.66364 260.202198,6528.39747 259.393407,6527.61699 L250.768031,6519.29246 C250.367261,6518.90671 249.720021,6518.90172 249.314072,6519.28247 L249.314072,6519.28247 C248.899839,6519.67121 248.894661,6520.31179 249.302681,6520.70653 L257.196934,6528.32352 C257.601847,6528.71426 257.601847,6529.34685 257.196934,6529.73759 L249.365851,6537.29462 C248.960938,6537.68437 248.960938,6538.31795 249.365851,6538.70769\">" +
            "                       </path>" +
            "                   </g>" +
            "               </g>" +
            "           </g>" +
            "       </svg>"+
            "   </button>" +
            "</div>" +
            "<div class='slider__nav'>" +
            "</div>";

        const navBlock = element.getElementsByClassName('slider__nav')[0];
        this.redrawNavs(navBlock);

        const slideLeft = element.getElementsByClassName('arrow_left')[0];
        slideLeft.addEventListener('click', () => {
            this.slide(Directions.left);
            this.redrawNavs(navBlock);
        });

        const slideRight = element.getElementsByClassName('arrow_right')[0];
        slideRight.addEventListener('click', () => {
            this.slide(Directions.right);
        })
        this.backgroundIndexCounter(Directions.none)
        this.placeBackgrounds(element)
    }
}


