import Head from "next/head";
import { IoHome } from "react-icons/io5";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import Loading from "@/components/Loading";



export default function Home() {



  // login first
  const { data: session, status } = useSession();

  const router = useRouter();
  // Check if there's no active session and redirect to login page
  useEffect(() => {
    // Check if there's no active session and redirect to login page
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);

  if (status === "loading") {
    // Loading state, loader or any other indicator
    return <div className='flex flex-col flex-center wh_100'>
      <Loading />
      <h1 className='mt-1'>Loading...</h1>
    </div>
  }

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  // use this on top for render error
  const [blogsData, setBlogsData] = useState([]);

  // Define options within the component scope
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Blogs Created Monthly by Year',
      },
    },
  };


  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        setBlogsData(data); // Assuming data is an array of blog objects
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Aggregate data by year and month
  const monthlyData = blogsData.filter(dat => dat.status === "publish").reduce((acc, blog) => {
    const year = new Date(blog.createdAt).getFullYear(); // Get the year
    const month = new Date(blog.createdAt).getMonth(); // Get the month (0-indexed)
    acc[year] = acc[year] || Array(12).fill(0); // Initialize array for the year if not exists
    acc[year][month]++; // Increment count for the month
    return acc;
  }, {});

  const currentYear = new Date().getFullYear(); // Get the current year
  const years = Object.keys(monthlyData);
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const datasets = years.map(year => ({
    label: `${year}`,
    data: monthlyData[year] || Array(12).fill(0), // If no data for a month, default to 0
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`,
  }));

  const data = {
    labels,
    datasets,
  };



  // if login then show this data
  if (session) {

    return (
      <>
        <Head>
          <title>Blog Backend</title>
          <meta name="description" content="Blog website backend" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>


        <div className="dashboard">
          {/* title dashboard */}
          <div className="titledashboard flex flex-sb">
            <div data-aos="fade-right">
              <h2>Blogs <span>Dashboard</span></h2>
              <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb" data-aos="fade-left">
              <IoHome /> <span>/</span><span>Dashboard</span>
            </div>
          </div>
          {/* dashboard four cards */}
          <div className="topfourcards flex flex-sb">
            <div className="four_card" data-aos="fade-right">
              <h2>Total Blogs</h2>
              <span>{blogsData.filter(dat => dat.status === "publish").length}</span>
            </div>
            <div className="four_card" data-aos="fade-right">
              <h2>Total Topics</h2>
              <span>4</span>
            </div>
            <div className="four_card" data-aos="fade-left">
              <h2>Total Tags</h2>
              <span>6</span>
            </div>
            <div className="four_card" data-aos="fade-left">
              <h2>Draft Blogs</h2>
              <span>{blogsData.filter(dat => dat.status === "draft").length}</span>
            </div>
          </div>
          {/* year overview */}
          <div className="year_overview flex flex-sb">
            <div className="leftyearoverview">
              <div className="flex flex-sb">
                <h3>Year Overview</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
                <h3 className="text-right">{blogsData.filter(dat => dat.status === "publish").length} / 365 <br /> <span>Total Published</span></h3>
              </div>
              <Bar data={data} options={options} />
            </div>
            <div className="right_salescont">
              <div>
                <h3>Blogs By Category</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
              </div>
              <div className="blogscategory flex flex-center">
                <table data-aos="fade-up">
                  <thead>
                    <tr>
                      <td>Topics</td>
                      <td>Data</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Html, Css & JavaScript</td>
                      <td>{blogsData.filter(dat => dat.blogcategory[0] === "htmlcssjs").length}</td>
                    </tr>
                    <tr>
                      <td>Next Js, React Js</td>
                      <td>{blogsData.filter(dat => dat.blogcategory[0] === "nextjs").length}</td>
                    </tr>
                    <tr>
                      <td>Database</td>
                      <td>{blogsData.filter(dat => dat.blogcategory[0] === "database").length}</td>
                    </tr>
                    <tr>
                      <td>Deployment</td>
                      <td>{blogsData.filter(dat => dat.blogcategory[0] === "deployment").length}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
