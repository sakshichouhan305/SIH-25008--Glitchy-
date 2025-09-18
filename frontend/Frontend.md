 # Disaster Preparedness & Response Education System (Frontend)
    Problem Statement
    ID: 25008
    Title: Disaster Preparedness and Response Education System for Schools and Colleges

 # Overview

Indian schools & colleges are often unprepared for natural disasters (earthquakes, floods, fires). This project provides a digital learning platform to integrate disaster management into education.

The frontend ensures:

    => Students learn disaster response through gamified    modules & quizzes

    => Teachers manage lessons & track progress

    => Admins monitor preparedness levels via dashboards & reports

 # Key Features (Frontend)

 Role-Based Dashboards

    => Student: Lessons, quizzes, virtual drills, progress tracking

    => Teacher: Upload/manage modules, view student performance

    => Admin: Analytics, preparedness scores, drill monitoring

Interactive Learning

    => Gamified lessons on disaster management

    => Real-time quizzes after each lesson

    => Virtual drill simulations

Charts & Insights

     => Pie Chart → Awareness & readiness levels

     => Histogram → Student participation & quiz scores

Emergency Tools

    => Quick access to emergency contacts

    => Region-specific alerts & notifications

Tech Stack

    Framework: React + Tailwind CSS

    Charts & Graphs: Chart.js (via react-chartjs-2)

    State Management: React Context API (Auth + Modules)

API Integration: Axios

Authentication: JWT-based

Frontend Project Structure
    <pre>/Glitchy-app
    ┣   public
    ┣    src
    ┃ ┣   assets        # Images, icons, styles
    ┃ ┣   components    # Reusable UI components
    ┃ ┃ ┣ UI/            # Cards, Breadcrumb, CTA, Modals, Charts
    ┃ ┃ ┣ layout/        # Hero, Navbar
    ┃ ┃ ┣ features/      # Quiz, PostCard, Scoreboard
    ┃ ┣   context       # AuthContext, ModuleContext
    ┃ ┣   hooks         # useAuth.js
    ┃ ┣   pages         # Home, Dashboard, Admin, Login
    ┃ ┣   services      # API.js, GameLogic.js
    ┃ ┣ App.js
    ┃ ┣ index.js
    ┃ ┣ index.css
    ┣ package.json
    ┗ README.md </pre>

# Dashboard Visuals

Pie Chart → Module Completion Status

Histogram → Participation & performance analysis
