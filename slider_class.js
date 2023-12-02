const Directions = {
    left: "left",
    right: "right"
}
export default class Slider {
    /**
     @param links {Array<string>}
      **/
    constructor(links) {
        this.links = links;
        this.currPage = 0;
        this.prevPage = this.links.length - 1 || this.currPage;
        this.nextPage = 1;
        this.element = document.createElement('div');
    }

    backgroundIndexCounter(currentLink, direction) {
        const oldNum = this.currPage;
        let newNum;
        let prevNum;
        let nextNum;

        if(this.links.length === 1) {
            newNum = 1;
            prevNum = 1;
            nextNum = 1;
        } else {
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
        this.nextPage = newNum;

    }

    redrawNavs(element) {
        this.links.forEach((link, index)=> {
            const button = document.createElement('button');
            button.innerText = (index + 1).toString();
            index === this.currPage? button.className = "nav__button nav__button_current" : button.className = 'nav__button';
            element.appendChild(button);
        })
    }
    fillSlider(element) {
        element.className = 'slider';
        element.innerHTML =
"            <div class='slider__wrapper'>" +
"                <button class='slider__arrow arrow_left'>" +
"                    Prev" +
"                </button>" +
"                <div class='slider__viewport'>" +
"                    <div class='picture_prev'>" +
"                    </div>" +
"                    <div class='picture_current'>"+
"                    </div>" +
"                    <div class='picture_next'>"+
"                    </div>"+
"                </div>"+
"                <button class='slider__arrow arrow_right'>"+
"                    Next"+
"                </button>"+
"            </div>" +
"            <div class='slider__nav'>" +
"            </div>";

        const navBlock = element.getElementsByClassName('slider__nav')[0];
        this.redrawNavs(navBlock);

    }

    picturesRepaint(element) {
        const viewPort = element.getElementsByClassName('slider__viewport')[0]
    }

}


