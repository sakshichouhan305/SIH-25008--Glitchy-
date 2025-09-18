# Disaster Preparedness and Response Education System (Glitchy App)

**Problem Statement ID:** 25008  
**Title:** Disaster Preparedness and Response Education System for Schools and Colleges  
**Organization:** Government of Punjab  
**Department:** Department of Higher Education  
**Theme:** Disaster Management  

---

##  Overview
In India, schools and colleges remain underprepared for natural disasters such as **earthquakes, floods, and fires**. While guidelines exist, they are rarely practiced effectively, leading to **panic and unsafe outcomes** during emergencies.  

This project provides a **digital platform** to educate and prepare students, teachers, and institutions for disaster scenarios through **virtual drills, gamified learning, and real-time alerts**.

---

##  Problem
-  Lack of structured disaster education in curriculum.  
-  Manual drills are infrequent and poorly coordinated.  
-  Students are unaware of region-specific disaster responses.  
-  No digital system exists to track preparedness or run simulations.  

---

##  Impact
-  Builds **awareness and readiness** among students and staff.  
-  Reduces **panic and chaos** during real disasters.  
-  Strengthens **institutional preparedness** with digital tools.  
-  Contributes to a **disaster-resilient society**.  

---

##  Expected Outcomes
-  Digital platform / mobile app with **interactive learning modules**.  
-  **Gamified quizzes** to engage students.  
-  **Virtual disaster drills** for practice.  
-  **Region-specific alerts** and safety guidelines.  
-  Real-time **emergency communication tools**.  
-  Admin dashboards to **track preparedness scores** and drill reports.  

---

##  Stakeholders
-  **Students** (K-12 and higher education)  
-  **Teachers & school administrators**  
-  **Parents and guardians**  
-  **Disaster response teams & government bodies** (NDMA, Education Ministry)  

---

##  Project Structure
<pre>
/Glitchy-app
│── Client/
│ ├── Src/
│ │ ├── Components/ (UI components)
│ │ ├── Pages/ (Home, Login, Dashboard, Admin)
│ │ ├── Features/ (Quiz, Scoreboard, Lessons)
│ │ └── Context & Hooks/ (Auth, Modules)
│ └── Public, Assets, Styles
│
│── Server/
│ ├── Config/ (Database connection)
│ ├── Controllers/ (Auth, Lessons, Modules, Quiz, Drill)
│ ├── Models/ (Student, Admin, Institute, Quiz, Drill, User)
│ ├── Routes/ (API endpoints)
│ ├── Middleware/ (Auth & Role checks)
│ └── Utils/ (Error handling, Milestones)
│
│── Tests/
│── .env
│── README.md</pre>


---

##  Key APIs
- **`/api/login`** → Role-based login (Student, Institute-Admin, Admin).  
- **`/api/dashboard`** → Fetch user role-specific dashboard.  
- **`/api/lessons`** → CRUD operations for lessons.  
- **`/api/modules`** → Manage disaster preparedness modules.  
- **`/api/quiz`** → Create, fetch, update quizzes.  
- **`/api/attempt`** → Store quiz attempts & return scores.  
- **`/api/virtualdrill`** → Manage disaster simulation drills.  

---

##  Tech Stack
-  **Frontend:** React.js  
-  **Backend:** Node.js, Express.js  
-  **Database:** MongoDB  
-  **Authentication:** JWT-based role login  
-  **UI Enhancements:** Charts, Modals, Scoreboards  
-  **Hosting:** Cloud-ready  

---

##  Supporting Data
-  NDMA reports show **low awareness levels** in schools despite India’s high disaster vulnerability index.  
-  UNDRR recommends **integrating disaster risk reduction into education policies**.  

---

##  Team Details
**Team Name:** Glitchy  

-  **UI/UX Designer:** Sujal Bhawsar  
-  **Frontend Developers:** Pushpendra Yadav, Sakshi Chouhan, Mohit Yadav  
-  **Backend Developer:** Vivek Yadav  
-  **API Integration & Model Training:** VidhyaSagar  

---

##  Contact
**Department of Higher Education, Government of Punjab**  
