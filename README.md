# Personal Introduction Page

A beautiful, modern, and responsive personal introduction page built with HTML, CSS, and JavaScript.

## Features

- ✨ **Modern Design**: Clean and professional layout with gradient backgrounds
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Interactive Elements**: Hover effects, animations, and smooth transitions
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📝 **Typing Effect**: Animated text for the name
- 🎯 **Smooth Scrolling**: Enhanced navigation experience
- 📧 **Email Copy**: Click to copy email functionality
- ⬆️ **Scroll to Top**: Convenient navigation button

## Sections Included

1. **Header**: Profile photo, name, title, location, and social links
2. **About Me**: Personal introduction and background
3. **Skills & Expertise**: Categorized skills with visual tags
4. **Experience**: Timeline of work experience
5. **Featured Projects**: Showcase of your best work
6. **Contact**: Call-to-action buttons for getting in touch

## How to Customize

### 1. Personal Information

Edit the `index.html` file to update your personal details:

```html
<!-- Update your name -->
<h1 class="name">Your Name</h1>

<!-- Update your title/role -->
<p class="title">Your Title / Role</p>

<!-- Update your location -->
<p class="location"><i class="fas fa-map-marker-alt"></i> Your Location</p>
```

### 2. Profile Photo

Replace the placeholder image URL with your actual photo:

```html
<img src="path/to/your/photo.jpg" alt="Your Photo" id="profile-photo">
```

### 3. Social Links

Update the social media links in the header section:

```html
<div class="social-links">
    <a href="https://github.com/yourusername" class="social-link"><i class="fab fa-github"></i></a>
    <a href="https://linkedin.com/in/yourusername" class="social-link"><i class="fab fa-linkedin"></i></a>
    <a href="https://twitter.com/yourusername" class="social-link"><i class="fab fa-twitter"></i></a>
    <a href="mailto:your.email@example.com" class="social-link"><i class="fas fa-envelope"></i></a>
</div>
```

### 4. About Section

Customize the about me content:

```html
<div class="about-content">
    <p>Your personal introduction goes here...</p>
    <p>Add more paragraphs as needed...</p>
</div>
```

### 5. Skills

Update the skills section with your actual skills:

```html
<div class="skill-category">
    <h3>Programming Languages</h3>
    <div class="skill-tags">
        <span class="skill-tag">JavaScript</span>
        <span class="skill-tag">Python</span>
        <!-- Add more skills -->
    </div>
</div>
```

### 6. Experience

Update the timeline with your work experience:

```html
<div class="timeline-item">
    <div class="timeline-date">2023 - Present</div>
    <div class="timeline-content">
        <h3>Your Job Title</h3>
        <p class="company">Company Name</p>
        <p>Description of your role and achievements...</p>
    </div>
</div>
```

### 7. Projects

Replace the placeholder projects with your actual work:

```html
<div class="project-card">
    <div class="project-image">
        <img src="path/to/project-image.jpg" alt="Project Name">
    </div>
    <div class="project-content">
        <h3>Your Project Name</h3>
        <p>Description of your project...</p>
        <div class="project-links">
            <a href="https://github.com/yourusername/project" class="project-link"><i class="fab fa-github"></i> Code</a>
            <a href="https://your-project-demo.com" class="project-link"><i class="fas fa-external-link-alt"></i> Live</a>
        </div>
    </div>
</div>
```

### 8. Contact Information

Update the contact section with your actual email:

```html
<a href="mailto:your.actual.email@example.com" class="contact-btn primary">
    <i class="fas fa-envelope"></i> Send Email
</a>
```

## Color Customization

You can customize the color scheme by editing the CSS variables in `styles.css`:

```css
/* Primary colors */
--primary-color: #6366f1;
--secondary-color: #8b5cf6;
--accent-color: #10b981;

/* Background gradients */
--bg-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## Deployment

### GitHub Pages

1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select the branch you want to deploy (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify

1. Drag and drop your project folder to [Netlify](https://netlify.com)
2. Your site will be deployed instantly
3. You can set up a custom domain if needed

### Vercel

1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. Deploy with one click
3. Get automatic deployments on every push

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Features

- Optimized images and assets
- Minimal JavaScript for fast loading
- CSS animations for smooth interactions
- Responsive design for all devices

## Contributing

Feel free to fork this project and customize it for your needs. If you have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy coding! 🚀** 