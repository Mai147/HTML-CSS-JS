const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const loginBtns = $$('.header-login');
const regisBtns = $$('.header-register');

const modalOverlays = $$('.modal-overlay');

const authForms = $$('.auth-form');
const authFormSwitchBtns = $$('.auth-form-switch-btn');
const authFormBackBtns = $$('.auth-form-control-back');

const mobileHeaderMenu = $('.mobile-header-menu');
const mobileNav = $('.mobile-header-nav-list');
const modalCloseBtns = $$('.modal-header-close');

const app = {
    modalIndex: 0,
    showModal() {
        $(`.modal[data-index='${this.modalIndex}']`).classList.add('active');
    },
    hiddenAuthForm() {
        Array.from(authForms).forEach(authForm => authForm.classList.remove('active'));
    },
    hiddenModal() {
        $(`.modal[data-index='${this.modalIndex}']`).classList.remove('active');
        if (this.modalIndex == 1) {
            this.hiddenAuthForm();
            this.modalIndex = 0;
        }
        else {
            mobileNav.classList.remove('active');
            this.modalIndex = 1;
        }
    },
    selectAuthForm(selector) {
        let selectedForm;
        Array.from(authForms).forEach((authForm) => {
            if (authForm.classList.contains(selector)){
                selectedForm = authForm;
                return;
            }
        }) 
        return selectedForm;
    },
    switchAuthForm() {
        Array.from(authForms).forEach((authForm) => {
            if (authForm.classList.contains('active')) {
                authForm.classList.remove('active');
            } else {
                authForm.classList.add('active');
            }
        })
    },
    handleEvents() {
        // Handle login button click
        Array.from(loginBtns).forEach(loginBtn => {
            loginBtn.onclick = () => {
                this.modalIndex = 1;
                this.showModal();
                const loginForm = this.selectAuthForm('auth-form-login');
                loginForm.classList.add('active');
            }
        })
        // Handle regis button click
        Array.from(regisBtns).forEach(regisBtn => {
            regisBtn.onclick = () => {
                this.modalIndex = 1;
                this.showModal(1);
                const regisForm = this.selectAuthForm('auth-form-register');
                regisForm.classList.add('active');
            }
        })

        // Handle switch button
        Array.from(authFormSwitchBtns).forEach(authFormSwitchBtn => {
            authFormSwitchBtn.onclick = () => this.switchAuthForm();  
        }) 

        // Handle back button
        Array.from(authFormBackBtns).forEach(authFormBackBtn => {
            authFormBackBtn.onclick = () => this.hiddenModal(1);
        }) 

        // Handle mobile menu button click
        mobileHeaderMenu.onclick = () => {
            this.modalIndex = 0;
            this.showModal();
            mobileNav.classList.add('active');
        }

        // Handle modal header close
        Array.from(modalCloseBtns).forEach(modalCloseBtn => {
            modalCloseBtn.onclick = () => this.hiddenModal();
        })
        
        // Handle modal display/hidden
        Array.from(modalOverlays).forEach(modalOverlay => {
            modalOverlay.onclick = () => this.hiddenModal();
        }) 
    },
    init() {
        this.handleEvents();
    }
}

app.init();
