CollegeAPI
│
├── .gitignore
├── README.md
├── package.json                 (optional root manager)
├── docs
│   ├── API_Documentation.md
│   ├── Database_Design.md
│   └── Project_Roadmap.md
│
├── backend                     ← Node.js + Express + MongoDB
│
│   ├── server.js               ← Express entry point
│   ├── package.json
│   ├── .env                    ← Secret configuration
│
│   ├── config
│   │   ├── db.js               ← MongoDB connection
│   │   └── config.js           ← App configuration
│
│   ├── controllers
│   │   ├── studentController.js
│   │   ├── userController.js
│   │   └── authController.js
│
│   ├── models
│   │   ├── Student.js
│   │   └── User.js
│
│   ├── routes
│   │   ├── studentRoutes.js
│   │   ├── userRoutes.js
│   │   └── authRoutes.js
│
│   ├── middleware
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── notFoundMiddleware.js
│
│   ├── validators
│   │   └── studentValidator.js
│
│   ├── utils
│   │   ├── generateToken.js
│   │   └── responseHandler.js
│
│   ├── uploads
│   │   └── .gitkeep
│
│   ├── logs
│   │   └── .gitkeep
│
│   └── node_modules             ← Git ignored
│
│
└── frontend                    ← React + Vite
    │
    ├── index.html
    ├── vite.config.js
    ├── eslint.config.js
    ├── package.json
    ├── .env                    ← API URL
    │
    ├── public
    │   └── images
    │
    └── src
        │
        ├── main.jsx             ← React entry
        ├── App.jsx
        ├── App.css
        ├── index.css
        │
        ├── assets
        │   └── react.svg
        │
        ├── components
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   ├── StudentForm.jsx
        │   ├── StudentTable.jsx
        │   └── Student.css
        │
        ├── pages
        │   ├── Home.jsx
        │   ├── Students.jsx
        │   ├── Login.jsx
        │   └── Register.jsx
        │
        ├── router
        │   └── AppRouter.jsx
        │
        ├── context
        │   └── AuthContext.jsx
        │
        ├── hooks
        │   └── useStudents.js
        │
        ├── services
        │   ├── api.js
        │   └── studentService.js
        │
        ├── utils
        │   └── helpers.js
        │
        └── node_modules          ← Git ignored