// overlay
const Overlay = class {
  overlayElem;
  isOpened = false;

  constructor({ id, closeDuration }) {
    this.id = id;
    this.closeDuration = closeDuration;
    this.initOverlay();
  }

  initOverlay() {
    this.overlayElem = document.getElementById(this.id);
    this.overlayElem.addEventListener("click", () => {
      this.close();
    });
    this.bodyElem = document.getElementsByTagName("body")[0];
  }
  open() {
    if (!this.isOpened) {
      this.isOpened = true;
      this.overlayElem.classList.add("overlay-active");
      this.bodyElem.classList.add("hidden");
    }
  }
  close() {
    if (this.isOpened) {
      this.isOpened = false;
      this.overlayElem.classList.remove("overlay-active");
      this.overlayElem.classList.add("overlay-deactivate");
      this.bodyElem.classList.remove("hidden");
      const timeout = setTimeout(() => {
        this.overlayElem.classList.remove("overlay-deactivate");
        clearTimeout(timeout);
      }, this.closeDuration);
    }
  }
};

const Nav = class {
  navElem;
  isOpend = false;
  constructor({ navId, triggerId, overlay }) {
    this.navId = navId;
    this.triggerId = triggerId;
    this.overlay = overlay;

    this.initNav();
  }
  initNav() {
    this.navElem = document.getElementById(this.navId);
    this.triggerElem = document.getElementById(this.triggerId);

    this.triggerElem.addEventListener("click", () => {
      if (this.isOpend) {
        this.close();
      } else {
        this.open();
      }
    });

    this.navElem.addEventListener("click", (event) => {
      if (event.target.classList.contains("nav__link")) {
        overlay.close();
        this.close();
      }
    });
    if (this.overlay) {
      this.initOverlay();
    }
  }

  initOverlay() {
    this.overlay.overlayElem.addEventListener("click", () => {
      console.log("adad");
      this.close();
    });
  }
  close() {
    this.isOpend = false;
    this.navElem.classList.remove("nav-active");
    if (this.overlay) {
      this.overlay.close();
    }
  }
  open() {
    this.isOpend = true;
    this.navElem.classList.add("nav-active");
    if (this.overlay) {
      this.overlay.open();
    }
  }
};

const FixedHeader = class {
  constructor({ headerId }) {
    this.headerId = headerId;
    this.initHeader();
  }
  initHeader() {
    this.headerElem = document.getElementById("header");
    this.body = document.getElementsByTagName("body")[0];
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        this.headerElem.classList.add("header-fixed");
      } else {
        this.headerElem.classList.remove("header-fixed");
      }
    });
  }
};

const Accordion = class {
  constructor({ accId, paddingY = 15 }) {
    this.accId = accId;
    this.paddingY = paddingY;
    this.initAcc();
  }

  initAcc() {
    this.accElem = document.getElementById(this.accId);
    this.accItems = document.querySelectorAll(".accordion__text");
    this.accItems.forEach((item) => {
      const parent = item.parentElement;
      const children = parent.querySelector(".accordion__content");
      item.addEventListener("click", (event) => {
        this.toggle(parent, children);
      });
    });
  }
  toggle(elem, children) {
    const isOpened = elem.classList.contains("accordion__item-active");
    isOpened ? this.close(elem, children) : this.open(elem, children);
  }

  close(elem, children) {
    elem.classList.remove("accordion__item-active");
    children.style.height = 0;
  }
  open(elem, children) {
    const height = children.scrollHeight;
    console.log(height);
    elem.classList.add("accordion__item-active");
    children.style.height = `${height + this.paddingY}px`;
  }
};

const accordion = new Accordion({ accId: "accordion" });

const overlay = new Overlay({
  id: "overlay",
  closeDuration: 300,
});

const nav = new Nav({
  navId: "nav",
  triggerId: "nav-trigger",
  overlay: overlay,
});

const fixedHeader = new FixedHeader({ headerId: "header" });

const swiper = new Swiper(".swiper", {
  // Optional parameters
  loop: true,
  direction: "horizontal",
  slidesPerView: 1,
  spaceBetween: 40,
  autoHeight: true,
  autoplay: {
    delay: 5000,
  },

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    820: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1300: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
});

document.querySelectorAll('a[href*="#"').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    let href = this.getAttribute("href").substring(1);

    const scrollTarget = document.getElementById(href);

    // const topOffset = document.querySelector(".scrollto").offsetHeight;
    const topOffset = 70; // если не нужен отступ сверху
    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;

    window.scrollBy({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});

const reveal = (selector, options) => {
  ScrollReveal().reveal(selector, {
    origin: "bottom",
    distance: "60px",
    delay: 600,
    reset: true,
    ...options,
  });
};

ScrollReveal().reveal(".header .header__container", {
  delay: 500,
  distance: "100px",
  origin: "top",
  cleanup: true,
  container: ".header",
});

reveal(".banner__text", { origin: "left", distance: "100px" });
reveal(".banner__img", { origin: "right", distance: "10000px" });
reveal(".brands__title");
reveal(".brands__img-wrapper");
reveal(".benefits__title");
reveal(".benefit__text", { origin: "left", distance: "100px" });
reveal(".benefit__text-right", { origin: "right", distance: "100px" });
reveal(".benefit__image", { origin: "right", distance: "100px", delay: 800 });
reveal(".benefit__image-left", {
  origin: "left",
  distance: "100px",
  delay: 800,
});
reveal(".testimonials__container");
reveal(".services__title");
reveal(".service");
reveal(".work__title");
reveal(".work-item");
reveal(".track__text", { origin: "left", distance: "100px" });
reveal(".track__image", { origin: "right", distance: "100px" });
reveal(".faq__title");
reveal(".faq__image", { origin: "left", distance: "100px" });
reveal(".accordion", { origin: "right", distance: "100px" });
reveal(".accordion__item");
reveal(".contact__text", { origin: "left", distance: "100px" });
reveal(".contact__image", { origin: "right", distance: "100px" });
reveal(".footer__content", { origin: "left", distance: "100px" });
reveal(".footer__copy", { origin: "left", distance: "100px" });
