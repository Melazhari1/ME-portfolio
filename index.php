<?php get_header(); ?>
<?php $settingPostId = 33; ?>
<!-- HOME SECTION -->
<section id="home" class="section-content">
    <div class="max-w-2xl animate-slide-up flex flex-col items-center py-12">
        <span class="text-primary text-sm font-semibold tracking-wider uppercase mb-2 block">Introduction</span>
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight text-center">
            Hi, I'm Mohamed elazhari <br>
            <span class="text-gray-400 text-2xl md:text-3xl font-normal">Creative Web Designer</span>
        </h2>
        <p class="text-gray-400 mb-8 leading-relaxed max-w-lg text-center">
            <?php echo get_field('intro', $settingPostId); ?>
        </p>
        <div class="flex flex-wrap justify-center gap-4">
            <button onclick="showSection('portfolio')"
                class="px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-green-600 transition-colors shadow-lg shadow-green-900/20">
                My Portfolio
            </button>
            <button onclick="showSection('blog')"
                class="px-8 py-3 border border-gray-600 text-white font-semibold rounded-full hover:border-primary hover:text-primary transition-colors">
                Read Blog
            </button>
        </div>
    </div>
</section>

<!-- ABOUT SECTION -->
<section id="about" class="section-content">
    <div class="section-header mb-10 border-b border-gray-800 pb-4 relative">
        <h2 class="text-3xl font-bold text-white">About Me</h2>
        <div class="absolute bottom-[-1px] left-0 w-16 h-0.5 bg-primary"></div>
    </div>

    <div class="grid md:grid-cols-2 gap-10 mb-12">
        <div>
            <p class="text-gray-400 mb-4 leading-relaxed">
                <?= get_field('presentation', $settingPostId); ?>
            </p>

        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-4 bg-sidebar-bg rounded-lg border border-gray-800">
                <span class="text-gray-500 text-xs uppercase block mb-1">Age</span>
                <span
                    class="text-white font-medium"><?= date_diff(date_create(get_field('birthday', $settingPostId)), date_create('today'))->y; ?></span>
            </div>
            <div class="p-4 bg-sidebar-bg rounded-lg border border-gray-800">
                <span class="text-gray-500 text-xs uppercase block mb-1">Residence</span>
                <span class="text-white font-medium"><?= get_field('adresse', $settingPostId); ?></span>
            </div>
            <div class="p-4 bg-sidebar-bg rounded-lg border border-gray-800">
                <span class="text-gray-500 text-xs uppercase block mb-1">Freelance</span>


                <span
                    class="<?= get_field('freelance', $settingPostId) ? 'text-primary' : 'text-yellow'; ?> font-medium">
                    <?= get_field('freelance', $settingPostId) ? 'Available' : 'Unavailable'; ?>
                </span>

            </div>
            <div class="p-4 bg-sidebar-bg rounded-lg border border-gray-800">
                <span class="text-gray-500 text-xs uppercase block mb-1">Address</span>
                <span class="text-white font-medium">
                    <?= get_field('adresse', $settingPostId); ?>
                </span>
            </div>
        </div>
    </div>

    <h3 class="text-xl font-bold text-white mb-6">My Services</h3>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <!-- Services -->

        <?php
        $services = get_posts([
            'post_type' => 'service',
            'post_status' => 'publish',
            'numberposts' => -1,
            'orderby' => 'menu_order',
            'order' => 'ASC'
        ]);

        foreach ($services as $post):
            setup_postdata($post); ?>
            <div class="bg-sidebar-bg p-6 rounded-xl border border-gray-800 hover:border-primary transition-colors group">
                <div
                    class="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-primary text-xl mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <i class="dashicons <?= get_field('icon', $post->ID); ?>"></i>
                </div>
                <h4 class="text-white font-semibold mb-2"><?= get_the_title($post->ID); ?></h4>
                <p class="text-sm text-gray-500"><?= get_the_excerpt($post->ID); ?></p>
            </div>
        <?php endforeach;
        wp_reset_postdata(); ?>
    </div>

    <!-- TESTIMONIALS/QUOTES -->
    <h3 class="text-xl font-bold text-white mb-6">Quotes</h3>
    <div class="relative bg-sidebar-bg p-8 rounded-xl border border-gray-800 overflow-hidden">
        <?php
        $quotes = get_posts([
            'post_type' => 'quote',
            'post_status' => 'publish',
            'numberposts' => -1,
            'orderby' => 'rand'
        ]);
        ?>
        <div id="testimonial-container" class="transition-transform duration-500 flex w-full">
            <?php foreach ($quotes as $index => $quote): ?>
                <?php
                $who = get_field('who', $quote->ID);
                $category = get_field('category', $quote->ID);
                $text = get_field('quote', $quote->ID);
                ?>
                <div class="w-full flex-shrink-0 text-center px-4 <?= $index > 0 ? 'hidden' : ''; ?>">
                    <div class="w-16 h-16 mx-auto rounded-full bg-gray-700 overflow-hidden mb-4">
                        <?php if (has_post_thumbnail($quote->ID)): ?>
                            <?= get_the_post_thumbnail($quote->ID, 'thumbnail', ['class' => 'w-full h-full object-cover']); ?>
                        <?php else: ?>
                            <img src="https://ui-avatars.com/api/?name=<?= urlencode($who); ?>&background=007acc&color=fff&size=128"
                                alt="Quote" class="w-full h-full object-cover">
                        <?php endif; ?>
                    </div>
                    <p class="text-gray-300 italic mb-4">"<?= $text ?>"</p>
                    <h4 class="text-white font-bold"><?= $who ?></h4>
                    <span class="text-primary text-xs uppercase tracking-wide"><?= $category ?></span>
                </div>
            <?php endforeach; ?>
        </div>
        <div class="flex justify-center gap-2 mt-6">
            <?php foreach ($quotes as $index => $quote): ?>
                <button onclick="changeTestimonial(<?= $index; ?>)"
                    class="w-3 h-3 rounded-full <?= $index === 0 ? 'bg-primary' : 'bg-gray-600 hover:bg-gray-500'; ?> test-dot"></button>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- RESUME SECTION -->
