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

    slide(direction) {
        const navBlock = document.getElementsByClassName('slider__nav')[0];
        const buttons = Array.from(document.getElementsByClassName('button'));
        buttons.forEach((button)=>{
            button.disabled = true;
        });

        const pictures_film = document.getElementsByClassName('pictures_film')[0];
        if (direction === Directions.left) {
            let counter = 0;
            let counterID = setInterval(() => {
                if (counter >= 300) {
                    clearInterval(counterID);
                    buttons.forEach((button)=>{
                        button.removeAttribute('disabled');
                    });
                    this.backgroundIndexCounter(Directions.left)
                    pictures_film.children[0].style.backgroundImage = `url("${this.links[this.prevPage]}")`;
                    pictures_film.children[1].style.backgroundImage = `url("${this.links[this.currPage]}")`;
                    pictures_film.children[2].style.backgroundImage = `url("${this.links[this.nextPage]}")`;
                    pictures_film.style.transform = `translate(0, 0)`
                    this.redrawNavs(navBlock);
                }else {
                    counter += 3;
                    pictures_film.style.transform = `translate(${counter}px, 0)`
                }
            }, 1);

        }
        if (direction === Directions.right) {
            let counter = 0;
            let counterID = setInterval(() => {
                if (counter >= 300) {
                    clearInterval(counterID)
                    buttons.forEach((button) => {
                        button.removeAttribute('disabled');
                    });
                    this.backgroundIndexCounter(Directions.right)
                    pictures_film.children[0].style.backgroundImage = `url("${this.links[this.prevPage]}")`;
                    pictures_film.children[1].style.backgroundImage = `url("${this.links[this.currPage]}")`;
                    pictures_film.children[2].style.backgroundImage = `url("${this.links[this.nextPage]}")`;
                    pictures_film.style.transform = `translate(0, 0)`

                    this.redrawNavs(navBlock);
                }else {
                    counter += 3;
                    pictures_film.style.transform = `translate(-${counter}px, 0)`
                }
            }, 1);
        }

    }

    redrawNavs(element) {
        element.innerHTML = "";
        this.links.forEach((link, index)=> {
            const button = document.createElement('button');
            button.innerText = (index + 1).toString();
            index === this.currPage? button.className = "button nav__button nav__button_current" : button.className = 'button nav__button';
            element.appendChild(button);
        })
    }

    fillSlider(element) {
        element.className = 'slider';
        element.innerHTML =
            "            <div class='slider__wrapper'>" +
            "                <button class='button slider__arrow arrow_left'>" +
            "                    Prev" +
            "                </button>" +
            "                <div class='slider__viewport'>" +
            "                    <div class='pictures_film'>" +
            "                       <div class='picture picture_prev'>" +
            "                       </div>" +
            "                       <div class='picture picture_current'>" +
            "                       </div>" +
            "                       <div class='picture picture_next'>" +
            "                       </div>" +
            "                    </div>" +
            "                </div>" +
            "                <button class='button slider__arrow arrow_right'>" +
            "                    Next" +
            "                </button>" +
            "            </div>" +
            "            <div class='slider__nav'>" +
            "            </div>";


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


