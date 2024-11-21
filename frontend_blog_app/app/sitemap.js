export default async function sitemap() {
    const baseUrl = process.env.SITE_URL || 'https://robosuperior.com'

    // Static routes
    const routes = [
        '',
        '/about',
        '/blog',
        '/project',
        '/achievement',
        '/members',
        '/contact',
        '/login',
        '/signup',
        '/forgot-password',
        '/reset-password',
        '/dashboard',
        '/dashboard/blog',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: route === '' ? 1 : 0.8,
    }))

    try {
        // Fetch blogs using the API endpoint
        const blogResponse = await fetch(`${baseUrl}/api/getblog`);
        const blogs = await blogResponse.json();

        // Create blog routes
        const blogRoutes = blogs.map((blog) => ({
            url: `${baseUrl}/blog/${blog.slug}`,
            lastModified: blog.updatedAt || new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.7,
        }));

        // Fetch projects
        const projectResponse = await fetch(`${baseUrl}/api/getproject`);
        const projects = await projectResponse.json();

        // Create project routes
        const projectRoutes = projects.map((project) => ({
            url: `${baseUrl}/project/${project.slug}`,
            lastModified: project.updatedAt || new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.7,
        }));

        // Fetch achievements
        const achievementResponse = await fetch(`${baseUrl}/api/getachievement`);
        const achievements = await achievementResponse.json();

        // Create achievement routes
        const achievementRoutes = achievements.map((achievement) => ({
            url: `${baseUrl}/achievement/${achievement.slug}`,
            lastModified: achievement.updatedAt || new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.7,
        }));

        // Combine all routes
        return [
            ...routes,
            ...blogRoutes,
            ...projectRoutes,
            ...achievementRoutes
        ];

    } catch (error) {
        console.error('Error generating sitemap:', error);
        // Return only static routes if there's an error
        return routes;
    }
} 