<section id="resume" class="section-content">
    <div class="section-header mb-10 border-b border-gray-800 pb-4 relative">
        <h2 class="text-3xl font-bold text-white">Resume</h2>
        <div class="absolute bottom-[-1px] left-0 w-16 h-0.5 bg-primary"></div>
    </div>

    <div class="grid lg:grid-cols-2 gap-12">
        <div>
            <?php
            $experiences = get_posts([
                'post_type' => 'experience',
                'post_status' => 'publish',
                'numberposts' => -1,
                'orderby' => 'menu_order',
                'order' => 'ASC'
            ]);
            ?>
            <div class="mb-8">
                <h3 class="flex items-center gap-3 text-xl font-bold text-white mb-6">
                    <i class="fas fa-briefcase text-primary"></i> Experience
                </h3>
                <div class="relative pl-6">
                    <div class="timeline-line"></div>
                    <?php foreach ($experiences as $post):
                        setup_postdata($post); ?>

                        <?php if (get_field('type', $post->ID) == 'experience'): ?>
                            <div class="timeline-item relative mb-8 pb-4 border-b border-gray-800 last:border-0">
                                <span
                                    class="text-xs text-primary border border-gray-700 px-2 py-1 rounded inline-block mb-2"><?= date('M Y', strtotime(get_field('start_date', $post->ID))); ?>
                                    -
                                    <?= get_field('end_date', $post->ID) ? date('M Y', strtotime(get_field('end_date', $post->ID))) : 'Present'; ?></span>

                                <h4 class="text-white font-semibold text-lg"><?= get_the_title($post->ID); ?></h4>
                                <p class="text-gray-500 text-sm mb-2"><?= get_field('place', $post->ID); ?></p>
                                <p class="text-gray-400 text-sm"><?= get_field('description', $post->ID); ?></p>
                            </div>
                        <?php endif; endforeach; ?>
                </div>
            </div>
            <div>
                <h3 class="flex items-center gap-3 text-xl font-bold text-white mb-6">
                    <i class="fas fa-graduation-cap text-primary"></i> Education
                </h3>
                <div class="relative pl-6">
                    <div class="timeline-line"></div>
                    <?php foreach ($experiences as $post):
                        setup_postdata($post); ?>
                        <?php if (get_field('type', $post->ID) == 'education'): ?>
                            <div class="timeline-item relative mb-8 pb-4 border-b border-gray-800 last:border-0">
                                <span
                                    class="text-xs text-primary border border-gray-700 px-2 py-1 rounded inline-block mb-2"><?= date('M Y', strtotime(get_field('start_date', $post->ID))); ?>
                                    -
                                    <?= get_field('end_date', $post->ID) ? date('M Y', strtotime(get_field('end_date', $post->ID))) : 'Present'; ?></span>
                                <h4 class="text-white font-semibold text-lg"><?= get_the_title($post->ID); ?></h4>
                                <p class="text-gray-500 text-sm mb-2"><?= get_field('place', $post->ID); ?></p>
                                <p class="text-gray-400 text-sm"><?= get_field('description', $post->ID); ?></p>
                            </div>
                        <?php endif; endforeach; ?>
                </div>
            </div>
        </div>
        <div>
            <h3 class="text-xl font-bold text-white mb-6">Coding Skills</h3>
            <div class="space-y-6 bg-sidebar-bg p-8 rounded-xl border border-gray-800">
                <?php
                $skills = get_posts([
                    'post_type' => 'coding-skill',
                    'post_status' => 'publish',
                    'numberposts' => -1,
                    'orderby' => 'menu_order',
                    'order' => 'ASC'
                ]);

                foreach ($skills as $post):
                    setup_postdata($post);
                    $level = get_field('level', $post->ID);
                    ?>
                    <div>
                        <div class="flex justify-between mb-2">
                            <span class="text-white font-medium"><?= get_the_title($post->ID); ?></span>
                            <span class="text-gray-400 text-sm"><?= $level; ?>%</span>
                        </div>
                        <div class="skill-track h-2 bg-gray-800 rounded-full">
                            <div class="skill-bar w-0" data-width="<?= $level; ?>%"></div>
                        </div>
                    </div>
                <?php endforeach;
                wp_reset_postdata(); ?>

            </div>
            <h3 class="text-xl font-bold text-white mb-6 mt-8">Knowledges</h3>
            <div class="flex flex-wrap gap-3">
                <?php
                $knowledges = get_posts([
                    'post_type' => 'knowledge',
                    'post_status' => 'publish',
                    'numberposts' => -1,
                    'orderby' => 'menu_order',
                    'order' => 'ASC'
                ]);

                foreach ($knowledges as $post):
                    setup_postdata($post);
                    ?>
                    <span class="bg-sidebar-bg border border-gray-800 px-3 py-1 rounded text-sm text-gray-400">
                        <?= get_the_title($post->ID); ?>
                    </span>
                <?php endforeach;
                wp_reset_postdata(); ?>
            </div>
        </div>
    </div>
