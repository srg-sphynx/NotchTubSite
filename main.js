document.addEventListener('DOMContentLoaded', () => {
    // Notch Simulator Logic
    const notchContainer = document.getElementById('notch-container');
    const hoverZones = document.querySelectorAll('.hover-zone');

    if (notchContainer) {
        hoverZones.forEach(zone => {
            zone.addEventListener('mouseenter', (e) => {
                const state = e.target.getAttribute('data-state');
                resetNotchState();
                if (state) {
                    notchContainer.classList.add(`active-${state}`);
                }
            });

            zone.addEventListener('mouseleave', () => {
                // Optional: Delay clearing to prevent flicker or keep it strictly hover
                // resetNotchState(); 
            });
        });

        // Reset when leaving the entire container area
        const simulatorArea = document.getElementById('notch-simulator-area');
        if (simulatorArea) {
            simulatorArea.addEventListener('mouseleave', () => {
                resetNotchState();
            });
        }
    }

    function resetNotchState() {
        notchContainer.classList.remove('active-media', 'active-system', 'active-privacy');
    }


    // Theme Management
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        // Initialize theme
        const storedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        themeBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeIcon(themeBtn, isDark);
        });

        // Initial icon state
        updateThemeIcon(themeBtn, document.documentElement.classList.contains('dark'));
    }

    function updateThemeIcon(btn, isDark) {
        const icon = btn.querySelector('.material-symbols-outlined');
        if (icon) {
            icon.textContent = isDark ? 'light_mode' : 'dark_mode';
        }
    }

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
        observer.observe(el);
    });
});
