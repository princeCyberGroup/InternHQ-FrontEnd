const tableArr = [
  {
    id: 1,
    date: "26-4-2023",
    learningType: "CG Learning Video",
    topics: "C",
    comment:
      "Eiusmod aute ipsum laborum ad nostrud occaecat veniam velit quis adipisicing enim irure Lorem. Magna velit dolore id eu quis est consectetur magna proident sunt fugiat veniam non. Non exercitation minim nostrud exercitation pariatur minim ullamco ea proident.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 2,
    date: "12-4-2023",
    learningType: "Self Learning",
    topics: "CPP",
    comment:
      "Dolore velit eiusmod adipisicing mollit voluptate duis exercitation. Cupidatat magna eu aliqua aute qui officia. Cillum elit consectetur aliqua sit laborum ea magna voluptate consectetur labore velit enim anim.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 3,
    date: "3-3-2023",
    learningType: "Self Learning",
    topics: "C",
    comment:
      "Ut veniam ipsum consectetur mollit eu nostrud pariatur eiusmod non aliqua irure esse dolor irure. Quis et magna enim id laboris excepteur ea aute labore dolor in ex officia. Eu occaecat Lorem excepteur amet do. Commodo sit nulla proident laborum. Excepteur Lorem eu anim amet tempor aute Lorem officia occaecat amet esse excepteur exercitation nostrud. Pariatur enim aliquip sint proident ipsum deserunt irure voluptate sit. Officia ad ullamco consequat nostrud adipisicing anim id sint ea officia adipisicing.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 4,
    date: "24-8-2023",
    learningType: "Self Learning",
    topics: "Angular",
    comment:
      "Voluptate aliqua enim pariatur nostrud laboris fugiat. Eiusmod ut occaecat consectetur minim consequat laboris occaecat aliqua eu commodo. Sunt anim nisi sit aute officia aute sunt in velit nostrud laborum irure sunt tempor. Non proident cillum tempor enim ea consequat. Ut non nulla est ut eiusmod. Voluptate nisi irure ad id quis minim consectetur incididunt cupidatat.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 5,
    date: "12-6-2023",
    learningType: "Mentor Assigned Task",
    topics: "C",
    comment:
      "Duis enim ut ut fugiat et amet ex culpa. Magna consequat elit laborum ipsum exercitation amet ea eu veniam. Fugiat tempor cillum incididunt do deserunt duis aute non fugiat est veniam esse velit.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 6,
    date: "18-9-2023",
    learningType: "Mentor Assigned Task",
    topics: "C",
    comment:
      "Ullamco ex nisi est dolore aliquip. Laboris incididunt excepteur enim occaecat. Proident et excepteur magna excepteur veniam et. Ea exercitation cupidatat Lorem sunt id enim quis pariatur excepteur cupidatat deserunt. Officia proident eiusmod aliquip nulla quis quis veniam officia id nostrud minim pariatur reprehenderit. Enim fugiat et esse nisi eu officia tempor amet nisi sint mollit cillum et.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 7,
    date: "24-9-2023",
    learningType: "Project",
    topics: "PHP",
    comment:
      "Lorem aliquip amet velit qui qui tempor in veniam consequat. Reprehenderit laborum culpa ea commodo ex et aliqua eu. Nostrud minim ad officia labore culpa. Sint quis amet non tempor ut. Commodo id veniam voluptate fugiat laboris reprehenderit fugiat anim officia. Veniam laboris pariatur id qui laborum duis ex do in. In eiusmod do aliquip eiusmod fugiat ea nostrud sint fugiat tempor.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 8,
    date: "26-4-2023",
    learningType: "CG Learning Video",
    topics: "C",
    comment:
      "Eiusmod aute ipsum laborum ad nostrud occaecat veniam velit quis adipisicing enim irure Lorem. Magna velit dolore id eu quis est consectetur magna proident sunt fugiat veniam non. Non exercitation minim nostrud exercitation pariatur minim ullamco ea proident.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 9,
    date: "12-4-2023",
    learningType: "Self Learning",
    topics: "CPP",
    comment:
      "Dolore velit eiusmod adipisicing mollit voluptate duis exercitation. Cupidatat magna eu aliqua aute qui officia. Cillum elit consectetur aliqua sit laborum ea magna voluptate consectetur labore velit enim anim.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 10,
    date: "3-3-2023",
    learningType: "Self Learning",
    topics: "C",
    comment:
      "Ut veniam ipsum consectetur mollit eu nostrud pariatur eiusmod non aliqua irure esse dolor irure. Quis et magna enim id laboris excepteur ea aute labore dolor in ex officia. Eu occaecat Lorem excepteur amet do. Commodo sit nulla proident laborum. Excepteur Lorem eu anim amet tempor aute Lorem officia occaecat amet esse excepteur exercitation nostrud. Pariatur enim aliquip sint proident ipsum deserunt irure voluptate sit. Officia ad ullamco consequat nostrud adipisicing anim id sint ea officia adipisicing.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 11,
    date: "24-8-2023",
    learningType: "Self Learning",
    topics: "Angular",
    comment:
      "Voluptate aliqua enim pariatur nostrud laboris fugiat. Eiusmod ut occaecat consectetur minim consequat laboris occaecat aliqua eu commodo. Sunt anim nisi sit aute officia aute sunt in velit nostrud laborum irure sunt tempor. Non proident cillum tempor enim ea consequat. Ut non nulla est ut eiusmod. Voluptate nisi irure ad id quis minim consectetur incididunt cupidatat.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 12,
    date: "12-6-2023",
    learningType: "Mentor Assigned Task",
    topics: "C",
    comment:
      "Duis enim ut ut fugiat et amet ex culpa. Magna consequat elit laborum ipsum exercitation amet ea eu veniam. Fugiat tempor cillum incididunt do deserunt duis aute non fugiat est veniam esse velit.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 13,
    date: "18-9-2023",
    learningType: "Mentor Assigned Task",
    topics: "C",
    comment:
      "Ullamco ex nisi est dolore aliquip. Laboris incididunt excepteur enim occaecat. Proident et excepteur magna excepteur veniam et. Ea exercitation cupidatat Lorem sunt id enim quis pariatur excepteur cupidatat deserunt. Officia proident eiusmod aliquip nulla quis quis veniam officia id nostrud minim pariatur reprehenderit. Enim fugiat et esse nisi eu officia tempor amet nisi sint mollit cillum et.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 14,
    date: "24-9-2023",
    learningType: "Project",
    topics: "PHP",
    comment:
      "Lorem aliquip amet velit qui qui tempor in veniam consequat. Reprehenderit laborum culpa ea commodo ex et aliqua eu. Nostrud minim ad officia labore culpa. Sint quis amet non tempor ut. Commodo id veniam voluptate fugiat laboris reprehenderit fugiat anim officia. Veniam laboris pariatur id qui laborum duis ex do in. In eiusmod do aliquip eiusmod fugiat ea nostrud sint fugiat tempor.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 15,
    date: "26-4-2023",
    learningType: "CG Learning Video",
    topics: "C",
    comment:
      "Eiusmod aute ipsum laborum ad nostrud occaecat veniam velit quis adipisicing enim irure Lorem. Magna velit dolore id eu quis est consectetur magna proident sunt fugiat veniam non. Non exercitation minim nostrud exercitation pariatur minim ullamco ea proident.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 16,
    date: "12-4-2023",
    learningType: "Self Learning",
    topics: "CPP",
    comment:
      "Dolore velit eiusmod adipisicing mollit voluptate duis exercitation. Cupidatat magna eu aliqua aute qui officia. Cillum elit consectetur aliqua sit laborum ea magna voluptate consectetur labore velit enim anim.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 17,
    date: "3-3-2023",
    learningType: "Self Learning",
    topics: "C",
    comment:
      "Ut veniam ipsum consectetur mollit eu nostrud pariatur eiusmod non aliqua irure esse dolor irure. Quis et magna enim id laboris excepteur ea aute labore dolor in ex officia. Eu occaecat Lorem excepteur amet do. Commodo sit nulla proident laborum. Excepteur Lorem eu anim amet tempor aute Lorem officia occaecat amet esse excepteur exercitation nostrud. Pariatur enim aliquip sint proident ipsum deserunt irure voluptate sit. Officia ad ullamco consequat nostrud adipisicing anim id sint ea officia adipisicing.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 18,
    date: "24-8-2023",
    learningType: "Self Learning",
    topics: "Angular",
    comment:
      "Voluptate aliqua enim pariatur nostrud laboris fugiat. Eiusmod ut occaecat consectetur minim consequat laboris occaecat aliqua eu commodo. Sunt anim nisi sit aute officia aute sunt in velit nostrud laborum irure sunt tempor. Non proident cillum tempor enim ea consequat. Ut non nulla est ut eiusmod. Voluptate nisi irure ad id quis minim consectetur incididunt cupidatat.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 19,
    date: "12-6-2023",
    learningType: "Mentor Assigned Task",
    topics: "C",
    comment:
      "Duis enim ut ut fugiat et amet ex culpa. Magna consequat elit laborum ipsum exercitation amet ea eu veniam. Fugiat tempor cillum incididunt do deserunt duis aute non fugiat est veniam esse velit.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 20,
    date: "18-9-2023",
    learningType: "Mentor Assigned Task",
    topics: "C",
    comment:
      "Ullamco ex nisi est dolore aliquip. Laboris incididunt excepteur enim occaecat. Proident et excepteur magna excepteur veniam et. Ea exercitation cupidatat Lorem sunt id enim quis pariatur excepteur cupidatat deserunt. Officia proident eiusmod aliquip nulla quis quis veniam officia id nostrud minim pariatur reprehenderit. Enim fugiat et esse nisi eu officia tempor amet nisi sint mollit cillum et.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 21,
    date: "24-9-2023",
    learningType: "Project",
    topics: "PHP",
    comment:
      "Lorem aliquip amet velit qui qui tempor in veniam consequat. Reprehenderit laborum culpa ea commodo ex et aliqua eu. Nostrud minim ad officia labore culpa. Sint quis amet non tempor ut. Commodo id veniam voluptate fugiat laboris reprehenderit fugiat anim officia. Veniam laboris pariatur id qui laborum duis ex do in. In eiusmod do aliquip eiusmod fugiat ea nostrud sint fugiat tempor.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 22,
    date: "24-9-2023",
    learningType: "Project",
    topics: "PHP",
    comment:
      "Lorem aliquip amet velit qui qui tempor in veniam consequat. Reprehenderit laborum culpa ea commodo ex et aliqua eu. Nostrud minim ad officia labore culpa. Sint quis amet non tempor ut. Commodo id veniam voluptate fugiat laboris reprehenderit fugiat anim officia. Veniam laboris pariatur id qui laborum duis ex do in. In eiusmod do aliquip eiusmod fugiat ea nostrud sint fugiat tempor.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 23,
    date: "26-4-2023",
    learningType: "CG Learning Video",
    topics: "C",
    comment:
      "Eiusmod aute ipsum laborum ad nostrud occaecat veniam velit quis adipisicing enim irure Lorem. Magna velit dolore id eu quis est consectetur magna proident sunt fugiat veniam non. Non exercitation minim nostrud exercitation pariatur minim ullamco ea proident.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 24,
    date: "12-4-2023",
    learningType: "Self Learning",
    topics: "CPP",
    comment:
      "Dolore velit eiusmod adipisicing mollit voluptate duis exercitation. Cupidatat magna eu aliqua aute qui officia. Cillum elit consectetur aliqua sit laborum ea magna voluptate consectetur labore velit enim anim.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 25,
    date: "3-3-2023",
    learningType: "Self Learning",
    topics: "C",
    comment:
      "Ut veniam ipsum consectetur mollit eu nostrud pariatur eiusmod non aliqua irure esse dolor irure. Quis et magna enim id laboris excepteur ea aute labore dolor in ex officia. Eu occaecat Lorem excepteur amet do. Commodo sit nulla proident laborum. Excepteur Lorem eu anim amet tempor aute Lorem officia occaecat amet esse excepteur exercitation nostrud. Pariatur enim aliquip sint proident ipsum deserunt irure voluptate sit. Officia ad ullamco consequat nostrud adipisicing anim id sint ea officia adipisicing.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 26,
    date: "24-8-2023",
    learningType: "Self Learning",
    topics: "Angular",
    comment:
      "Voluptate aliqua enim pariatur nostrud laboris fugiat. Eiusmod ut occaecat consectetur minim consequat laboris occaecat aliqua eu commodo. Sunt anim nisi sit aute officia aute sunt in velit nostrud laborum irure sunt tempor. Non proident cillum tempor enim ea consequat. Ut non nulla est ut eiusmod. Voluptate nisi irure ad id quis minim consectetur incididunt cupidatat.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 27,
    date: "12-6-2023",
    learningType: "Mentor Assigned Task",
    topics: "C",
    comment:
      "Duis enim ut ut fugiat et amet ex culpa. Magna consequat elit laborum ipsum exercitation amet ea eu veniam. Fugiat tempor cillum incididunt do deserunt duis aute non fugiat est veniam esse velit.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 28,
    date: "18-9-2023",
    learningType: "Mentor Assigned Task",
    topics: "C",
    comment:
      "Ullamco ex nisi est dolore aliquip. Laboris incididunt excepteur enim occaecat. Proident et excepteur magna excepteur veniam et. Ea exercitation cupidatat Lorem sunt id enim quis pariatur excepteur cupidatat deserunt. Officia proident eiusmod aliquip nulla quis quis veniam officia id nostrud minim pariatur reprehenderit. Enim fugiat et esse nisi eu officia tempor amet nisi sint mollit cillum et.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 29,
    date: "24-9-2023",
    learningType: "Project",
    topics: "PHP",
    comment:
      "Lorem aliquip amet velit qui qui tempor in veniam consequat. Reprehenderit laborum culpa ea commodo ex et aliqua eu. Nostrud minim ad officia labore culpa. Sint quis amet non tempor ut. Commodo id veniam voluptate fugiat laboris reprehenderit fugiat anim officia. Veniam laboris pariatur id qui laborum duis ex do in. In eiusmod do aliquip eiusmod fugiat ea nostrud sint fugiat tempor.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 30,
    date: "24-9-2023",
    learningType: "Project",
    topics: "PHP",
    comment:
      "Lorem aliquip amet velit qui qui tempor in veniam consequat. Reprehenderit laborum culpa ea commodo ex et aliqua eu. Nostrud minim ad officia labore culpa. Sint quis amet non tempor ut. Commodo id veniam voluptate fugiat laboris reprehenderit fugiat anim officia. Veniam laboris pariatur id qui laborum duis ex do in. In eiusmod do aliquip eiusmod fugiat ea nostrud sint fugiat tempor.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },
  {
    id: 31,
    date: "24-9-2023",
    learningType: "Project",
    topics: "PHP",
    comment:
      "Lorem aliquip amet velit qui qui tempor in veniam consequat. Reprehenderit laborum culpa ea commodo ex et aliqua eu. Nostrud minim ad officia labore culpa. Sint quis amet non tempor ut. Commodo id veniam voluptate fugiat laboris reprehenderit fugiat anim officia. Veniam laboris pariatur id qui laborum duis ex do in. In eiusmod do aliquip eiusmod fugiat ea nostrud sint fugiat tempor.\r\n",
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },  
  {
    id: 32,
    date: "24-9-2023",
    learningType: "Project",
    topics: "PHP",
    comment:
      "Lorem aliquip amet velit qui qui" ,
    duration: "11:45 AM - 1:15 PM\n1hrs 30 min",
  },  
];

export default tableArr;
