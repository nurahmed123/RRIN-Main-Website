import React from 'react';

const TestimonialCard = ({ testimonial, name, title, image }) => (
    <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-xl flex flex-col items-center text-center space-y-4 transition-transform duration-200 hover:scale-105">
        <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover" />
        <blockquote className="text-lg tracking-tight text-slate-900 dark:text-gray-300">
            {testimonial}
        </blockquote>
        <figcaption className="mt-4">
            <div className="font-semibold text-slate-900 dark:text-gray-100">{name}</div>
            <div className="text-sm text-slate-500 dark:text-gray-400">{title}</div>
        </figcaption>
    </div>
);

const Advisor = () => {
    const testimonials = [
        {
            testimonial: "Empowering the community through science and innovation is not just a passion; it’s a commitment to building a brighter future for all.",
            name: "SALMAN PROMON",
            title: "Founder, Mechamind | Lecturer, Independent University, Bangladesh",
            image: "https://res.cloudinary.com/dnvmjyiml/image/upload/v1730203477/salman.jpg"
        },
    ];
    const mentor = [
        {
            testimonial: "Empowering the community through science and innovation is not just a passion; it’s a commitment to building a brighter future for all.",
            name: "SALMAN PROMON",
            title: "Founder, Mechamind | Lecturer, Independent University, Bangladesh",
            image: "https://res.cloudinary.com/dnvmjyiml/image/upload/v1730203477/salman.jpg"
        },
    ];

    return (
        <section id="testimonials" aria-label="What our customers are saying" className="py-20 sm:py-32">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">Our Mentors</h2>
                </div>
                <div data-aos="fade-up" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center mx-auto">
                    {mentor.map((mentor, index) => (
                        <TestimonialCard key={index} {...mentor} />
                    ))}
                </div>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">Our Advisors</h2>
                </div>
                <div data-aos="fade-up" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Advisor;
