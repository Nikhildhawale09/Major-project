# Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/your-org/photography-api.git
cd photography-api
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Setup Environment Variables

Create a `.env` file with AWS/DynamoDB config and JWT secrets:

```
PORT=5000
JWT_SECRET=your_jwt_secret
DYNAMODB_TABLE=PhotographyUsers
DYNAMODB_BOOKINGS_TABLE=Bookings
PHOTOGRAPHY_SERVICES_TABLE=PhotographyServices
ADDITIONAL_SERVICES_TABLE=AdditionalServices
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=ap-south-1
```

## 4. Run App Locally

```bash
npm run dev
```

Visit:
- Swagger Docs: https://backend.bookeetube.online/api-docs