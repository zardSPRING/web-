window.addEventListener('DOMContentLoaded', function() {

    function animate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                clearInterval(obj.timer);
                callback && callback();
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 15);
    };
    var goBack = document.querySelector("#goBack");
    var nowtime = document.querySelector(".nowtime");

    function getNowTime(obj) {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        hour = hour > 9 ? hour : '0' + hour;
        minute = minute > 9 ? minute : '0' + minute;
        second = second > 9 ? second : '0' + second;
        obj.innerHTML = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute + ':' + second;
    }
    getNowTime(nowtime);
    var getTime = setInterval(function() {
        getNowTime(nowtime);
    }, 1000)

    var goBack = document.querySelector("#goBack");
    var sliderStar = document.querySelector("#slider-star");
    var sliderTalk = document.querySelector("#slider-talk");
    var sliderShare = document.querySelector("#slider-share");
    sliderStar.addEventListener("mouseover", function() {
        this.style.borderColor = "red";
        this.src = "./images/slider-star1.png";
    })
    sliderStar.addEventListener("mouseleave", function() {
        this.style.borderColor = "black";
        this.src = "./images/slider-star.png";
    })
    sliderTalk.addEventListener("mouseover", function() {
        this.style.borderColor = "red";
        this.src = "./images/slider-talk1.png";
    })
    sliderTalk.addEventListener("mouseleave", function() {
        this.style.borderColor = "black";
        this.src = "./images/slider-talk.png";
    })
    sliderShare.addEventListener("mouseover", function() {
        this.style.borderColor = "red";
        this.src = "./images/slider-share1.png";
    })
    sliderShare.addEventListener("mouseleave", function() {
        this.style.borderColor = "black";
        this.src = "./images/slider-share.png";
    })

    window.addEventListener("scroll", function() {
        if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
            goBack.style.display = "block";
        } else {
            goBack.style.display = "none";
        }
    })
    goBack.addEventListener("click", function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    })

    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var focus = document.querySelector('.focus');
    focus.addEventListener('mouseenter', function() {
        prev.style.display = 'block';
        next.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function() {
        prev.style.display = 'none';
        next.style.display = 'none';
        timer = setInterval(function() {
            next.click();
        }, 2000);
    });
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('data-index', i);
        ol.appendChild(li);
        ol.children[0].className = 'current';
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            };
            this.className = 'current';
            var focusWidth = focus.offsetWidth;
            var index = this.getAttribute('data-index');
            num = index;
            circle = index;
            animate(ul, -index * focusWidth);
        });
    };
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    var circle = 0;
    var flag = true;
    next.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0 + 'px';
                num = 0;
            }
            num++;
            animate(ul, -num * focus.offsetWidth, function() {
                flag = true;
            });
            circle++;
            circle = circle == ol.children.length ? 0 : circle;
            circleChange();
        }
    });
    prev.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focus.offsetWidth + 'px';

            }
            num--;
            animate(ul, -num * focus.offsetWidth, function() {
                flag = true;
            });
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circle = circle < 0 ? ol.length - 1 : circle;
            circleChange();
        }

    });
    var timer = setInterval(function() {
        next.click();
    }, 2000);

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    };



});