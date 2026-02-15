<?php
/**
 * Melazhari functions and definitions
 */

function melazhari_setup()
{
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'melazhari'),
    ));
}
add_action('after_setup_theme', 'melazhari_setup');

function melazhari_scripts()
{
    // Tailwind CSS via CDN (Original approach)
    wp_enqueue_script('tailwind-cdn', 'https://cdn.tailwindcss.com', array(), null, false);

    // Google Fonts
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap', array(), null);

    // Font Awesome
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', array(), '6.4.0');

    // Dashicons for Frontend
    wp_enqueue_style('dashicons');

    // Theme Styles
    wp_enqueue_style('melazhari-style', get_stylesheet_uri(), array(), '1.0');

    // Theme Scripts
    wp_enqueue_script('melazhari-app', get_template_directory_uri() . '/app.js', array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'melazhari_scripts');

/**
 * Helper to get or create a hidden settings post for ACF Free
 */
function melazhari_get_settings_post_id()
{
    $settings_post = get_page_by_path('theme-settings-data', OBJECT, 'post');

    if (!$settings_post) {
        $post_id = wp_insert_post(array(
            'post_title' => 'Theme Settings Data',
            'post_name' => 'theme-settings-data',
            'post_status' => 'publish',
            'post_type' => 'post',
        ));
    } else {
        $post_id = $settings_post->ID;
    }

    return $post_id;
}

/**
 * Handle ACF Form Head for saving
 */
function melazhari_theme_settings_head()
{
    $screen = get_current_screen();
    if ($screen->id === 'toplevel_page_theme-settings') {
        acf_form_head();
    }
}
add_action('admin_head', 'melazhari_theme_settings_head');

/**
 * Register Theme Settings Menu Page
 */
function melazhari_add_theme_settings_menu()
{
    add_menu_page(
        'Theme Settings',
        'Theme Settings',
        'manage_options',
        'theme-settings',
        'melazhari_theme_settings_render',
        'dashicons-admin-generic',
        60
    );
}
add_action('admin_menu', 'melazhari_add_theme_settings_menu');

/**
 * Render Theme Settings Page with ACF Fields
 */
function melazhari_theme_settings_render()
{
    $post_id = melazhari_get_settings_post_id();
    ?>
    <div class="wrap">
        <h1>Theme Settings</h1>
        <div class="card" style="max-width: 100%; margin-top: 20px; padding: 20px;">
            <?php
            acf_form(array(
                'post_id' => $post_id,
                'post_title' => false,
                'post_content' => false,
                'submit_value' => 'Save Settings',
                'updated_message' => 'Settings updated successfully.',
            ));
            ?>
        </div>
    </div>
    <style type="text/css">
        .acf-field-list-table {
            margin-top: 0;
        }

        .acf-form-submit {
            margin-top: 20px;
        }
    </style>
    <?php
}

