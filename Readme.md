# 🚀 Jasamarga Backend

This is the backend service for the Jasamarga project, built using **Node.js**, **Express**, **TypeScript**, and **Sequelize**. It provides APIs for managing employees, profiles, families, and education records.

---

## **Table of Contents**
- [Prerequisites](#-prerequisites)
- [Installation](#️-installation)
- [Running the Application](#️-running-the-application)
- [Building and Running with Docker](#-building-and-running-with-docker)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [License](#-license)

---

## **Prerequisites**
Before running this project, make sure you have the following installed:
- **Node.js** (v18 or later)
- **npm** (Node Package Manager)
- **PostgreSQL** (for database)
- **Docker** (optional, for containerized deployment)

---

## **Installation**
Clone this repository and install the dependencies:
```sh
git clone https://github.com/your-repo/jasamarga-backend.git
cd jasamarga-backend
npm install
```

---

## ▶️ **Running the Application**
### **1️⃣ Setup Environment Variables**
Create a `.env` file in the project root and configure it:
```ini
DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=5432
NODE_ENV=development
PORT=3000
```

### **2️⃣ Run Database Migrations**
Make sure your PostgreSQL database is running, then apply migrations:
```sh
npx sequelize-cli db:migrate
```

### **3️⃣ Start the Application**
For development mode with **hot reload**:
```sh
npm run start:dev
```
For production mode:
```sh
npm run build
npm start
```

---

## **Building and Running with Docker**
### **1️⃣ Build the Docker Image**
```sh
docker build -t jasamarga-backend .
```

### **2️⃣ Run the Docker Container**
```sh
docker run -p 3000:3000 --env-file .env jasamarga-backend
```

### **3️⃣ Run in Detached Mode (Background)**
```sh
docker run -d -p 3000:3000 --env-file .env jasamarga-backend
```

### **4️⃣ Verify Running Container**
Check running containers:
```sh
docker ps
```

Check logs:
```sh
docker logs -f <container_id>
```

Stop the container:
```sh
docker stop <container_id>
```

---

## ⚡ **Available Scripts**
These scripts can be executed using `npm run <script>`:
- **`start`** → Runs the application in production mode.
- **`start:dev`** → Starts the app with **Nodemon** for hot-reloading.
- **`build`** → Compiles the TypeScript files to JavaScript.
- **`test`** → Runs tests (if configured).
- **`migrate`** → Applies database migrations.

---

## **Project Structure**
```
jasamarga-backend/
│-- src/
│   ├── controllers/      # API request handlers
│   ├── dtos/             # Data Transfer Objects (DTOs)
│   ├── middleware/       # Express middleware functions
│   ├── models/           # Sequelize models
│   ├── repositories/     # Database queries and logic
│   ├── services/         # Business logic layer
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── config/           # Database & environment configuration
│   ├── index.ts          # Main entry point
│-- migrations/           # Database migration files
│-- sql/                  # SQL query files (optional)
│-- .env                  # Environment variables
│-- .dockerignore         # Docker ignored files
│-- Dockerfile            # Docker build configuration
│-- package.json          # Dependencies and scripts
│-- tsconfig.json         # TypeScript configuration
│-- README.md             # Project documentation
```

---

## **Environment Variables**
The `.env` file should contain:
```ini
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
DB_PORT=5432
NODE_ENV=development
PORT=3000
```

---

---

<br>
<br>
<br>

# Project: Jasamarga

## End-point: Create Employee
### Method: POST
>```
>http://localhost:8000/employee
>```
### Body (**raw**)

```json
{
    "nik": "11019",
    "name": "Zefan",
    "is_active": true,
    "start_date": "2022-12-12",
    "end_date": "2029-12-12",
    "created_by": "system",
    "updated_by": "system",
    "profile": {
        "place_of_birth": "Tangerang",
        "date_of_birth": "2000-07-01",
        "gender": "Laki-Laki"
    },
    "educations": [{
        "name": "Universitas Pancasila",
        "level": "Strata 1",
        "description": "lulus"

    }],
    "families": [{
        "name": "Tina",
        "job": "Baker",
        "place_of_birth": "Jakarta",
        "date_of_birth": "1970-12-16",
        "religion": "Protestan",
        "relation_status": "Ibu"
    }]
}
```

### Response: 201
```json
{
    "success": true,
    "data": {
        "id": 34,
        "nik": "11019",
        "name": "Zefan",
        "is_active": true,
        "start_date": "2022-12-12T00:00:00.000Z",
        "end_date": "2029-12-12T00:00:00.000Z",
        "created_by": "system",
        "updated_by": "system",
        "created_at": "2025-03-05T07:21:21.965Z",
        "updated_at": "2025-03-05T07:21:21.965Z",
        "families": [
            {
                "id": 6,
                "employee_id": 34,
                "name": "Tina",
                "identifier": null,
                "job": "Baker",
                "place_of_birth": "Jakarta",
                "date_of_birth": "1970-12-16T00:00:00.000Z",
                "religion": "Protestan",
                "is_life": true,
                "is_divorced": null,
                "relation_status": "Ibu",
                "created_by": "system",
                "updated_by": null,
                "created_at": "2025-03-05T07:21:21.977Z",
                "updated_at": "2025-03-05T07:21:21.977Z"
            }
        ],
        "profile": {
            "id": 3,
            "employee_id": 34,
            "place_of_birth": "Tangerang",
            "date_of_birth": "2000-07-01T00:00:00.000Z",
            "gender": "Laki-Laki",
            "is_married": false,
            "prof_pict": null,
            "created_by": "system",
            "updated_by": null,
            "created_at": "2025-03-05T07:21:21.972Z",
            "updated_at": "2025-03-05T07:21:21.972Z"
        },
        "educations": [
            {
                "id": 3,
                "employee_id": 34,
                "name": "Universitas Pancasila",
                "level": "Strata 1",
                "description": "lulus",
                "created_by": "system",
                "updated_by": null,
                "created_at": "2025-03-05T07:21:21.979Z",
                "updated_at": "2025-03-05T07:21:21.979Z"
            }
        ]
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get One Employee
### Method: GET
>```
>http://localhost:8000/employee/1
>```
### Response: 200
```json
{
    "success": true,
    "data": {
        "id": 1,
        "nik": "11012",
        "name": "Budi",
        "is_active": true,
        "start_date": "2022-12-12T00:00:00.000Z",
        "end_date": "2029-12-12T00:00:00.000Z",
        "created_by": "system",
        "updated_by": "system",
        "created_at": "2025-03-04T14:19:00.596Z",
        "updated_at": "2025-03-04T14:19:00.596Z",
        "families": [
            {
                "id": 1,
                "employee_id": 1,
                "name": "Marni",
                "identifier": "32100594109960002",
                "job": "Ibu Rumah Tangga",
                "place_of_birth": "Denpasar",
                "date_of_birth": "1995-10-17T00:00:00.000Z",
                "religion": "Islam",
                "is_life": true,
                "is_divorced": false,
                "relation_status": "Istri",
                "created_by": "admin",
                "updated_by": "admin",
                "created_at": "2022-12-12T00:00:00.000Z",
                "updated_at": "2022-12-12T00:00:00.000Z"
            },
            {
                "id": 2,
                "employee_id": 1,
                "name": "Clara",
                "identifier": "32100594109020004",
                "job": "Pelajar",
                "place_of_birth": "Bangkalan",
                "date_of_birth": "2008-10-17T00:00:00.000Z",
                "religion": "Islam",
                "is_life": true,
                "is_divorced": false,
                "relation_status": "Anak",
                "created_by": "admin",
                "updated_by": "admin",
                "created_at": "2022-12-12T00:00:00.000Z",
                "updated_at": "2022-12-12T00:00:00.000Z"
            },
            {
                "id": 3,
                "employee_id": 1,
                "name": "Stephanie",
                "identifier": "32100594109020005",
                "job": "Pelajar",
                "place_of_birth": "Bangkalan",
                "date_of_birth": "2008-10-17T00:00:00.000Z",
                "religion": "Islam",
                "is_life": true,
                "is_divorced": false,
                "relation_status": "Anak",
                "created_by": "admin",
                "updated_by": "admin",
                "created_at": "2022-12-12T00:00:00.000Z",
                "updated_at": "2022-12-12T00:00:00.000Z"
            }
        ],
        "profile": {
            "id": 1,
            "employee_id": 1,
            "place_of_birth": "Jakarta",
            "date_of_birth": "1997-05-02T00:00:00.000Z",
            "gender": "Laki-Laki",
            "is_married": true,
            "prof_pict": null,
            "created_by": "admin",
            "updated_by": "admin",
            "created_at": "2022-12-12T00:00:00.000Z",
            "updated_at": "2022-12-12T00:00:00.000Z"
        },
        "educations": [
            {
                "id": 1,
                "employee_id": 1,
                "name": "SMKN 7 Jakarta",
                "level": "SMA",
                "description": "Sekolah Menengah Atas",
                "created_by": "admin",
                "updated_by": "admin",
                "created_at": "2022-12-12T00:00:00.000Z",
                "updated_at": "2022-12-12T00:00:00.000Z"
            }
        ]
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete Employee
### Method: DELETE
>```
>http://localhost:8000/employee/32
>```
### Response: 200
```json
{
    "success": true,
    "message": "Employee deleted successfully"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update Employee
### Method: PUT
>```
>http://localhost:8000/employee/34
>```
### Body (**raw**)

```json
{
    "nik": "11019",
    "name": "Zefan",
    "is_active": true,
    "start_date": "2022-12-12",
    "end_date": "2029-12-12",
    "created_by": "system",
    "updated_by": "system",
    "profile": {
        "id": 3,
        "place_of_birth": "Tangerang",
        "date_of_birth": "2000-07-01",
        "gender": "Laki-Laki"
    },
    "educations": [
         {
            "name": "SMAK Kasih Kemuliaan",
            "level": "SMA",
            "description": "lulus"
        },
        {
            "id": 3,
            "name": "Universitas Pancasila",
            "level": "Strata 1",
            "description": "lulus"
        }
    ],
    "families": [
        {
            "id": 6,
            "name": "Tina",
            "job": "Baker",
            "place_of_birth": "Jakarta",
            "date_of_birth": "1970-12-16",
            "religion": "Protestan",
            "relation_status": "Ibu"
        }
    ]
}
```

### Response: 200
```json
{
    "success": true,
    "message": "Employee updated successfully"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get All Employees
### Method: GET
>```
>undefined
>```
### Response: 200
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "nik": "11012",
            "name": "Budi",
            "is_active": true,
            "start_date": "2022-12-12T00:00:00.000Z",
            "end_date": "2029-12-12T00:00:00.000Z",
            "created_by": "system",
            "updated_by": "system",
            "created_at": "2025-03-04T14:19:00.596Z",
            "updated_at": "2025-03-04T14:19:00.596Z"
        },
        {
            "id": 2,
            "nik": "11013",
            "name": "Jarot",
            "is_active": true,
            "start_date": "2021-09-01T00:00:00.000Z",
            "end_date": "2028-09-01T00:00:00.000Z",
            "created_by": "system",
            "updated_by": "system",
            "created_at": "2025-03-04T14:19:00.596Z",
            "updated_at": "2025-03-04T14:19:00.596Z"
        },
        {
            "id": 15,
            "nik": "11015",
            "name": "James",
            "is_active": true,
            "start_date": "2022-12-12T00:00:00.000Z",
            "end_date": "2029-12-12T00:00:00.000Z",
            "created_by": "system",
            "updated_by": "system",
            "created_at": "2025-03-05T04:03:55.987Z",
            "updated_at": "2025-03-05T04:03:55.987Z"
        },
        {
            "id": 28,
            "nik": "11016",
            "name": "George",
            "is_active": true,
            "start_date": "2022-12-12T00:00:00.000Z",
            "end_date": "2029-12-12T00:00:00.000Z",
            "created_by": "system",
            "updated_by": "system",
            "created_at": "2025-03-05T04:19:05.871Z",
            "updated_at": "2025-03-05T04:19:05.871Z"
        },
        {
            "id": 29,
            "nik": "11017",
            "name": "Gary",
            "is_active": true,
            "start_date": "2022-12-12T00:00:00.000Z",
            "end_date": "2029-12-12T00:00:00.000Z",
            "created_by": "system",
            "updated_by": "system",
            "created_at": "2025-03-05T04:24:18.063Z",
            "updated_at": "2025-03-05T04:24:18.063Z"
        },
        {
            "id": 34,
            "nik": "11019",
            "name": "Zefan",
            "is_active": true,
            "start_date": "2022-12-12T00:00:00.000Z",
            "end_date": "2029-12-12T00:00:00.000Z",
            "created_by": "system",
            "updated_by": "system",
            "created_at": "2025-03-05T07:21:21.965Z",
            "updated_at": "2025-03-05T08:42:30.665Z"
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Employee Reports
### Method: GET
>```
>undefined
>```
### Response: 200
```json
{
    "success": true,
    "data": [
        {
            "employee_id": 1,
            "nik": "11012",
            "name": "Budi",
            "is_active": true,
            "gender": "Laki-Laki",
            "age": "27 Years Old",
            "school_name": "SMKN 7 Jakarta",
            "level": "SMA",
            "family_data": "Istri 1, Anak 2"
        },
        {
            "employee_id": 2,
            "nik": "11013",
            "name": "Jarot",
            "is_active": true,
            "gender": "Laki-Laki",
            "age": "28 Years Old",
            "school_name": "Universitas Negeri Jakarta",
            "level": "Strata 1",
            "family_data": "-"
        },
        {
            "employee_id": 34,
            "nik": "11019",
            "name": "Zefan",
            "is_active": true,
            "gender": "Laki-Laki",
            "age": "24 Years Old",
            "school_name": "SMAK Kasih Kemuliaan",
            "level": "SMA",
            "family_data": "Ibu 1"
        },
        {
            "employee_id": 34,
            "nik": "11019",
            "name": "Zefan",
            "is_active": true,
            "gender": "Laki-Laki",
            "age": "24 Years Old",
            "school_name": "Universitas Pancasila",
            "level": "Strata 1",
            "family_data": "Ibu 1"
        },
        {
            "employee_id": 15,
            "nik": "11015",
            "name": "James",
            "is_active": true,
            "gender": null,
            "age": " Years Old",
            "school_name": null,
            "level": null,
            "family_data": "-"
        },
        {
            "employee_id": 28,
            "nik": "11016",
            "name": "George",
            "is_active": true,
            "gender": null,
            "age": " Years Old",
            "school_name": null,
            "level": null,
            "family_data": "-"
        },
        {
            "employee_id": 29,
            "nik": "11017",
            "name": "Gary",
            "is_active": true,
            "gender": null,
            "age": " Years Old",
            "school_name": null,
            "level": null,
            "family_data": "-"
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)