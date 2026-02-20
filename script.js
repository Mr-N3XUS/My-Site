// ===== انتظار برای بارگذاری کامل DOM =====
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ===== متغیرهای عمومی =====
    const header = document.querySelector('.header');
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.getElementById('menuToggle');
    const backToTop = document.getElementById('backToTop');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // ===== افکت تایپ =====
    class TypeWriter {
        constructor(txtElement, words, wait = 3000) {
            this.txtElement = txtElement;
            this.words = words;
            this.txt = '';
            this.wordIndex = 0;
            this.wait = parseInt(wait, 10);
            this.type();
            this.isDeleting = false;
        }
        
        type() {
            const current = this.wordIndex % this.words.length;
            const fullTxt = this.words[current];
            
            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }
            
            this.txtElement.innerHTML = this.txt;
            
            let typeSpeed = 100;
            
            if (this.isDeleting) {
                typeSpeed /= 2;
            }
            
            if (!this.isDeleting && this.txt === fullTxt) {
                typeSpeed = this.wait;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.wordIndex++;
                typeSpeed = 200;
            }
            
            setTimeout(() => this.type(), typeSpeed);
        }
    }
    
    // شروع افکت تایپ
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        const words = ['طراحی وب',' کدنویسی','امنیت سایبری','بک اند ','فیلم و سریال','کتاب های تاریخی و معمایی','شنا و بوکس'];
        new TypeWriter(typedTextElement, words, 2000);
    }
    
    // ===== منوی موبایل =====
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // تغییر آیکن منو
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // ===== بستن منو با کلیک روی لینک =====
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // ===== تغییر هدر هنگام اسکرول =====
    function handleHeaderScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // ===== نمایش/مخفی کردن دکمه بازگشت به بالا =====
    function handleBackToTop() {
        if (window.scrollY > 50) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
    
    // ===== لینک فعال در ناوبری =====
    function handleActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    
    
    // ===== فیلتر پروژه‌ها =====
    function filterProjects(category) {
        projectCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // ===== رویدادهای فیلتر =====
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
    
    
    // ===== رویداد اسکرول =====
    window.addEventListener('scroll', function() {
        handleHeaderScroll();
        handleBackToTop();
        handleActiveLink();
        animateStats();
        animateSkills();
    });
    
    // ===== کلیک روی دکمه بازگشت به بالا =====
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== اجرای اولیه =====
    handleHeaderScroll();
    handleBackToTop();
    
    // ===== انیمیشن اولیه مهارت‌ها =====
    setTimeout(() => {
        animateSkills();
        animateStats();
    }, 500);
});