</section>

<!-- PORTFOLIO SECTION -->
<section id="portfolio" class="section-content">
    <div class="section-header mb-10 border-b border-gray-800 pb-4 relative">
        <h2 class="text-3xl font-bold text-white">Portfolio</h2>
        <div class="absolute bottom-[-1px] left-0 w-16 h-0.5 bg-primary"></div>
    </div>
    <div class="flex flex-wrap gap-4 mb-8">
        <button onclick="filterPortfolio('all')"
            class="text-sm font-medium text-white hover:text-primary transition-colors active-filter"
            data-filter="all">All</button>
        <?php
        $terms = get_terms(['taxonomy' => 'project-type', 'hide_empty' => true]);
        foreach ($terms as $term): ?>
            <button onclick="filterPortfolio('<?= $term->slug; ?>')"
                class="text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                data-filter="<?= $term->slug; ?>"><?= $term->name; ?></button>
        <?php endforeach; ?>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <?php
        $projects = get_posts([
            'post_type' => 'project',
            'post_status' => 'publish',
            'numberposts' => -1,
            'orderby' => 'menu_order',
            'order' => 'ASC'
        ]);

        foreach ($projects as $post):
            setup_postdata($post);
            $terms = get_the_terms($post->ID, 'project-type');
            $cat_slugs = $terms ? implode(' ', wp_list_pluck($terms, 'slug')) : '';
            $cat_names = $terms ? implode(', ', wp_list_pluck($terms, 'name')) : '';
            ?>
            <div class="portfolio-item group relative rounded-lg overflow-hidden cursor-pointer"
                data-category="<?= $cat_slugs; ?>" onclick="openPortfolioDetail(this)" data-title="<?= get_the_title(); ?>"
                data-subtitle="<?= $cat_names; ?>" data-client="<?= get_field('client'); ?>"
                data-date="<?= get_field('date'); ?>" data-tech="<?= get_field('technologies'); ?>">

                <?php if (has_post_thumbnail()): ?>
                    <?= get_the_post_thumbnail($post->ID, 'large', ['class' => 'w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110']); ?>
                <?php endif; ?>

                <div
                    class="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                    <h4 class="text-white font-bold text-lg"><?= get_the_title(); ?></h4>
                    <span class="text-white/80 text-sm mt-1"><?= $cat_names; ?></span>
                </div>
            </div>
        <?php endforeach;
        wp_reset_postdata(); ?>
    </div>

