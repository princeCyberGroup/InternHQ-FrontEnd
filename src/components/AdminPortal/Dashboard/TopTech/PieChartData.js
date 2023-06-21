const pieChartData = [
  {
    user_id: 26,
    firstName: "Kishan",
    lastName: "Sah",
    examDate: "2023-08-06",
    level: "Beginner",
    techName: "React",
    techImage:
      "https://firebasestorage.googleapis.com/v0/b/internhq-10274.appspot.com/o/technology_logo%2Freact.svg?alt=media&token=20bcae35-fd8a-4914-89a5-a7487b91349d&_gl=1*163fxk*_ga*MTM2MjQ3NDg1OS4xNjg1NjEyMjk3*_ga_CW55HF8NVT*MTY4NTcwMDI0OC42LjEuMTY4NTcwMjExMC4wLjAuMA..",
  },
  {
    user_id: 30,
    firstName: "Pankaj",
    lastName: "Kumar",
    examDate: "2023-06-10",
    level: "Beginner",
    techName: "Python",
    techImage:
      "https://firebasestorage.googleapis.com/v0/b/internhq-10274.appspot.com/o/technology_logo%2Fangular-icon.svg?alt=media&token=abb56223-89de-4359-b9c8-222e2c685e73&_gl=1*1by9cjq*_ga*MTM2MjQ3NDg1OS4xNjg1NjEyMjk3*_ga_CW55HF8NVT*MTY4NTcwMDI0OC42LjEuMTY4NTcwMTIzOC4wLjAuMA..",
  },
  {
    user_id: 30,
    firstName: "Pankaj",
    lastName: "Kumar",
    examDate: "2023-06-10",
    level: "Beginner",
    techName: "Android",
    techImage:
      "https://firebasestorage.googleapis.com/v0/b/internhq-10274.appspot.com/o/technology_logo%2Fangular-icon.svg?alt=media&token=abb56223-89de-4359-b9c8-222e2c685e73&_gl=1*1by9cjq*_ga*MTM2MjQ3NDg1OS4xNjg1NjEyMjk3*_ga_CW55HF8NVT*MTY4NTcwMDI0OC42LjEuMTY4NTcwMTIzOC4wLjAuMA..",
  },
  {
    user_id: 30,
    firstName: "Pankaj",
    lastName: "Kumar",
    examDate: "2023-06-10",
    level: "Beginner",
    techName: "Angular",
    techImage:
      "https://firebasestorage.googleapis.com/v0/b/internhq-10274.appspot.com/o/technology_logo%2Fangular-icon.svg?alt=media&token=abb56223-89de-4359-b9c8-222e2c685e73&_gl=1*1by9cjq*_ga*MTM2MjQ3NDg1OS4xNjg1NjEyMjk3*_ga_CW55HF8NVT*MTY4NTcwMDI0OC42LjEuMTY4NTcwMTIzOC4wLjAuMA..",
  },
  {
    user_id: 30,
    firstName: "Pankaj",
    lastName: "Kumar",
    examDate: "2023-06-10",
    level: "Beginner",
    techName: "JavaScript",
    techImage:
      "https://firebasestorage.googleapis.com/v0/b/internhq-10274.appspot.com/o/technology_logo%2Fangular-icon.svg?alt=media&token=abb56223-89de-4359-b9c8-222e2c685e73&_gl=1*1by9cjq*_ga*MTM2MjQ3NDg1OS4xNjg1NjEyMjk3*_ga_CW55HF8NVT*MTY4NTcwMDI0OC42LjEuMTY4NTcwMTIzOC4wLjAuMA..",
  },
  {
    user_id: 26,
    firstName: "Kishan",
    lastName: "Sah",
    examDate: "2023-08-06",
    level: "Beginner",
    techName: "React",
    techImage:
      "https://firebasestorage.googleapis.com/v0/b/internhq-10274.appspot.com/o/technology_logo%2Freact.svg?alt=media&token=20bcae35-fd8a-4914-89a5-a7487b91349d&_gl=1*163fxk*_ga*MTM2MjQ3NDg1OS4xNjg1NjEyMjk3*_ga_CW55HF8NVT*MTY4NTcwMDI0OC42LjEuMTY4NTcwMjExMC4wLjAuMA..",
  },
  {
    user_id: 35,
    firstName: "Karan",
    lastName: "Sharma",
    examDate: "2023-08-06",
    level: "Advance",
    techName: "React",
    techImage:
      "https://firebasestorage.googleapis.com/v0/b/internhq-10274.appspot.com/o/technology_logo%2Freact.svg?alt=media&token=20bcae35-fd8a-4914-89a5-a7487b91349d&_gl=1*163fxk*_ga*MTM2MjQ3NDg1OS4xNjg1NjEyMjk3*_ga_CW55HF8NVT*MTY4NTcwMDI0OC42LjEuMTY4NTcwMjExMC4wLjAuMA..",
  },
  {
    user_id: 26,
    firstName: "Kishan",
    lastName: "Sah",
    examDate: "2023-08-06",
    level: "Beginner",
    techName: "React",
    techImage:
      "https://firebasestorage.googleapis.com/v0/b/internhq-10274.appspot.com/o/technology_logo%2Freact.svg?alt=media&token=20bcae35-fd8a-4914-89a5-a7487b91349d&_gl=1*163fxk*_ga*MTM2MjQ3NDg1OS4xNjg1NjEyMjk3*_ga_CW55HF8NVT*MTY4NTcwMDI0OC42LjEuMTY4NTcwMjExMC4wLjAuMA..",
  },
  {
    user_id: 35,
    firstName: "Karan",
    lastName: "Sharma",
    examDate: "2023-08-06",
    level: "Advance",
    techName: "React",
    techImage:
      "https://firebasestorage.googleapis.com/v0/b/internhq-10274.appspot.com/o/technology_logo%2Freact.svg?alt=media&token=20bcae35-fd8a-4914-89a5-a7487b91349d&_gl=1*163fxk*_ga*MTM2MjQ3NDg1OS4xNjg1NjEyMjk3*_ga_CW55HF8NVT*MTY4NTcwMDI0OC42LjEuMTY4NTcwMjExMC4wLjAuMA..",
  },
  {
    user_id: 26,
    firstName: "Kishan",
    lastName: "Sah",
    examDate: "2023-08-06",
    level: "Beginner",
    techName: "React",
    techImage:
      "https://firebasestorage.googleapis.com/v0/b/internhq-10274.appspot.com/o/technology_logo%2Freact.svg?alt=media&token=20bcae35-fd8a-4914-89a5-a7487b91349d&_gl=1*163fxk*_ga*MTM2MjQ3NDg1OS4xNjg1NjEyMjk3*_ga_CW55HF8NVT*MTY4NTcwMDI0OC42LjEuMTY4NTcwMjExMC4wLjAuMA..",
  },
  {
    user_id: 35,
    firstName: "Karan",
    lastName: "Sharma",
    examDate: "2023-08-06",
    level: "Advance",
    techName: "React",
    techImage:
      "https://firebasestorage.googleapis.com/v0/b/internhq-10274.appspot.com/o/technology_logo%2Freact.svg?alt=media&token=20bcae35-fd8a-4914-89a5-a7487b91349d&_gl=1*163fxk*_ga*MTM2MjQ3NDg1OS4xNjg1NjEyMjk3*_ga_CW55HF8NVT*MTY4NTcwMDI0OC42LjEuMTY4NTcwMjExMC4wLjAuMA..",
  },
  {
    user_id: 50,
    firstName: "Samridhi",
    lastName: "Gupta",
    examDate: "2023-06-09",
    level: "Beginner",
    techName: "Angular",
    techImage:
      "https://firebasestorage.googleapis.com/v0/b/internhq-10274.appspot.com/o/technology_logo%2Fangular-icon.svg?alt=media&token=abb56223-89de-4359-b9c8-222e2c685e73&_gl=1*1by9cjq*_ga*MTM2MjQ3NDg1OS4xNjg1NjEyMjk3*_ga_CW55HF8NVT*MTY4NTcwMDI0OC42LjEuMTY4NTcwMTIzOC4wLjAuMA..",
  },
];

export default pieChartData;