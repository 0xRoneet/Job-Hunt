import React from 'react';
import AWSImg from '../img/aws_img.png'
//import FreeImg from '../img/free_img.png'
import IBMImg from '../img/ibm_img.png'
import GoogleImg from '../img/google_img.png'
import MicrosoftImg from '../img/ms_img.png'
import '../index.css'




const posts = [
  {
    id: 1,

    company: 'DSA (C++)',
    location: 'Earn a learning Badge',
    jobTitle: 'Cloud Essential Learning Plan',
    employmentType: 'Duration: 6 Months',
    description: 'Learn AWS Cloud technology,foundational AWS Cloud concepts, AWS services, security,architecture, pricing, and support.',
    salary: 'FREE',
    image: AWSImg

  },

  {
    id: 2,
    company: 'DSA (JAVA)',
    location: 'Earn Level 2 badge',
    jobTitle: 'Big Data 01',
    employmentType: 'Duration: 6 Months',
    description: 'Learn what is Big Data and Intro to tools like Apache Hadoop',
    salary: 'FREE',
    image: IBMImg
  },

  {
    id: 3,
    company: 'DSA(PYTHON)',
    location: 'via classcentral.com',
    jobTitle: 'Artificial Intelligence on Microsoft Azure',
    employmentType: 'Duration: 6 Months',
    description: 'Learn key AI concepts of machine learning, anomaly detection, computer vision, natural language processing, and conversational AI.',
    salary: 'FREE',
    image: MicrosoftImg
  },
  {
    id: 1,

    company: 'Amazon Web Services',
    location: 'Earn a learning Badge',
    jobTitle: 'Cloud Essential Learning Plan',
    employmentType: 'Duration: 13hrs 35m',
    description: 'Learn AWS Cloud technology,foundational AWS Cloud concepts, AWS services, security,architecture, pricing, and support.',
    salary: 'FREE',
    image: AWSImg

  },

  {
    id: 2,
    company: 'International Business Machines-IBM',
    location: 'Earn Level 2 badge',
    jobTitle: 'Big Data 01',
    employmentType: 'Duration: 3hrs',
    description: 'Learn what is Big Data and Intro to tools like Apache Hadoop',
    salary: 'FREE',
    image: IBMImg
  },

  {
    id: 3,
    company: 'Microsoft',
    location: 'via classcentral.com',
    jobTitle: 'Artificial Intelligence on Microsoft Azure',
    employmentType: 'Duration: 1 week',
    description: 'Learn key AI concepts of machine learning, anomaly detection, computer vision, natural language processing, and conversational AI.',
    salary: 'FREE',
    image: MicrosoftImg
  },
  {
    id: 1,

    company: 'Amazon Web Services',
    location: 'Earn a learning Badge',
    jobTitle: 'Cloud Essential Learning Plan',
    employmentType: 'Duration: 13hrs 35m',
    description: 'Learn AWS Cloud technology,foundational AWS Cloud concepts, AWS services, security,architecture, pricing, and support.',
    salary: 'FREE',
    image: AWSImg

  },

  {
    id: 2,
    company: 'International Business Machines-IBM',
    location: 'Earn Level 2 badge',
    jobTitle: 'Big Data 01',
    employmentType: 'Duration: 3hrs',
    description: 'Learn what is Big Data and Intro to tools like Apache Hadoop',
    salary: 'FREE',
    image: IBMImg
  },

  {
    id: 3,
    company: 'Microsoft',
    location: 'via classcentral.com',
    jobTitle: 'Artificial Intelligence on Microsoft Azure',
    employmentType: 'Duration: 1 week',
    description: 'Learn key AI concepts of machine learning, anomaly detection, computer vision, natural language processing, and conversational AI.',
    salary: 'FREE',
    image: MicrosoftImg
  },
  {
    id: 1,

    company: 'Amazon Web Services',
    location: 'Earn a learning Badge',
    jobTitle: 'Cloud Essential Learning Plan',
    employmentType: 'Duration: 13hrs 35m',
    description: 'Learn AWS Cloud technology,foundational AWS Cloud concepts, AWS services, security,architecture, pricing, and support.',
    salary: 'FREE',
    image: AWSImg

  },

  {
    id: 2,
    company: 'International Business Machines-IBM',
    location: 'Earn Level 2 badge',
    jobTitle: 'Big Data 01',
    employmentType: 'Duration: 3hrs',
    description: 'Learn what is Big Data and Intro to tools like Apache Hadoop',
    salary: 'FREE',
    image: IBMImg
  },

  {
    id: 3,
    company: 'Microsoft',
    location: 'via classcentral.com',
    jobTitle: 'Artificial Intelligence on Microsoft Azure',
    employmentType: 'Duration: 1 week',
    description: 'Learn key AI concepts of machine learning, anomaly detection, computer vision, natural language processing, and conversational AI.',
    salary: 'FREE',
    image: MicrosoftImg
  }

];

