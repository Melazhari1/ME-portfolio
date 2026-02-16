// --- Tailwind Configuration ---
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            },
            colors: {
                primary: 'var(--primary-color)',
                dark: 'var(--main-bg)',
                'dark-gray': 'var(--sidebar-bg)',
                'sidebar-bg': 'var(--sidebar-bg)',
                'light-gray': '#f5f5f5',
                text: 'var(--text-main)',
                muted: 'var(--text-muted)'
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        }
    }
}

// --- Navigation Logic ---
let isAnimating = false;

function showSection(sectionId) {
    if (isAnimating) return;

    const targetSection = document.getElementById(sectionId);
    if (!targetSection) return;

    const currentSection = document.querySelector('.section-content.active');

    // If clicking same section, do nothing (but ensure others are hidden)
    if (currentSection && currentSection.id === sectionId) {
        document.querySelectorAll('.section-content').forEach(s => {
            if (s.id !== sectionId) s.classList.remove('active', 'exit');
        });
        return;
    }

    isAnimating = true;

    // Nav active state update
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active', 'text-primary', 'border-primary');
        link.classList.add('border-transparent');
    });
    const activeLink = document.querySelector(`.nav-link[data-target="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active', 'text-primary', 'border-primary');
        activeLink.classList.remove('border-transparent');
    }

    const animations = ['up', 'down', 'left', 'right', 'scale', 'flip', '3d'];
    const randomAnim = animations[Math.floor(Math.random() * animations.length)];

    if (currentSection) {
        // 1. Animate Out Current
        currentSection.classList.remove('active');
        // Clean up any stray classes on all sections
        document.querySelectorAll('.section-content').forEach(s => {
            const allAnims = ['up', 'down', 'left', 'right', 'scale', 'flip', '3d'];
            allAnims.forEach(a => s.classList.remove(`anim-${a}-in`, `anim-${a}-out`));
        });
        currentSection.classList.add('exit', `anim-${randomAnim}-out`);

        // 2. Wait for exit animation to finish before showing next
        setTimeout(() => {
            currentSection.classList.remove('exit', `anim-${randomAnim}-out`);

            // Final safety check: hide ALL sections
            document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active', 'exit'));

            // 3. Show New Section
            targetSection.classList.add('active', `anim-${randomAnim}-in`);

            // 4. Reset scroll position
            const container = document.querySelector('.scroll-container');
            if (container) container.scrollTop = 0;

            if (sectionId === 'resume') animateSkills();

            // Allow new clicks after enter animation completes
            setTimeout(() => { isAnimating = false; }, 600);
        }, 500);
    } else {
        // Initial Load or Fallback: Clean everything and show target
        document.querySelectorAll('.section-content').forEach(s => {
            s.classList.remove('active', 'exit');
            animations.forEach(a => s.classList.remove(`anim-${a}-in`, `anim-${a}-out`));
        });
        targetSection.classList.add('active', 'anim-up-in');
        const container = document.querySelector('.scroll-container');
        if (container) container.scrollTop = 0;
        if (sectionId === 'resume') animateSkills();
        isAnimating = false;
    }

    // Mobile menu handling
    if (window.innerWidth < 768) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && !sidebar.classList.contains('-translate-x-full')) {
            sidebar.classList.add('-translate-x-full');
            const mobileBtn = document.getElementById('mobile-menu-btn');
            if (mobileBtn) mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
}

// --- URL Routing Logic ---
function handleRouting() {
    const hash = window.location.hash.replace('#', '');
    const validSections = ['home', 'about', 'resume', 'portfolio', 'blog', 'contact', 'blog-detail', 'portfolio-detail'];

    // Fallback if detail sections are empty (direct load)
    if (hash === 'blog-detail' && (!document.getElementById('blog-post-content') || !document.getElementById('blog-post-content').innerHTML)) {
        window.location.hash = 'blog';
        return;
    }
    if (hash === 'portfolio-detail' && (!document.getElementById('portfolio-project-content') || !document.getElementById('portfolio-project-content').innerHTML)) {
        window.location.hash = 'portfolio';
        return;
    }

    if (hash && validSections.includes(hash)) {
        showSection(hash);
    } else {
        showSection('home');
        // If no hash, set it to home silently without triggering event if possible, 
        // but simple way is just leave it or set it.
        // window.location.hash = 'home'; 
    }
}

window.addEventListener('hashchange', handleRouting);
window.addEventListener('DOMContentLoaded', handleRouting);

// --- Skill Bars Animation ---
function animateSkills() {
    document.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = '0';
    });
    setTimeout(() => {
        document.querySelectorAll('.skill-bar').forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }, 100);
}

// --- Portfolio Filtering ---
function filterPortfolio(category) {
    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.classList.remove('text-white', 'active-filter');
        btn.classList.add('text-gray-500');
    });
    const activeBtn = document.querySelector(`[data-filter="${category}"]`);
    activeBtn.classList.remove('text-gray-500');
    activeBtn.classList.add('text-white', 'active-filter');

    document.querySelectorAll('.portfolio-item').forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
            item.classList.remove('hidden');
            item.animate([
                { opacity: 0, transform: 'scale(0.9)' },
                { opacity: 1, transform: 'scale(1)' }
            ], {
                duration: 300,
                easing: 'ease-out'
            });
        } else {
            item.classList.add('hidden');
        }
    });

    // Reset scroll position when filtering
    const container = document.querySelector('.scroll-container');
    if (container) {
        container.scrollTop = 0;
    }
}

// --- Blog Filtering ---
function filterBlog(category) {
    document.querySelectorAll('[data-blog-filter]').forEach(btn => {
        btn.classList.remove('text-white', 'active-filter');
        btn.classList.add('text-gray-500');
    });
    const activeBtn = document.querySelector(`[data-blog-filter="${category}"]`);
    activeBtn.classList.remove('text-gray-500');
    activeBtn.classList.add('text-white', 'active-filter');

    document.querySelectorAll('.blog-item').forEach(item => {
        const itemCat = item.getAttribute('data-blog-cat');
        if (category === 'all' || itemCat === category) {
            item.classList.remove('hidden');
            item.animate([
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1 }
            ], { duration: 300, easing: 'ease-out' });
        } else {
            item.classList.add('hidden');
        }
    });

    const container = document.querySelector('.scroll-container');
    if (container) container.scrollTop = 0;
}

// --- Blog Detail Logic ---
function openBlogPost(button) {
    const article = button.closest('article');
    const title = article.querySelector('h3').textContent;
    const category = article.querySelector('span').textContent;
    const image = article.querySelector('img').src;
    const dateDay = article.querySelector('.text-primary.font-bold').textContent;
    const dateMonth = article.querySelector('.text-gray-400.text-\\[10px\\]').textContent;
    const excerpt = article.querySelector('p').textContent;

    const content = `
        <div class="animate-slide-up">
            <!-- Hero Image -->
            <div class="rounded-2xl overflow-hidden mb-10 h-[300px] md:h-[450px] relative group">
                <img src="${image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="${title}">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
            
            <div class="max-w-4xl mx-auto">
                <!-- Meta Information -->
                <div class="flex flex-wrap items-center gap-4 mb-6 text-sm">
                    <span class="bg-primary/20 text-primary px-4 py-2 rounded-full font-bold uppercase tracking-wider text-xs border border-primary/30">
                        ${category}
                    </span>
                    <span class="text-gray-500 flex items-center gap-2">
                        <i class="far fa-calendar-alt"></i> ${dateMonth} ${dateDay}, 2026
                    </span>
                    <span class="text-gray-500 flex items-center gap-2">
                        <i class="far fa-clock"></i> 5 min read
                    </span>
                    <span class="text-gray-500 flex items-center gap-2">
                        <i class="far fa-eye"></i> 1.2k views
                    </span>
                </div>
                
                <!-- Title -->
                <h1 class="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    ${title}
                </h1>

                <!-- Author Info -->
                <div class="flex items-center gap-4 mb-10 pb-10 border-b border-gray-800">
                    <div class="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30">
                        <img src="https://ui-avatars.com/api/?name=Mohamed+elazhari&background=00bd56&color=fff&size=128" alt="Author" class="w-full h-full object-cover">
                    </div>
                    <div>
                        <h4 class="text-white font-bold">Mohamed elazhari</h4>
                        <p class="text-gray-500 text-sm">Web Developer & Designer</p>
                    </div>
                    <div class="ml-auto flex gap-2">
                        <button class="w-9 h-9 rounded-full bg-sidebar-bg border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all" title="Share on Twitter">
                            <i class="fab fa-twitter"></i>
                        </button>
                        <button class="w-9 h-9 rounded-full bg-sidebar-bg border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all" title="Share on LinkedIn">
                            <i class="fab fa-linkedin-in"></i>
                        </button>
                        <button class="w-9 h-9 rounded-full bg-sidebar-bg border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all" title="Copy Link">
                            <i class="fas fa-link"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Article Content -->
                <div class="prose prose-invert max-w-none text-gray-400 space-y-6 leading-relaxed">
                    <p class="text-lg text-gray-300 font-medium leading-relaxed">
                        ${excerpt}
                    </p>
                    
                    <p>
                        In today's rapidly evolving digital landscape, staying ahead of the curve requires continuous learning 
                        and adaptation. Whether you're a seasoned professional or just starting your journey, understanding the 
                        fundamentals while embracing new technologies is crucial for success.
                    </p>

                    <h2 class="text-2xl md:text-3xl font-bold text-white mt-10 mb-4">Key Principles to Consider</h2>
                    <p>
                        The foundation of any great project lies in its architecture and planning. Before diving into code or design, 
                        taking the time to map out your approach can save countless hours of refactoring and rework. Here are some 
                        essential principles to keep in mind:
                    </p>

                    <ul class="space-y-3 ml-6">
                        <li class="flex gap-3">
                            <span class="text-primary mt-1 flex-shrink-0">•</span>
                            <span><strong class="text-white">User-Centric Approach:</strong> Always prioritize the end-user experience in every decision you make.</span>
                        </li>
                        <li class="flex gap-3">
                            <span class="text-primary mt-1 flex-shrink-0">•</span>
                            <span><strong class="text-white">Performance Optimization:</strong> Fast-loading, responsive applications are no longer optional—they're expected.</span>
                        </li>
                        <li class="flex gap-3">
                            <span class="text-primary mt-1 flex-shrink-0">•</span>
                            <span><strong class="text-white">Maintainable Code:</strong> Write code that your future self (and your team) will thank you for.</span>
                        </li>
                        <li class="flex gap-3">
                            <span class="text-primary mt-1 flex-shrink-0">•</span>
                            <span><strong class="text-white">Continuous Learning:</strong> The tech industry never stops evolving, and neither should you.</span>
                        </li>
                    </ul>

                    <blockquote class="border-l-4 border-primary pl-6 py-4 my-8 bg-sidebar-bg/50 rounded-r-lg italic text-white text-xl">
                        "Design is not just what it looks like and feels like. Design is how it works." – Steve Jobs
                    </blockquote>

                    <h2 class="text-2xl md:text-3xl font-bold text-white mt-10 mb-4">Practical Implementation</h2>
                    <p>
                        Theory is important, but putting these concepts into practice is where the real learning happens. Start with 
                        small projects that allow you to experiment without the pressure of perfection. Build, iterate, and refine 
                        your approach based on real-world feedback.
                    </p>

                    <div class="bg-sidebar-bg border border-gray-800 rounded-xl p-6 my-8">
                        <div class="flex items-start gap-4">
                            <div class="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-lightbulb text-primary text-xl"></i>
                            </div>
                            <div>
                                <h4 class="text-white font-bold mb-2">Pro Tip</h4>
                                <p class="text-gray-400 text-sm leading-relaxed">
                                    Don't be afraid to experiment with new tools and frameworks. Set aside time each week to explore 
                                    emerging technologies and evaluate how they might benefit your workflow.
                                </p>
                            </div>
                        </div>
                    </div>

                    <p>
                        Remember that every expert was once a beginner. The journey to mastery is paved with consistent effort, 
                        curiosity, and a willingness to learn from both successes and failures. Embrace the process, stay patient, 
                        and keep pushing your boundaries.
                    </p>

                    <h2 class="text-2xl md:text-3xl font-bold text-white mt-10 mb-4">Conclusion</h2>
                    <p>
                        As we wrap up, remember that the most important step is to start. Whether it's a new project, learning a 
                        new skill, or refining your existing expertise, taking action today will compound into significant growth 
                        tomorrow. The digital world is full of opportunities for those willing to seize them.
                    </p>
                </div>

                <!-- Tags -->
                <div class="mt-12 pt-8 border-t border-gray-800">
                    <div class="flex flex-wrap items-center gap-3">
                        <span class="text-gray-500 font-bold text-sm">Tags:</span>
                        <span class="bg-sidebar-bg border border-gray-800 px-4 py-2 rounded-full text-sm text-gray-400 hover:border-primary hover:text-primary transition-all cursor-pointer">Web Development</span>
                        <span class="bg-sidebar-bg border border-gray-800 px-4 py-2 rounded-full text-sm text-gray-400 hover:border-primary hover:text-primary transition-all cursor-pointer">Design</span>
                        <span class="bg-sidebar-bg border border-gray-800 px-4 py-2 rounded-full text-sm text-gray-400 hover:border-primary hover:text-primary transition-all cursor-pointer">Tutorial</span>
                        <span class="bg-sidebar-bg border border-gray-800 px-4 py-2 rounded-full text-sm text-gray-400 hover:border-primary hover:text-primary transition-all cursor-pointer">Best Practices</span>
                    </div>
                </div>

                <!-- Share Section -->
                <div class="mt-8 bg-sidebar-bg border border-gray-800 rounded-xl p-6 flex flex-wrap items-center gap-4">
                    <span class="text-white font-bold">Share this article:</span>
                    <div class="flex gap-3">
                        <button class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#1DA1F2] hover:text-white transition-all">
                            <i class="fab fa-twitter"></i>
                        </button>
                        <button class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#0077B5] hover:text-white transition-all">
                            <i class="fab fa-linkedin-in"></i>
                        </button>
                        <button class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#3b5998] hover:text-white transition-all">
                            <i class="fab fa-facebook-f"></i>
                        </button>
                        <button class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                            <i class="fas fa-envelope"></i>
                        </button>
                    </div>
                </div>

                <!-- Related Posts -->
                <div class="mt-16">
                    <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <i class="fas fa-bookmark text-primary"></i>
                        Related Articles
                    </h3>
                    <div class="grid md:grid-cols-2 gap-6">
                        <!-- Related Post 1 -->
                        <div class="bg-sidebar-bg rounded-xl overflow-hidden border border-gray-800 group hover:border-primary transition-all cursor-pointer">
                            <div class="h-40 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                     alt="Related Post" 
                                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                            </div>
                            <div class="p-5">
                                <span class="text-primary text-xs font-bold uppercase tracking-wider mb-2 block">Development</span>
                                <h4 class="text-white font-bold text-lg group-hover:text-primary transition-colors line-clamp-2">
                                    Modern JavaScript Best Practices for 2026
                                </h4>
                            </div>
                        </div>

                        <!-- Related Post 2 -->
                        <div class="bg-sidebar-bg rounded-xl overflow-hidden border border-gray-800 group hover:border-primary transition-all cursor-pointer">
                            <div class="h-40 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                     alt="Related Post" 
                                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                            </div>
                            <div class="p-5">
                                <span class="text-primary text-xs font-bold uppercase tracking-wider mb-2 block">Design</span>
                                <h4 class="text-white font-bold text-lg group-hover:text-primary transition-colors line-clamp-2">
                                    Creating Stunning UI Animations with CSS
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Comments Section -->
                <div class="mt-16 pt-16 border-t border-gray-800">
                    <h3 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <i class="far fa-comments text-primary"></i>
                        Comments (3)
                    </h3>

                    <!-- Existing Comments -->
                    <div class="space-y-6 mb-12">
                        <!-- Comment 1 -->
                        <div class="bg-sidebar-bg border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
                            <div class="flex items-start gap-4">
                                <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-700 flex-shrink-0">
                                    <img src="https://ui-avatars.com/api/?name=John+Doe&background=random" alt="Commenter" class="w-full h-full object-cover">
                                </div>
                                <div class="flex-1">
                                    <div class="flex items-center justify-between mb-2">
                                        <h4 class="text-white font-bold">John Doe</h4>
                                        <span class="text-gray-500 text-xs">2 days ago</span>
                                    </div>
                                    <p class="text-gray-400 text-sm leading-relaxed">
                                        Great article! This really helped me understand the concepts better. I've been struggling with this topic for a while, and your explanation made it much clearer. Thanks for sharing!
                                    </p>
                                    <button class="mt-3 text-primary text-xs font-bold hover:underline flex items-center gap-1">
                                        <i class="fas fa-reply"></i> Reply
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Comment 2 -->
                        <div class="bg-sidebar-bg border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
                            <div class="flex items-start gap-4">
                                <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-700 flex-shrink-0">
                                    <img src="https://ui-avatars.com/api/?name=Sarah+Chen&background=random" alt="Commenter" class="w-full h-full object-cover">
                                </div>
                                <div class="flex-1">
                                    <div class="flex items-center justify-between mb-2">
                                        <h4 class="text-white font-bold">Sarah Chen</h4>
                                        <span class="text-gray-500 text-xs">3 days ago</span>
                                    </div>
                                    <p class="text-gray-400 text-sm leading-relaxed">
                                        I've implemented this approach in my recent project and the results have been amazing. The performance improvements alone made it worthwhile. Highly recommend following these best practices!
                                    </p>
                                    <button class="mt-3 text-primary text-xs font-bold hover:underline flex items-center gap-1">
                                        <i class="fas fa-reply"></i> Reply
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Comment 3 -->
                        <div class="bg-sidebar-bg border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
                            <div class="flex items-start gap-4">
                                <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-700 flex-shrink-0">
                                    <img src="https://ui-avatars.com/api/?name=Mike+Ross&background=random" alt="Commenter" class="w-full h-full object-cover">
                                </div>
                                <div class="flex-1">
                                    <div class="flex items-center justify-between mb-2">
                                        <h4 class="text-white font-bold">Mike Ross</h4>
                                        <span class="text-gray-500 text-xs">1 week ago</span>
                                    </div>
                                    <p class="text-gray-400 text-sm leading-relaxed">
                                        Would love to see a follow-up article on advanced techniques. This was a perfect introduction for beginners though. Keep up the great work!
                                    </p>
                                    <button class="mt-3 text-primary text-xs font-bold hover:underline flex items-center gap-1">
                                        <i class="fas fa-reply"></i> Reply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Comment Form -->
                    <div class="bg-sidebar-bg border border-gray-800 rounded-xl p-8">
                        <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <i class="fas fa-pen text-primary"></i>
                            Leave a Comment
                        </h4>
                        <form onsubmit="event.preventDefault(); alert('Thank you for your comment! This is a demo form.');" class="space-y-4">
                            <div class="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-gray-400 text-sm font-medium mb-2">Name *</label>
                                    <input type="text" placeholder="Your Name" required
                                        class="w-full bg-dark border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:border-primary transition-colors">
                                </div>
                                <div>
                                    <label class="block text-gray-400 text-sm font-medium mb-2">Email *</label>
                                    <input type="email" placeholder="your@email.com" required
                                        class="w-full bg-dark border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:border-primary transition-colors">
                                </div>
                            </div>
                            <div>
                                <label class="block text-gray-400 text-sm font-medium mb-2">Website (Optional)</label>
                                <input type="url" placeholder="https://yourwebsite.com"
                                    class="w-full bg-dark border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:border-primary transition-colors">
                            </div>
                            <div>
                                <label class="block text-gray-400 text-sm font-medium mb-2">Comment *</label>
                                <textarea rows="5" placeholder="Share your thoughts..." required
                                    class="w-full bg-dark border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
                            </div>
                            <div class="flex items-center gap-3">
                                <input type="checkbox" id="save-info" 
                                    class="w-4 h-4 rounded border-gray-700 bg-dark text-primary focus:ring-primary focus:ring-offset-0">
                                <label for="save-info" class="text-gray-400 text-sm cursor-pointer">
                                    Save my name and email for next time
                                </label>
                            </div>
                            <button type="submit"
                                class="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 transition-colors shadow-lg shadow-green-900/20 flex items-center gap-2">
                                <i class="fas fa-paper-plane"></i>
                                Post Comment
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('blog-post-content').innerHTML = content;
    showSection('blog-detail');
    window.location.hash = 'blog-detail';
}

