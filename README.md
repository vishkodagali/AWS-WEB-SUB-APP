# Web Application using React, JavaScript, and AWS

This web application is a cloud-based project developed using **React**, **JavaScript**, and various **AWS services**. It demonstrates the integration of multiple AWS services including EC2, S3, API Gateway, Lambda, and DynamoDB to create a scalable and efficient web app.

## Features

- User Authentication using DynamoDB.
- Music subscription management using AWS DynamoDB and S3.
- User data is stored and managed using AWS DynamoDB.
- Frontend developed using React and JavaScript.
- Hosted on an AWS EC2 instance.
- Image storage and retrieval using AWS S3.
- API Gateway and Lambda functions for secure and efficient API interactions.

## Tech Stack

- **Frontend:** React, JavaScript
- **Backend:** AWS (EC2, S3, API Gateway, Lambda, DynamoDB)
- **Hosting:** AWS EC2 with Apache2

## Getting Started

### Prerequisites

- Node.js and npm installed on your local machine.
- AWS account with access to EC2, S3, DynamoDB, API Gateway, and Lambda.
- An EC2 instance running Ubuntu 20.04/18.04 LTS for hosting the application.

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/vishkodagali/AWS-WEB-SUB-APP.git
    cd AWS-WEB-SUB-APP
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Configure AWS SDK:**
    - Set up your AWS credentials using `aws configure`.
    - Create necessary DynamoDB tables and S3 buckets as per the application requirements.

4. **Deploy the frontend:**
    - Build the React application:
      ```bash
      npm run build
      ```
    - Copy the build files to your EC2 instance’s web server directory.

5. **Backend setup:**
    - Create necessary Lambda functions for API interactions.
    - Set up API Gateway for communication between the frontend and DynamoDB.

### Usage

- Navigate to the application's URL (Public IPv4 DNS of your EC2 instance) to access the login and subscription features.
- Register a new user or log in using the existing credentials.
- Explore the music subscription functionalities using the search and subscription features.

### Acknowledgments

- AWS for providing the cloud platform and services used in this application.
- React and the open-source community for their valuable resources and support.



