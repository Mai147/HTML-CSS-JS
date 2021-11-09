const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const slider = {
    wrappers: [],
    sliderMains: [],
    sliderSubs: [],
    sliderRows: [],
    sliderLists: [],
    sliderItems: [],
    sliderNexts: [],
    sliderPreviouss: [],
    sliderLength: [],
    sliderCol: [],
    sliderGap: [],
    currentPosition: [],
    currentItem: [],
    setDataIndex() {
        this.wrappers.forEach((wrapper, index) => {
            wrapper.dataset.index = index;
        })
        this.sliderItems.forEach(sliderItem => {
            sliderItem.forEach((item, index) => {
                item.dataset.index = index;
            })
        })
    },
    switchImage(index) {
        if (this.currentItem[index] >= this.sliderLength[index] - this.sliderCol[index] || this.currentItem[index] <= 0) {
            if (this.currentItem[index] >= this.sliderLength[index] -this.sliderCol[index]) {
                this.currentItem[index] = this.sliderLength[index] - this.sliderCol[index];
                this.sliderNexts[index].classList.add('disabled');
            } else {
                this.currentItem[index] = 0;
                this.sliderPreviouss[index].classList.add('disabled');
            }
        }
        else {
            this.sliderPreviouss[index].classList.remove('disabled');
            this.sliderNexts[index].classList.remove('disabled');
        }
        this.currentPosition[index] = `calc(((100% / ${this.sliderCol[index]}) + (${this.sliderGap[index]} / ${this.sliderCol[index]}))*${this.currentItem[index]}*(-1))`;
        this.sliderLists[index].style.left = `${this.currentPosition[index]}`;
    },
    handleEvents() {
        this.sliderNexts.forEach((sliderNext, index) => {
            sliderNext.onclick = () => {
                this.currentItem[index]++;
                this.switchImage(index);
            }
        })
        this.sliderPreviouss.forEach((sliderPrevious, index) => {
            sliderPrevious.onclick = () => {
                this.currentItem[index]--;
                this.switchImage(index);
            }
        })
        this.sliderSubs.forEach(sliderSub => {
            sliderSub.onclick = (e) => {
                const sliderMainIndex = sliderSub.dataset.index - 1;
                const selectedItem = e.target.closest('.slider-item');
                if (selectedItem) {
                    this.currentItem[sliderMainIndex] = selectedItem.dataset.index;
                    this.switchImage(sliderMainIndex);
                }
            }
        })
    },
    init() {
        this.wrappers = Array.from($$('.slider'));
        this.wrappers.forEach(wrapper => {
            const htmls = `
                <div class="slider-control">
                    <div class="slider-button slider-previous disabled">
                        <i class="fas fa-chevron-left"></i>
                    </div>
                    <div class="slider-button slider-next">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
            `
            wrapper.innerHTML += htmls;
        })
        this.sliderMains = Array.from($$('.slider.slider-main'));
        this.sliderSubs = Array.from($$('.slider.slider-sub'));
        this.sliderRows = Array.from($$('.slider-row'));
        this.sliderLists = Array.from($$('.slider-list'));
        this.sliderNexts = Array.from($$('.slider-next'));
        this.sliderPreviouss = Array.from($$('.slider-previous'));
        this.sliderLists.forEach((sliderList, index) => {
            const currentSliderItems = Array.from(sliderList.querySelectorAll('.slider-item'));
            this.sliderItems = [...this.sliderItems, currentSliderItems];
            this.sliderLength[index] = currentSliderItems.length;
            this.sliderCol[index] = Number(sliderList.dataset.col) || 6;
            this.sliderGap[index] = sliderList.dataset.gap || '0px';
            this.currentPosition[index] = '0';
            this.currentItem[index] = 0;
            sliderList.style.marginLeft = `-${this.sliderGap[index]}`;
            currentSliderItems.forEach(currentSliderItem => {
                currentSliderItem.style.flex = `1 0 calc((100% / ${this.sliderCol[index]}) - ${this.sliderGap[index]})`;
                currentSliderItem.style.marginLeft = `${this.sliderGap[index]}`;
            })
        })
        this.setDataIndex();
        this.handleEvents();
    }
}

export default slider;