// --- Portfolio Detail Logic ---
function openPortfolioDetail(element) {
    const title = element.getAttribute('data-title');
    const subtitle = element.getAttribute('data-subtitle');
    const client = element.getAttribute('data-client');
    const date = element.getAttribute('data-date');
    const tech = element.getAttribute('data-tech');
    const category = element.getAttribute('data-category');
    const image = element.querySelector('img').src;

    const content = `
        <div class="animate-slide-up">
            <!-- Hero Image -->
            <div class="rounded-2xl overflow-hidden mb-10 h-[300px] md:h-[500px] relative group">
                <img src="${image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="${title}">
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end">
                    <div class="p-8 md:p-12 w-full">
                        <span class="bg-primary/20 text-primary px-4 py-2 rounded-full font-bold uppercase tracking-wider text-xs border border-primary/30 inline-block mb-4">
                            ${subtitle}
                        </span>
                        <h1 class="text-4xl md:text-6xl font-bold text-white leading-tight">
                            ${title}
                        </h1>
                    </div>
                </div>
            </div>
            
            <div class="max-w-5xl mx-auto">
                <!-- Project Info Cards -->
                <div class="grid md:grid-cols-3 gap-6 mb-12">
                    <div class="bg-sidebar-bg border border-gray-800 rounded-xl p-6 text-center hover:border-primary transition-colors">
                        <div class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <i class="fas fa-user-tie text-primary text-xl"></i>
                        </div>
                        <h4 class="text-white font-bold mb-1">Client</h4>
                        <p class="text-gray-400 text-sm">${client}</p>
                    </div>
                    <div class="bg-sidebar-bg border border-gray-800 rounded-xl p-6 text-center hover:border-primary transition-colors">
                        <div class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <i class="fas fa-calendar-alt text-primary text-xl"></i>
                        </div>
                        <h4 class="text-white font-bold mb-1">Completion Date</h4>
                        <p class="text-gray-400 text-sm">${date}</p>
                    </div>
                    <div class="bg-sidebar-bg border border-gray-800 rounded-xl p-6 text-center hover:border-primary transition-colors">
                        <div class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <i class="fas fa-layer-group text-primary text-xl"></i>
                        </div>
                        <h4 class="text-white font-bold mb-1">Category</h4>
                        <p class="text-gray-400 text-sm capitalize">${category}</p>
                    </div>
                </div>

                <!-- Project Description -->
                <div class="mb-12">
                    <h2 class="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                        <i class="fas fa-info-circle text-primary"></i>
                        Project Overview
                    </h2>
                    <div class="bg-sidebar-bg border border-gray-800 rounded-xl p-8 space-y-4">
                        <p class="text-gray-400 leading-relaxed text-lg">
                            This project represents a comprehensive solution designed to meet the client's unique requirements. 
                            Through careful planning and execution, we delivered a product that exceeded expectations and provided 
                            tangible value to the end users.
                        </p>
                        <p class="text-gray-400 leading-relaxed">
                            The development process involved close collaboration with stakeholders, iterative design refinements, 
                            and rigorous testing to ensure quality and performance. Every aspect was carefully crafted to align 
                            with modern best practices and industry standards.
                        </p>
                    </div>
                </div>

                <!-- Technologies Used -->
                <div class="mb-12">
                    <h2 class="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                        <i class="fas fa-code text-primary"></i>
                        Technologies Used
                    </h2>
                    <div class="flex flex-wrap gap-3">
                        ${tech.split(',').map(t => `
                            <span class="bg-sidebar-bg border border-gray-800 px-5 py-3 rounded-lg text-gray-300 font-medium hover:border-primary hover:text-primary transition-all cursor-default flex items-center gap-2">
                                <i class="fas fa-check-circle text-primary text-sm"></i>
                                ${t.trim()}
                            </span>
                        `).join('')}
                    </div>
                </div>

                <!-- Key Features -->
                <div class="mb-12">
                    <h2 class="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                        <i class="fas fa-star text-primary"></i>
                        Key Features
                    </h2>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="bg-sidebar-bg border border-gray-800 rounded-xl p-6 hover:border-primary transition-colors">
                            <div class="flex gap-4">
                                <div class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-bolt text-primary text-xl"></i>
                                </div>
                                <div>
                                    <h4 class="text-white font-bold mb-2">High Performance</h4>
                                    <p class="text-gray-400 text-sm leading-relaxed">
                                        Optimized for speed and efficiency with sub-second load times and smooth interactions.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-sidebar-bg border border-gray-800 rounded-xl p-6 hover:border-primary transition-colors">
                            <div class="flex gap-4">
                                <div class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-mobile-alt text-primary text-xl"></i>
                                </div>
                                <div>
                                    <h4 class="text-white font-bold mb-2">Responsive Design</h4>
                                    <p class="text-gray-400 text-sm leading-relaxed">
                                        Fully responsive interface that works seamlessly across all devices and screen sizes.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-sidebar-bg border border-gray-800 rounded-xl p-6 hover:border-primary transition-colors">
                            <div class="flex gap-4">
                                <div class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-shield-alt text-primary text-xl"></i>
                                </div>
                                <div>
                                    <h4 class="text-white font-bold mb-2">Secure & Reliable</h4>
                                    <p class="text-gray-400 text-sm leading-relaxed">
                                        Built with security best practices and tested for reliability under various conditions.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-sidebar-bg border border-gray-800 rounded-xl p-6 hover:border-primary transition-colors">
                            <div class="flex gap-4">
                                <div class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-palette text-primary text-xl"></i>
                                </div>
                                <div>
                                    <h4 class="text-white font-bold mb-2">Modern UI/UX</h4>
                                    <p class="text-gray-400 text-sm leading-relaxed">
                                        Clean, intuitive interface designed with user experience as the top priority.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Challenges & Solutions -->
                <div class="mb-12">
                    <h2 class="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                        <i class="fas fa-lightbulb text-primary"></i>
                        Challenges & Solutions
                    </h2>
                    <div class="space-y-6">
                        <div class="bg-sidebar-bg border border-gray-800 rounded-xl p-8">
                            <h4 class="text-white font-bold text-xl mb-3 flex items-center gap-2">
                                <span class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">1</span>
                                Scalability Requirements
                            </h4>
                            <p class="text-gray-400 leading-relaxed mb-3">
                                <strong class="text-gray-300">Challenge:</strong> The system needed to handle exponential growth in user base and data volume.
                            </p>
                            <p class="text-gray-400 leading-relaxed">
                                <strong class="text-primary">Solution:</strong> Implemented a microservices architecture with horizontal scaling capabilities and efficient caching strategies.
                            </p>
                        </div>
                        <div class="bg-sidebar-bg border border-gray-800 rounded-xl p-8">
                            <h4 class="text-white font-bold text-xl mb-3 flex items-center gap-2">
                                <span class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">2</span>
                                Complex User Requirements
                            </h4>
                            <p class="text-gray-400 leading-relaxed mb-3">
                                <strong class="text-gray-300">Challenge:</strong> Balancing advanced features with simplicity and ease of use.
                            </p>
                            <p class="text-gray-400 leading-relaxed">
                                <strong class="text-primary">Solution:</strong> Conducted extensive user research and implemented progressive disclosure patterns to maintain a clean interface.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Results & Impact -->
                <div class="mb-12">
                    <h2 class="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                        <i class="fas fa-chart-line text-primary"></i>
                        Results & Impact
                    </h2>
                    <div class="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-xl p-8">
                        <div class="grid md:grid-cols-3 gap-8 text-center">
                            <div>
                                <div class="text-4xl font-bold text-primary mb-2">85%</div>
                                <p class="text-gray-300 font-medium">User Satisfaction</p>
                            </div>
                            <div>
                                <div class="text-4xl font-bold text-primary mb-2">3x</div>
                                <p class="text-gray-300 font-medium">Performance Increase</p>
                            </div>
                            <div>
                                <div class="text-4xl font-bold text-primary mb-2">50%</div>
                                <p class="text-gray-300 font-medium">Cost Reduction</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Project Images Gallery -->
                <div class="mb-12">
                    <h2 class="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                        <i class="fas fa-images text-primary"></i>
                        Project Gallery
                    </h2>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="rounded-xl overflow-hidden border border-gray-800 group hover:border-primary transition-colors">
                            <img src="${image}" alt="Gallery Image 1" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
                        </div>
                        <div class="rounded-xl overflow-hidden border border-gray-800 group hover:border-primary transition-colors">
                            <img src="${image}" alt="Gallery Image 2" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
                        </div>
                    </div>
                </div>

                <!-- Call to Action -->
                <div class="bg-sidebar-bg border border-gray-800 rounded-xl p-8 text-center">
                    <h3 class="text-2xl font-bold text-white mb-4">Interested in working together?</h3>
                    <p class="text-gray-400 mb-6 max-w-2xl mx-auto">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                    </p>
                    <button onclick="showSection('contact')" 
                        class="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 transition-colors shadow-lg shadow-green-900/20 inline-flex items-center gap-2">
                        <i class="fas fa-envelope"></i>
                        Get in Touch
                    </button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('portfolio-project-content').innerHTML = content;
    showSection('portfolio-detail');
    window.location.hash = 'portfolio-detail';
}

// --- Testimonial Slider ---
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('#testimonial-container > div');
const dots = document.querySelectorAll('.test-dot');

function changeTestimonial(index) {
    testimonials.forEach(t => t.classList.add('hidden'));
    dots.forEach(d => {
        d.classList.remove('bg-primary');
        d.classList.add('bg-gray-600');
    });

    testimonials[index].classList.remove('hidden');
    testimonials[index].animate([
        { opacity: 0, transform: 'translateX(20px)' },
        { opacity: 1, transform: 'translateX(0)' }
    ], { duration: 400 });

    dots[index].classList.remove('bg-gray-600');
    dots[index].classList.add('bg-primary');
    currentTestimonial = index;
}

// --- Customization Settings ---
function toggleSettings() {
    document.getElementById('settings-panel').classList.toggle('closed');
}

function toggleTheme(theme) {
    const btnDark = document.getElementById('btn-theme-dark');
    const btnLight = document.getElementById('btn-theme-light');

    if (theme === 'light') {
        document.body.classList.add('light');
        btnLight.classList.add('text-white', 'bg-primary');
        btnLight.classList.remove('bg-gray-700');
        btnDark.classList.remove('text-white', 'bg-primary');
        btnDark.classList.add('bg-gray-700');
    } else {
        document.body.classList.remove('light');
        btnDark.classList.add('text-white', 'bg-primary');
        btnDark.classList.remove('bg-gray-700');
        btnLight.classList.remove('text-white', 'bg-primary');
        btnLight.classList.add('bg-gray-700');
    }
}

// --- Background Slideshow Logic ---
let bgInterval;
let currentBg = 0;
const bgImages = document.querySelectorAll('.bg-slider-image');

function toggleBgMode(mode) {
    const btnStatic = document.getElementById('btn-bg-static');
    const btnSlider = document.getElementById('btn-bg-slider');

    if (mode === 'static') {
        clearInterval(bgInterval);
        bgImages.forEach(img => img.classList.remove('active'));
        bgImages[0].classList.add('active'); // Default static
        btnStatic.classList.add('text-white', 'bg-primary');
        btnStatic.classList.remove('bg-gray-700');
        btnSlider.classList.remove('text-white', 'bg-primary');
        btnSlider.classList.add('bg-gray-700');
    } else {
        btnSlider.classList.add('text-white', 'bg-primary');
        btnSlider.classList.remove('bg-gray-700');
        btnStatic.classList.remove('text-white', 'bg-primary');
        btnStatic.classList.add('bg-gray-700');
        startBgSlider();
    }
}

function startBgSlider() {
    if (bgInterval) clearInterval(bgInterval);

    // Cycle immediately once to start
    cycleBg();

    bgInterval = setInterval(cycleBg, 5000);
}

function cycleBg() {
    bgImages[currentBg].classList.remove('active');
    currentBg = (currentBg + 1) % bgImages.length;
    bgImages[currentBg].classList.add('active');
}

// --- Mobile Menu Toggle ---
document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) sidebar.classList.toggle('-translate-x-full');
        });
    }

    // Initialize
    showSection('home');
    // Init testimonials
    changeTestimonial(0);
    // Default BG mode
    toggleBgMode('slider');
});