</section>

<!-- BLOG SECTION -->
<section id="blog" class="section-content">
    <div class="section-header mb-10 border-b border-gray-800 pb-4 relative">
        <h2 class="text-3xl font-bold text-white">Latest Blog</h2>
        <div class="absolute bottom-[-1px] left-0 w-16 h-0.5 bg-primary"></div>
    </div>
    <div id="blog-grid" class="grid md:grid-cols-2 gap-8 mb-12">
        <?php
        $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

        $args = [
            'post_type' => 'post',
            'posts_per_page' => 10,
            'paged' => $paged,
        ];

        $query = new WP_Query($args);

        if ($query->have_posts()):
            while ($query->have_posts()):
                $query->the_post();
                if (get_the_ID() == 33)
                    continue;
                ?>
                <article
                    class="blog-item bg-sidebar-bg rounded-xl overflow-hidden border border-gray-800 group hover:border-primary transition-all flex flex-col"
                    data-blog-cat="dev">
                    <div class="h-56 overflow-hidden relative">
                        <img src="<?php echo get_the_post_thumbnail_url(get_the_ID(), 'medium'); ?>" alt="<?php the_title(); ?>"
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform">

                        <div
                            class="absolute bottom-4 left-4 bg-sidebar-bg/90 backdrop-blur-sm border border-gray-700 rounded-lg p-2 text-center min-w-[50px]">
                            <span class="block text-primary font-bold text-lg">
                                <?php echo get_the_date('d'); ?>
                            </span>
                            <span class="block text-gray-400 text-[10px] uppercase font-bold">
                                <?php echo get_the_date('M'); ?>
                            </span>
                        </div>
                    </div>

                    <div class="p-8 text-center flex-1 flex flex-col">
                        <span class="text-primary text-xs font-bold uppercase tracking-widest mb-3 block">
                            <?php the_category(', '); ?>
                        </span>

                        <h3 class="text-white font-bold text-xl mb-4 group-hover:text-primary transition-colors">
                            <?php the_title(); ?>
                        </h3>

                        <p class="text-gray-400 text-sm mb-6 line-clamp-3">
                            <?php echo wp_trim_words(get_the_excerpt(), 20); ?>
                        </p>

                        <div class="mt-auto">
                            <button onclick="openBlogPost(this)"
                                class="inline-flex items-center gap-2 text-primary text-sm font-bold border-b border-primary/30 pb-1 hover:border-primary transition-all cursor-pointer bg-transparent border-0 border-b">
                                Read More <i class="fas fa-arrow-right text-xs"></i>
                            </button>
                        </div>
                    </div>
                </article>
                <?php
            endwhile;
        endif;
        wp_reset_postdata();
        ?>

    </div>
</section>

<!-- BLOG & PORTFOLIO DETAILS (Placeholders for JS injection) -->
<section id="blog-detail" class="section-content">
    <div class="mb-8">
        <button onclick="showSection('blog')" class="text-primary flex items-center gap-2 font-semibold">
            <i class="fas fa-arrow-left"></i> Back to Blog
        </button>
    </div>
    <div id="blog-post-content"></div>
</section>
<section id="portfolio-detail" class="section-content">
    <div class="mb-8">
        <button onclick="showSection('portfolio')" class="text-primary flex items-center gap-2 font-semibold">
            <i class="fas fa-arrow-left"></i> Back to Portfolio
        </button>
    </div>
    <div id="portfolio-project-content"></div>
</section>

<!-- CONTACT SECTION -->
<section id="contact" class="section-content">
    <div class="section-header mb-10 border-b border-gray-800 pb-4 relative">
        <h2 class="text-3xl font-bold text-white">Contact Me</h2>
        <div class="absolute bottom-[-1px] left-0 w-16 h-0.5 bg-primary"></div>
    </div>
    <div class="grid lg:grid-cols-2 gap-10">
        <div>
            <h3 class="text-xl font-bold text-white mb-6">Get in Touch</h3>
            <div class="space-y-6">
                <div class="flex items-center gap-4 bg-sidebar-bg p-4 rounded-lg border border-gray-800">
                    <div class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-primary">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <div>
                        <h4 class="text-white font-medium">Email</h4>
                        <p class="text-gray-400 text-sm">melazhari@mail.com</p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <h3 class="text-xl font-bold text-white mb-6">Send Message</h3>
            <?php echo do_shortcode('[contact-form-7 id="14" title="Contact form"]'); ?>
        </div>
    </div>
</section>

<?php get_footer(); ?>