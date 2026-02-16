<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>

<body <?php body_class('bg-black text-gray-300 font-sans min-h-screen flex items-center justify-center p-4 md:p-8 overflow-hidden relative'); ?>>

    <!-- Background Slider Container -->
    <div id="bg-slider" class="fixed inset-0 z-0">
        <div class="bg-slider-image active"
            style="background-image: url('https://www.transparenttextures.com/patterns/cubes.png'); opacity: 0.5; background-repeat: repeat; background-size: auto;">
        </div>
        <div class="bg-slider-image"
            style="background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');">
        </div>
        <div class="bg-slider-image"
            style="background-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');">
        </div>
    </div>

    <!-- Mobile Menu Button -->
    <button id="mobile-menu-btn"
        class="md:hidden fixed top-4 right-4 z-50 bg-sidebar-bg p-3 rounded-full text-white shadow-lg border border-gray-800">
        <i class="fas fa-bars"></i>
    </button>

    <!-- Main Container - Now a wrapper for separated elements -->
    <div class="w-full max-w-6xl h-[90vh] md:h-[85vh] flex flex-col md:flex-row relative z-10 gap-6">

        <!-- Sidebar / Header - Now a separate container -->
        <header id="sidebar"
            class="w-full md:w-80 bg-sidebar-bg flex flex-col rounded-2xl shadow-2xl border border-gray-800 transition-transform duration-300 transform -translate-x-full md:translate-x-0 absolute md:relative z-40 h-full">

            <!-- Profile Section -->
            <div class="p-8 flex flex-col items-center text-center border-b border-gray-800">
                <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700 mb-4 shadow-lg">
                    <img src="https://ui-avatars.com/api/?name=Mohamed+elazhari&background=222&color=fff&size=256"
                        alt="Profile" class="w-full h-full object-cover">
                </div>
                <h1 class="text-2xl font-bold text-white mb-1">Mohamed elazhari</h1>
                <p class="text-primary font-medium text-sm tracking-wide">Web Developer</p>

                <div class="flex gap-3 mt-4">
                    <a href="https://www.facebook.com/elazhari.mohamed.552916"
                        class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                        target="_blank"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://www.linkedin.com/in/elazhari-mohamed-9ba272306/"
                        class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                        target="_blank"><i class="fab fa-linkedin-in"></i></a>
                    <a href="https://github.com/melazhari1"
                        class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                        target="_blank"><i class="fab fa-github"></i></a>
                </div>
            </div>

            <!-- Navigation -->
            <nav class="flex-1 overflow-y-auto py-4">
                <ul class="space-y-1">
                    <li>
                        <a href="#home"
                            class="nav-link active w-full text-left px-8 py-3 hover:text-white transition-colors flex items-center gap-3 border-l-2 border-transparent hover:border-primary text-primary"
                            data-target="home">
                            <i class="fas fa-home w-6 text-center"></i> Home
                        </a>
                    </li>
                    <li>
                        <a href="#about"
                            class="nav-link w-full text-left px-8 py-3 hover:text-white transition-colors flex items-center gap-3 border-l-2 border-transparent hover:border-primary"
                            data-target="about">
                            <i class="fas fa-user w-6 text-center"></i> About Me
                        </a>
                    </li>
                    <li>
                        <a href="#resume"
                            class="nav-link w-full text-left px-8 py-3 hover:text-white transition-colors flex items-center gap-3 border-l-2 border-transparent hover:border-primary"
                            data-target="resume">
                            <i class="fas fa-graduation-cap w-6 text-center"></i> Resume
                        </a>
                    </li>
                    <li class="hidden">
                        <a href="#portfolio"
                            class="nav-link w-full text-left px-8 py-3 hover:text-white transition-colors flex items-center gap-3 border-l-2 border-transparent hover:border-primary"
                            data-target="portfolio">
                            <i class="fas fa-briefcase w-6 text-center"></i> Portfolio
                        </a>
                    </li>
                    <li>
                        <a href="#blog"
                            class="nav-link w-full text-left px-8 py-3 hover:text-white transition-colors flex items-center gap-3 border-l-2 border-transparent hover:border-primary"
                            data-target="blog">
                            <i class="fas fa-newspaper w-6 text-center"></i> Blog
                        </a>
                    </li>
                    <li>
                        <a href="#contact"
                            class="nav-link w-full text-left px-8 py-3 hover:text-white transition-colors flex items-center gap-3 border-l-2 border-transparent hover:border-primary"
                            data-target="contact">
                            <i class="fas fa-envelope w-6 text-center"></i> Contact
                        </a>
                    </li>
                </ul>
            </nav>

            <div class="p-8 border-t border-gray-800 text-xs text-gray-500 text-center">
                &copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>.
            </div>
        </header>

        <!-- Main Content Area - Now a separate container -->
        <main class="flex-1 relative overflow-hidden bg-dark rounded-2xl shadow-2xl border border-gray-800">
            <div class="h-full overflow-y-auto relative p-8 md:p-12 scroll-container">