const HomeCards = () => {
  const isMediumScreen = window.innerWidth >= 768; 


  const handleEnrollClick = (post) => {
    let link = ' ';
    if (post.id === 1){
      link = 'https://aws.amazon.com/training/learn-about/cloud-practitioner/?th=tile&tile=learnabout'
    } else if( post.id === 2){
      link = ('https://cognitiveclass.ai/courses/what-is-big-data');
    } else if( post.id === 3){
      link = ('https://www.classcentral.com/course/artificial-intelligence-microsoft-azure-43806');
    } else if(post.id === 4){
      link = ('https://www.classcentral.com/course/network-security-database-vulnerabilitie-13873');
    }else if(post.id === 5){
      link = ('https://www.classcentral.com/course/preparing-cloud-professional-data-engine-12822');
    }else if(post.id === 6){
      link = ('https://www.classcentral.com/course/introduction-to-computers-and-operating-systems-a-200521');
    }else{
      console.log("Post not found");
    }

    window.open(link, "_blank");
  }

 

  const visiblePosts = isMediumScreen ? posts.slice(0, 8) : posts.slice(0, 3);


 

  
  return (
    <div className="w-full bg-[EDF1F6]">
      <div className="p-9 h-full">
      <p className="text-[1.8rem] font-semibold text-center" style={{marginBottom: '1.5rem'}}>
  <span className="text-lightPrimary">Freelance Ready </span>Resources
</p>

          
        
        
        <div className="h-full w-full grid md:grid-cols-3 gap-9 my-6 md:px-16">
          {visiblePosts.map(post => (

            <div key={post.id} className="md:w-300 p-8 min-w-260 bg-lightCard backdrop-blur-md rounded-3xl flex flex-col justify-center drop-shadow-lg gap-4 hover:scale-105 transition-all duration-300">
              {/*<img src="frontend/src/img/free_img.png" alt="corner-image" className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 object-cover"/>*/}

              <div className="flex">
                <img src={post.image} alt="logo" className="w-9 h-9 md:w-12 md:h-12 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110" />
                <div className="mx-3">
                  <p className="md:text-[1rem] text-[0.8rem] font-medium hover:text-lightPrimary hover:underline">{post.company}</p>
                  <p className="md:text-[0.7rem] text-[0.6rem] text-lighttextGray">{post.location}</p>
                </div>
              </div>
              <div>
                <p className="font-semibold">{post.jobTitle}</p>
                <p className="text-[0.7rem] text-lighttextGray">{post.employmentType}</p>
              </div>
              <p className="text-[0.7rem] text-justify font-medium">{post.description}</p>
              <div className="flex justify-between pb-4 gap-3">
                <p className="text-[0.7rem] text-lighttextGray">
                  <span className="text-xl font-bold text-lightModeTextColor">{post.salary}</span>
                </p>

                <div className="md:text-[0.9rem] text-[0.7rem] rounded-lg bg-lightBgBlue py-2 px-5 text-lightPrimary font-medium hover:shadow-lg duration-100 transition-all ease-in-out cursor-pointer" onClick={() => handleEnrollClick(post)}>
                  Enroll Now
                </div>

                
              </div>
            </div>
          ))}
        </div>
        <p className="md:text-[lg] text-sm text-right text-lightPrimary cursor-pointer hover:text-lightModeTextColor">View all</p>
      </div>
    </div>
  );
};

export default HomeCards;
