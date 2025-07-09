function generateId(title: string, author: string) {
  return `${title}-${author}`
    .toLowerCase()
    .replace(/\s+/g, '-')         // Replace spaces with hyphens
    .replace(/[^a-z0-9\-]/g, ''); // Remove special characters
}
console.log(generateId('Adobe XD', 'William Smith'));
// Should output: "adobe-xd-william-smith"


const featuredCourses = [
{ 
  id: generateId("Adobe XD", "William Smith"),
  title: "Adobe XD",
  shortDescription: "Advanced Adobe Photoshop For Everyone",
  shortNote: "The most impressive is collection of share me online college courses",
  reviews: 3,
  lessons: 18,
  format: "Online Class",
  author: "Rajib Raj",
  authorImg: "/images/Authors/WilliamSmith.jpg", // update if needed
  thumbnail: "/images/courses/FundAdobe.jpg",
  discount: "30% Off",
  courseImg:"/images/courses/courseDetail.jpg",

  courseOverview: `
In this course, we take you from the fundamentals and concepts of data modeling all the way through a number of best practices and techniques that you’ll need to build data models in your organization. 

You’ll find many examples that clearly explain the key concepts covered in the course and highlight proven design patterns.

By the end of the course, you’ll be fully equipped not only to apply these principles but also to make critical data modeling and design decisions that transcend technical details and support real-world business needs.
  `,

  whatYouWillLearn: [
    "Begin working on real-world data modeling projects",
    "Expand responsibilities as part of an existing role",
    "Create Flyers, Brochures, and Advertisements",
    "Find a new position involving data modeling",
    "Work with color, gradients, and grids"
  ],

  courseSummary: `In this course take you from the fundamentals and concepts of data modeling all the way through anumber of best practices and techniques that you’ll need to build data models in your organization. You’ll find many examples that clearly the key covered the course

By the end of the course, you’ll be all set to not only put these principles to works but also to make the key data modeling and design decisions required by the info data modeling that transcend the nuts-and-bolts that clearly the key covered the course and design patterns.`,
courseDetails: [
      { label: "Course Level", value: "Beginner" },
      { label: "Course Duration", value: "10 weeks" },
      { label: "Online Class", value: "08" },
      { label: "Lessons", value: "18x" },
      { label: "Quizzes", value: "0" },
      { label: "Pass Percentage", value: "80%" },
      { label: "Certificate", value: "Yes" },
      { label: "Language", value: "English" }
    ],

courseCategories: [
      { label: "Personal Development", value: "30" },
      { label: "Photography", value: "20" },
      { label: "Teaching and Academics", value: "93" },
      { label: "Art and Design", value: "32" },
      { label: "Business", value: "26" },
      { label: "Data Science", value: "27" },
      { label: "Development", value: "28" },
      { label: "Finance", value: "36" },
      { label: "Health and Fitness", value: "39" },
      { label: "Lifestyle", value: "37" },
      { label: "Marketing", value: "18" },
      { label: "Music", value: "20" },
    ],
courseContent: [
  {
    sectionTitle: "1. Introduction",
    totalLessons: 5,
    totalDuration: "17:37",
    lessons: [
      {
        title: "1.1 Welcome to the course",
        duration: "02:30",
        videoUrl: "/videos/Trial.mp4" 
      },
      {
        title: "1.2 How to set up your Photoshop workspace",
        duration: "08:33",
        videoUrl: "/videos/Trial.mp4" 
      },
      {
        title: "1.3 Essential Photoshop Tools",
        duration: "03:38",
        videoUrl: "/videos/Trial.mp4"
      },
      {
        title: "1.4 Finding inspiration",
        duration: "02:30",
        videoUrl: "/videos/Trial.mp4"
      },
      {
        title: "1.5 Choosing Your Format",
        duration: "03:48",
        videoUrl: "/videos/Trial.mp4"
      }
    ]
  },
  {
    sectionTitle: "2. How to Create Mixed Media Art in Adobe Photoshop",
    totalLessons: 5,
    totalDuration: "52:15",
    lessons: [
      {
        title: "2.1 Using Adjustment Layers",
        duration: "06:20",
        videoUrl: "/videos/Trial.mp4"
      },
      {
        title: "2.2 Building the composition",
        duration: "07:33",
        videoUrl: "/videos/Trial.mp4"
      },
      {
        title: "2.3 Photoshop Lighting effects",
        duration: "06:30",
        videoUrl: "/videos/Trial.mp4"
      },
      {
        title: "2.4 Digital Painting using Photoshop brushes",
        duration: "08:34",
        videoUrl: "/videos/Trial.mp4"
      },
      {
        title: "2.5 Finalizing the details",
        duration: "10:30",
        videoUrl: "/videos/Trial.mp4"
      }
    ]
  }
]


},
//   {
//     id: generateId('Photoshop', 'Lora Smith'),
//     title: 'Photoshop',
//     reviews: 3,
//     description: 'Certified Graphic Design with Free Project Course',
//     lessons: 18,
//     format: 'Online Class',
//     author: 'Lora Smith',
//     authorImg: '/images/Authors/LoraSmith.jpg',
//     thumbnail: '/images/courses/CertifiedGraphic.jpg',
//   },

// {
//      id: generateId('Photoshop', 'Robot Smith'),
//         title: 'Photoshop',
//         reviews: 3,
//         description: 'Theory Learn New Student And Fundamentals',
//         lessons: 18,
//         format: 'Online Class',
//         author:'Robot Smith',
//         authorImg: '/images/Authors/RobotSmith.jpg',
//         thumbnail: '/images/courses/Photoshop.jpg',


// },
// {
//        id: generateId('Adobe XD', 'Zinat Zaara'),
//         title: 'Adobe XD',
//         reviews: 3,
//         description: 'Computer Fundamentals Basic Startup Ultricies Vitae',
//         lessons: 18,
//         format: 'Online Class',
//         author: 'Zinat Zaara',
//         authorImg: '/images/Authors/ZinatZaara.jpg',
//         thumbnail: '/images/courses/CompFund.jpg',
//     },
//     {
//         id: generateId('Adobe XD', 'Billy Rivera'),
//         title: 'Adobe XD',
//         reviews: 3,
//         description: 'Computer Fundamentals Basic Startup Ultricies VitaeBoozy Halloween Drinks for the Grown Eleifend Kuismod',
//         lessons: 18,
//         format: 'Online Class',
//         author: 'Billy Rivera',
//         authorImg: '/images/Authors/BillyRivera.jpg',
//         thumbnail: '/images/courses/BoozyHalloween.jpg',
//     },
//     {
//         id: generateId('Adobe XD', 'Subrina Kabir'),
//         title: 'Adobe XD',
//         reviews: 3,
//         description: 'Student Want to Learn About Science And Arts',
//         lessons: 18,
//         format: 'Online Class',
//         author: 'Subrina Kabir',
//         authorImg: '/images/Authors/SubrinaKabir.jpg',
//         thumbnail: '/images/courses/ScienceArt.jpg',
//     },

];
export { featuredCourses };