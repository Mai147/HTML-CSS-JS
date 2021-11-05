const sliderRow = $('.slider-row');
const sliderList = $('.slider-list');
const sliderItems = $$('.slider-item');
const sliderNextBtn = $('.slider-next');
const sliderPreviousBtn = $('.slider-previous');
const sliderDotList = $('.slider-dot-list');
let sliderDots;

let sliderDotActiveIndex;

const slider = {
    length: sliderItems.length,
    currentPosition: 0,
    play: '',
    resetListPosition() {
        sliderList.style.left = '-100%';
        this.swapLastImg(sliderList);
    },
    renderDot() {
        let html = "";
        for (let i = 0; i < this.length; i++) {
            if (i == 0) {
                html += `<div class="slider-dot active" data-index="${i}"></div>`;
            } else {
                html += `<div class="slider-dot" data-index="${i}"></div>`;
            }
        }
        sliderDotList.innerHTML = html;
        sliderDots = Array.from($$('.slider-dot'));
        sliderDotActiveIndex = 0;
    },
    handleSwitchImage(option) {
        if (option == 'next') {
            this.moveToRight(sliderList, this.swapFirstImg);
            this.currentPosition == this.length - 1 ? this.currentPosition = 0 : this.currentPosition++;
        } else if(option == 'previous') {
            this.moveToLeft(sliderList, this.swapLastImg);
            this.currentPosition == 0 ? this.currentPosition = this.length - 1 : this.currentPosition--;
        }
        this.activeDot();
    },
    activeDot() {
        $('.slider-dot.active').classList.remove('active');
        $(`.slider-dot[data-index='${this.currentPosition}']`).classList.add('active');
    },
    handleEvents() {
        sliderRow.onmouseover = () => {
            clearInterval(this.play);
        }
        sliderRow.onmouseleave = () => {
            this.autoPlay(3000);
        }
        sliderNextBtn.onclick = () => {
            this.handleSwitchImage('next');
        }
        sliderPreviousBtn.onclick = () => {
            this.handleSwitchImage('previous');
        }
        sliderDots.forEach(sliderDot => {
            sliderDot.onclick = () => {
                const newActive = sliderDot.dataset.index;
                let range;
                let playtmp;
                if(newActive > this.currentPosition) {
                    let i = 0;
                    range = newActive - this.currentPosition;
                    playtmp = setInterval(() => {
                        i++;
                        this.handleSwitchImage('next');
                        if (i == range) {
                            clearInterval(playtmp);
                        }
                    }, 0);
                } else if(newActive < this.currentPosition) {
                    let i = 0;
                    range = this.currentPosition - newActive;
                    playtmp = setInterval(() => {
                        i++;
                        this.handleSwitchImage('previous');
                        if (i == range) {
                            clearInterval(playtmp);
                        }
                    }, 0);
                }
            }
        })
    },
    moveToLeft(selector, callback) {
        let left = -100;
        let id;
        function frame() {
            left++;
            selector.style.left = left + '%';
            if (left == 0) {
                clearInterval(id);
                callback();
            }
        }
        id = setInterval(frame, 1);
    },
    moveToRight(selector, callback) {
        let left = -100;
        let id;
        function frame() {
            left--;
            selector.style.left = left + '%';
            if (left == -200) {
                clearInterval(id);
                callback();
            }
        }
        id = setInterval(frame, 0);
    },
    swapFirstImg() {
        const firstImg = $('.slider-list .slider-item:first-child');
        sliderList.insertAdjacentElement("beforeend", firstImg);
        sliderList.style.left = '-100%';
    }, 
    swapLastImg() {
        const lastImg = $('.slider-list .slider-item:last-child');
        sliderList.insertAdjacentElement("afterbegin", lastImg);
        sliderList.style.left = '-100%';
    },
    autoPlay(time) {
        this.play = setInterval(() => {
            this.handleSwitchImage('next');
        }, time);
    },
    init() {
        this.resetListPosition();
        this.renderDot();
        this.handleEvents();
    }
}

slider.init();
