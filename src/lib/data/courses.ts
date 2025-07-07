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

  courseContent: [
    "Introduction to Adobe XD and UI Principles",
    "Color Theory and Gradient Usage",
    "Typography and Grid Systems",
    "Designing for Multiple Screens",
    "Real-World Project: Marketing Flyer"
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