// ── Learn.edu Admin Data ──────────────────────────────────────
// Spark Level System (replaces old letter grades)
// No more "F" — every level has an encouraging name
const SPARK_LEVELS = [
  { min:90, max:100, id:'champion',    label:'Champion',    icon:'🏆', color:'#7c3aed', bg:'#f5f3ff' },
  { min:80, max:89,  id:'trailblazer', label:'Trailblazer', icon:'🚀', color:'#E8562A', bg:'#fff3ef' },
  { min:65, max:79,  id:'achiever',    label:'Achiever',    icon:'🎯', color:'#059669', bg:'#ecfdf5' },
  { min:50, max:64,  id:'explorer',    label:'Explorer',    icon:'🔭', color:'#0369a1', bg:'#e0f2fe' },
  { min:0,  max:49,  id:'seedling',    label:'Seedling',    icon:'🌱', color:'#d97706', bg:'#fffbeb' },
];

function sparkLevel(score) {
  return SPARK_LEVELS.find(l => score >= l.min && score <= l.max) || SPARK_LEVELS[4];
}

// Spark Code format: SCH-GR#-XXXX (school initials, grade, unique ID)
// No more scores embedded in the code

const ADMIN_SCHOOLS = [
  { id:1, code:'LMS', name:'Lincoln Middle School',    city:'Miami, FL',            grades:'6–8',   teachers:12, students:348, avgSpark:74 },
  { id:2, code:'RES', name:'Roosevelt Elementary',     city:'Miami, FL',            grades:'3–5',   teachers:9,  students:210, avgSpark:81 },
  { id:3, code:'JHS', name:'Jefferson High School',    city:'Fort Lauderdale, FL',  grades:'9–12',  teachers:18, students:512, avgSpark:68 },
  { id:4, code:'WSA', name:'Westside Academy',         city:'Hialeah, FL',          grades:'5–8',   teachers:7,  students:189, avgSpark:77 },
  { id:5, code:'SSC', name:'Sunrise STEM Charter',     city:'Sunrise, FL',          grades:'6–10',  teachers:11, students:264, avgSpark:83 },
];

const ADMIN_TEACHERS = [
  // Lincoln Middle School
  { id:1,  name:'Ms. Rivera',      school:'Lincoln Middle School',    subject:'Math',    classes:3, students:86,  status:'active' },
  { id:2,  name:'Mr. Thompson',    school:'Lincoln Middle School',    subject:'Science', classes:2, students:54,  status:'active' },
  { id:3,  name:'Ms. Park',        school:'Lincoln Middle School',    subject:'Spanish', classes:2, students:48,  status:'active' },
  { id:4,  name:'Mr. Diaz',        school:'Lincoln Middle School',    subject:'ELA',     classes:3, students:72,  status:'active' },
  // Roosevelt Elementary
  { id:5,  name:'Ms. Chen',        school:'Roosevelt Elementary',     subject:'ELA',     classes:4, students:72,  status:'active' },
  { id:6,  name:'Mr. Okafor',      school:'Roosevelt Elementary',     subject:'Math',    classes:3, students:58,  status:'active' },
  { id:7,  name:'Ms. Nguyen',      school:'Roosevelt Elementary',     subject:'Science', classes:2, students:40,  status:'active' },
  // Jefferson High School
  { id:8,  name:'Mr. Patel',       school:'Jefferson High School',    subject:'Math',    classes:5, students:128, status:'active' },
  { id:9,  name:'Dr. Roberts',     school:'Jefferson High School',    subject:'Science', classes:4, students:96,  status:'active' },
  { id:10, name:'Ms. Hernandez',   school:'Jefferson High School',    subject:'Spanish', classes:3, students:75,  status:'active' },
  { id:11, name:'Mr. Kim',         school:'Jefferson High School',    subject:'History', classes:4, students:98,  status:'active' },
  // Westside Academy
  { id:12, name:'Ms. Johnson',     school:'Westside Academy',         subject:'Spanish', classes:3, students:61,  status:'inactive' },
  { id:13, name:'Mr. Reyes',       school:'Westside Academy',         subject:'Math',    classes:2, students:44,  status:'active' },
  // Sunrise STEM Charter
  { id:14, name:'Dr. Williams',    school:'Sunrise STEM Charter',     subject:'Science', classes:4, students:88,  status:'active' },
  { id:15, name:'Ms. Nakamura',    school:'Sunrise STEM Charter',     subject:'Math',    classes:3, students:66,  status:'active' },
  { id:16, name:'Mr. Flores',      school:'Sunrise STEM Charter',     subject:'ELA',     classes:2, students:48,  status:'active' },
];

