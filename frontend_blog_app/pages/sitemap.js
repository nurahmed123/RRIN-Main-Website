import useFetchData from "@/hooks/useFetchData";

export default async function sitemap() {
    const { alldata, loading } = useFetchData(`/api/getblog`);
    const publishedBlogs = alldata.filter((ab) => ab.status === "publish");

    const blog = getBlog?.map((blog) => {
        return {
            loc: `${process.env.SITE_URL}/blog/${blog.slug}`,
            lastmod: blog.updatedAt,
            changefreq: "daily",
            priority: 0.8
        }
    })

    return [{
        loc: `${process.env.SITE_URL}`,
        lastmod: new Date().toISOString(),
        changefreq: "daily",
        priority: 1.0

    }]
}