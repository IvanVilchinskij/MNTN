"use strict";

window.addEventListener('DOMContentLoaded', function () {
  /* Webp */
  var webPTest = function webPTest() {
    testWebP(function (support) {
      if (support == true) {
        document.querySelector('body').classList.add('webp');
      } else {
        document.querySelector('body').classList.add('no-webp');
      }
    });

    function testWebP(callback) {
      var webP = new Image();

      webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
      };

      webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
  };

  webPTest();

  var parallax = function parallax() {
    var HG = document.querySelector('.hg'),
        MG = document.querySelector('.mg'),
        VG = document.querySelector('.vg'),
        block = document.querySelector('.first-screen'),
        contacts = block.querySelector('.contacts'),
        body = block.querySelector('.body'),
        nav = document.querySelector('.navigation'),
        navList = document.querySelector('.navigation__list'),
        navOverflow = block.querySelector('.fs-wrapper'),
        smScroll = document.querySelector('.navigation__scroll'),
        content = document.querySelector('.content'),
        smScrollBar = document.querySelector('.navigation__list'),
        btn = document.querySelector('.navigation__arrow'),
        links = document.querySelectorAll('.navigation__item a');
    var windowWidth = window.innerWidth;
    window.addEventListener('resize', function () {
      var newWindowWidth = window.innerWidth;
      windowWidth = newWindowWidth;
      toDeleteEvents();

      if (windowWidth < 1441) {
        toAddEvents();
      } else {
        btn.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('active-nav');
        toDeleteEvents();
      }

      scrollLoop();
      chekAndRight();
    });
    toAddEvents();
    chekAndRight();
    scrollLoop();

    function toAddEvents() {
      btn.addEventListener('click', toggleClass);

      if (windowWidth < 1441) {
        links.forEach(function (link) {
          link.addEventListener('click', toggleClass);
        });
      }
    }

    function toDeleteEvents() {
      btn.removeEventListener('click', toggleClass);
      links.forEach(function (link) {
        link.removeEventListener('click', toggleClass);
      });
    }

    function toggleClass() {
      btn.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.classList.toggle('active-nav');
    }

    function scrollLoop() {
      var yScrollPosition = window.scrollY,
          yScrollForSm = 0.75 * yScrollPosition / (block.offsetHeight + content.offsetHeight) * (smScroll.offsetHeight + smScrollBar.offsetHeight),
          hB = block.offsetHeight,
          pB = yScrollPosition / hB * 100,
          o = windowWidth < 992 ? 1 - 1 / 75 * pB : 1 - 1 / 111.4 * pB;

      if (yScrollForSm >= 0.75 * smScrollBar.offsetHeight) {
        setTranslate(0, 0.75 * smScrollBar.offsetHeight, smScroll, 50, false, true);
      } else if (yScrollForSm < 0.75 * (smScroll.offsetHeight + smScrollBar.offsetHeight)) {
        setTranslate(0, yScrollForSm, smScroll, 50, false, true);
      }

      if (o > -0.05) {
        if (yScrollPosition >= 0) {
          if (windowWidth < 992) {
            setTranslate(0, yScrollPosition * -0.0831, HG, 80);
            setTranslate(0, yScrollPosition * -0.0415, MG, 60);
            setTranslate(0, yScrollPosition * -0.0138, VG, 40);
          } else {
            setTranslate(0, yScrollPosition * -0.0846, HG, 80);
            setTranslate(0, yScrollPosition * -0.0423, MG, 60);
            setTranslate(0, yScrollPosition * -0.0141, VG, 40);
          }

          setTranslate(0, yScrollPosition * -0.0846, contacts, 50, false);
          setTranslate(0, yScrollPosition * -0.0846, body, 50, false);
        }

        if (windowWidth < 1441) {
          setTranslate(0, yScrollPosition * -0.0446, navList, 50, false);
          setTranslate(0, yScrollPosition * 0, nav, 50, false);
        } else {
          setTranslate(0, yScrollPosition * -0.0846, nav, 50, false);
          setTranslate(0, yScrollPosition * 0, navList, 50, false);
        }
      }

      if (o < 0) {
        navOverflow.style.visibility = 'hidden';
      } else {
        navOverflow.style.visibility = 'visible';
      }

      setOpacity(contacts, o);
      setOpacity(body, o);
      setOpacity(nav, o, true);
      requestAnimationFrame(scrollLoop);
    }

    function setOpacity(el, o) {
      var nav = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      el.style.opacity = o;

      if (nav) {
        if (o < 0) {
          el.classList.add('fixed-nav');
        } else {
          el.classList.remove('fixed-nav');
        }
      }
    }

    function setTranslate(xPos, yPos, el, ms) {
      var tr = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var forNav = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      el.style.transformStyle = 'preserve-3d';
      el.style.willChange = 'transform';
      el.style.transform = "translate3d(" + xPos + ", " + yPos + "%, 0)";

      if (tr) {
        el.style.transition = "transform ".concat(ms, "ms linear");
      }

      if (forNav) {
        el.style.transform = "translate3d(" + xPos + ", " + yPos + "px, 0)";
      }
    }

    function chekAndRight() {
      if (window.innerWidth < 1441) {
        var navWidth = nav.clientWidth;
        nav.style.right = "-".concat(navWidth, "px");
      } else if (window.innerWidth < 1921) {
        nav.style.right = "4.69%";
      }
    }
  };

  parallax();

  var linkScrol = function linkScrol() {
    var linksNav = document.querySelectorAll('[href^="#"]');
    linksNav.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var hash = this.href.replace(/[^#]*(.*)/, '$1');
        smoothScroll(hash, 1000);
      });
    });

    function smoothScroll(tr, duration) {
      var target = document.querySelector(tr),
          tragetPosition = target.getBoundingClientRect().top,
          stratPosition = window.pageYOffset,
          differPositions = tragetPosition - stratPosition,
          windowHeight = document.documentElement.clientHeight,
          distance = differPositions > windowHeight + stratPosition ? differPositions : tragetPosition,
          startTime = null;
      requestAnimationFrame(animation);

      function animation(currentTime) {
        if (startTime === null) {
          startTime = currentTime;
        }

        var timeElapsed = currentTime - startTime,
            run = ease(timeElapsed, stratPosition, distance, duration);
        window.scrollTo(0, run);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }

      function ease(timeElapsed, stratPosition, distance, duration) {
        timeElapsed /= duration / 2;

        if (timeElapsed < 1) {
          return distance / 2 * timeElapsed * timeElapsed + stratPosition;
        }

        timeElapsed--;
        return -(distance / 2) * (timeElapsed * (timeElapsed - 2) - 1) + stratPosition;
      }
    }
  };

  linkScrol();
});