const ADMIN_ROSTER = [
  // ── Lincoln Middle School ─────────────────────────────────
  { id:101, name:'Ava Martinez',    school:'Lincoln Middle School', grade:6, teacher:'Ms. Rivera',    code:'LMS-GR6-0101', math:88, sci:82, spa:79, date:'Apr 28' },
  { id:102, name:'Noah Williams',   school:'Lincoln Middle School', grade:6, teacher:'Ms. Rivera',    code:'LMS-GR6-0102', math:54, sci:61, spa:58, date:'Apr 28' },
  { id:103, name:'Sophia Chen',     school:'Lincoln Middle School', grade:6, teacher:'Ms. Rivera',    code:'LMS-GR6-0103', math:91, sci:87, spa:85, date:'Apr 28' },
  { id:104, name:'Liam Johnson',    school:'Lincoln Middle School', grade:6, teacher:'Ms. Rivera',    code:'LMS-GR6-0104', math:72, sci:78, spa:74, date:'Apr 28' },
  { id:105, name:'Emma Davis',      school:'Lincoln Middle School', grade:6, teacher:'Ms. Rivera',    code:'LMS-GR6-0105', math:63, sci:58, spa:61, date:'Apr 28' },
  { id:106, name:'Oliver Brown',    school:'Lincoln Middle School', grade:6, teacher:'Ms. Rivera',    code:'LMS-GR6-0106', math:95, sci:92, spa:90, date:'Apr 28' },
  { id:107, name:'Mia Wilson',      school:'Lincoln Middle School', grade:6, teacher:'Ms. Rivera',    code:'LMS-GR6-0107', math:81, sci:84, spa:78, date:'Apr 28' },
  { id:108, name:'Ethan Taylor',    school:'Lincoln Middle School', grade:7, teacher:'Mr. Thompson',  code:'LMS-GR7-0108', math:67, sci:72, spa:65, date:'Apr 25' },
  { id:109, name:'Isabella Moore',  school:'Lincoln Middle School', grade:7, teacher:'Mr. Thompson',  code:'LMS-GR7-0109', math:76, sci:80, spa:74, date:'Apr 25' },
  { id:110, name:'Lucas Anderson',  school:'Lincoln Middle School', grade:7, teacher:'Mr. Thompson',  code:'LMS-GR7-0110', math:93, sci:89, spa:91, date:'Apr 25' },
  { id:111, name:'Amelia Jackson',  school:'Lincoln Middle School', grade:7, teacher:'Mr. Thompson',  code:'LMS-GR7-0111', math:51, sci:48, spa:55, date:'Apr 25' },
  { id:112, name:'Mason White',     school:'Lincoln Middle School', grade:8, teacher:'Ms. Park',      code:'LMS-GR8-0112', math:84, sci:79, spa:82, date:'Apr 22' },
  { id:113, name:'Harper Harris',   school:'Lincoln Middle School', grade:8, teacher:'Ms. Park',      code:'LMS-GR8-0113', math:69, sci:64, spa:71, date:'Apr 22' },
  { id:114, name:'Logan Martin',    school:'Lincoln Middle School', grade:8, teacher:'Ms. Park',      code:'LMS-GR8-0114', math:87, sci:91, spa:85, date:'Apr 22' },
  { id:115, name:'Ella Thompson',   school:'Lincoln Middle School', grade:8, teacher:'Mr. Diaz',      code:'LMS-GR8-0115', math:74, sci:70, spa:77, date:'Apr 22' },

  // ── Roosevelt Elementary ──────────────────────────────────
  { id:201, name:'Alex Rivera',     school:'Roosevelt Elementary',  grade:3, teacher:'Ms. Chen',      code:'RES-GR3-0201', math:86, sci:83, spa:88, date:'Apr 29' },
  { id:202, name:'Jordan Kim',      school:'Roosevelt Elementary',  grade:3, teacher:'Ms. Chen',      code:'RES-GR3-0202', math:92, sci:90, spa:94, date:'Apr 29' },
  { id:203, name:'Taylor Cruz',     school:'Roosevelt Elementary',  grade:3, teacher:'Ms. Chen',      code:'RES-GR3-0203', math:61, sci:66, spa:58, date:'Apr 29' },
  { id:204, name:'Morgan Patel',    school:'Roosevelt Elementary',  grade:4, teacher:'Mr. Okafor',    code:'RES-GR4-0204', math:78, sci:75, spa:80, date:'Apr 27' },
  { id:205, name:'Casey Wang',      school:'Roosevelt Elementary',  grade:4, teacher:'Mr. Okafor',    code:'RES-GR4-0205', math:84, sci:88, spa:82, date:'Apr 27' },
  { id:206, name:'Riley Scott',     school:'Roosevelt Elementary',  grade:4, teacher:'Mr. Okafor',    code:'RES-GR4-0206', math:90, sci:87, spa:91, date:'Apr 27' },
  { id:207, name:'Avery Lee',       school:'Roosevelt Elementary',  grade:5, teacher:'Ms. Nguyen',    code:'RES-GR5-0207', math:73, sci:77, spa:71, date:'Apr 24' },
  { id:208, name:'Cameron Diaz',    school:'Roosevelt Elementary',  grade:5, teacher:'Ms. Nguyen',    code:'RES-GR5-0208', math:68, sci:62, spa:70, date:'Apr 24' },
  { id:209, name:'Sage Williams',   school:'Roosevelt Elementary',  grade:5, teacher:'Ms. Nguyen',    code:'RES-GR5-0209', math:95, sci:93, spa:96, date:'Apr 24' },
  { id:210, name:'Drew Martinez',   school:'Roosevelt Elementary',  grade:5, teacher:'Ms. Nguyen',    code:'RES-GR5-0210', math:81, sci:79, spa:83, date:'Apr 24' },

  // ── Jefferson High School ─────────────────────────────────
  { id:301, name:'Aiden Garcia',    school:'Jefferson High School', grade:9,  teacher:'Mr. Patel',    code:'JHS-GR9-0301', math:88, sci:84, spa:81, date:'Apr 26' },
  { id:302, name:'Luna Rodriguez',  school:'Jefferson High School', grade:9,  teacher:'Mr. Patel',    code:'JHS-GR9-0302', math:44, sci:50, spa:47, date:'Apr 26' },
  { id:303, name:'Jackson Lee',     school:'Jefferson High School', grade:9,  teacher:'Mr. Patel',    code:'JHS-GR9-0303', math:91, sci:88, spa:90, date:'Apr 26' },
  { id:304, name:'Lily Walker',     school:'Jefferson High School', grade:10, teacher:'Dr. Roberts',  code:'JHS-GR10-0304', math:75, sci:79, spa:72, date:'Apr 23' },
  { id:305, name:'Sebastian Hall',  school:'Jefferson High School', grade:10, teacher:'Dr. Roberts',  code:'JHS-GR10-0305', math:61, sci:57, spa:64, date:'Apr 23' },
  { id:306, name:'Camila Young',    school:'Jefferson High School', grade:10, teacher:'Dr. Roberts',  code:'JHS-GR10-0306', math:85, sci:88, spa:83, date:'Apr 23' },
  { id:307, name:'Mateo Flores',    school:'Jefferson High School', grade:11, teacher:'Ms. Hernandez', code:'JHS-GR11-0307', math:70, sci:74, spa:78, date:'Apr 20' },
  { id:308, name:'Valentina Cruz',  school:'Jefferson High School', grade:11, teacher:'Ms. Hernandez', code:'JHS-GR11-0308', math:93, sci:90, spa:95, date:'Apr 20' },
  { id:309, name:'Diego Morales',   school:'Jefferson High School', grade:11, teacher:'Mr. Kim',      code:'JHS-GR11-0309', math:67, sci:71, spa:65, date:'Apr 20' },
  { id:310, name:'Sofia Gutierrez', school:'Jefferson High School', grade:12, teacher:'Mr. Kim',      code:'JHS-GR12-0310', math:82, sci:79, spa:85, date:'Apr 17' },
  { id:311, name:'Carlos Reyes',    school:'Jefferson High School', grade:12, teacher:'Mr. Kim',      code:'JHS-GR12-0311', math:76, sci:80, spa:74, date:'Apr 17' },
  { id:312, name:'Isabella Torres', school:'Jefferson High School', grade:12, teacher:'Mr. Kim',      code:'JHS-GR12-0312', math:55, sci:60, spa:58, date:'Apr 17' },

  // ── Westside Academy ─────────────────────────────────────
  { id:401, name:'Zoe Adams',       school:'Westside Academy',      grade:5, teacher:'Mr. Reyes',     code:'WSA-GR5-0401', math:79, sci:82, spa:76, date:'Apr 28' },
  { id:402, name:'Elijah Baker',    school:'Westside Academy',      grade:5, teacher:'Mr. Reyes',     code:'WSA-GR5-0402', math:64, sci:60, spa:67, date:'Apr 28' },
  { id:403, name:'Aria Nelson',     school:'Westside Academy',      grade:6, teacher:'Mr. Reyes',     code:'WSA-GR6-0403', math:88, sci:85, spa:90, date:'Apr 25' },
  { id:404, name:'Grayson Carter',  school:'Westside Academy',      grade:6, teacher:'Ms. Johnson',   code:'WSA-GR6-0404', math:72, sci:68, spa:74, date:'Apr 25' },
  { id:405, name:'Nova Mitchell',   school:'Westside Academy',      grade:7, teacher:'Ms. Johnson',   code:'WSA-GR7-0405', math:83, sci:80, spa:86, date:'Apr 22' },
  { id:406, name:'Hunter Perez',    school:'Westside Academy',      grade:7, teacher:'Ms. Johnson',   code:'WSA-GR7-0406', math:56, sci:52, spa:59, date:'Apr 22' },
  { id:407, name:'Penelope Roberts',school:'Westside Academy',      grade:8, teacher:'Mr. Reyes',     code:'WSA-GR8-0407', math:91, sci:87, spa:89, date:'Apr 19' },
  { id:408, name:'Eli Turner',      school:'Westside Academy',      grade:8, teacher:'Mr. Reyes',     code:'WSA-GR8-0408', math:77, sci:81, spa:73, date:'Apr 19' },

  // ── Sunrise STEM Charter ─────────────────────────────────
  { id:501, name:'Aurora Phillips', school:'Sunrise STEM Charter',  grade:6,  teacher:'Dr. Williams', code:'SSC-GR6-0501', math:94, sci:97, spa:91, date:'Apr 29' },
  { id:502, name:'Orion Campbell',  school:'Sunrise STEM Charter',  grade:6,  teacher:'Dr. Williams', code:'SSC-GR6-0502', math:86, sci:90, spa:84, date:'Apr 29' },
  { id:503, name:'Hazel Parker',    school:'Sunrise STEM Charter',  grade:7,  teacher:'Ms. Nakamura', code:'SSC-GR7-0503', math:79, sci:82, spa:77, date:'Apr 26' },
  { id:504, name:'Atlas Evans',     school:'Sunrise STEM Charter',  grade:7,  teacher:'Ms. Nakamura', code:'SSC-GR7-0504', math:88, sci:84, spa:86, date:'Apr 26' },
  { id:505, name:'Lyra Collins',    school:'Sunrise STEM Charter',  grade:8,  teacher:'Dr. Williams', code:'SSC-GR8-0505', math:93, sci:95, spa:90, date:'Apr 23' },
  { id:506, name:'Jasper Stewart',  school:'Sunrise STEM Charter',  grade:8,  teacher:'Dr. Williams', code:'SSC-GR8-0506', math:71, sci:75, spa:68, date:'Apr 23' },
  { id:507, name:'Celeste Morris',  school:'Sunrise STEM Charter',  grade:9,  teacher:'Mr. Flores',   code:'SSC-GR9-0507', math:85, sci:88, spa:82, date:'Apr 20' },
  { id:508, name:'Finn Rogers',     school:'Sunrise STEM Charter',  grade:9,  teacher:'Mr. Flores',   code:'SSC-GR9-0508', math:62, sci:66, spa:59, date:'Apr 20' },
  { id:509, name:'Ivy Reed',        school:'Sunrise STEM Charter',  grade:10, teacher:'Ms. Nakamura', code:'SSC-GR10-0509', math:90, sci:92, spa:88, date:'Apr 17' },
  { id:510, name:'Knox Cook',       school:'Sunrise STEM Charter',  grade:10, teacher:'Mr. Flores',   code:'SSC-GR10-0510', math:78, sci:80, spa:76, date:'Apr 17' },
];

// Compute avg score per student
ADMIN_ROSTER.forEach(s => {
  s.avg = Math.round((s.math + s.sci + s.spa) / 3);
  s.level = sparkLevel(s.avg);
  s.pm1 = s.avg - Math.floor(Math.random() * 6);  // PM1 slightly lower than current avg
  s.pm2 = s.avg;
});
