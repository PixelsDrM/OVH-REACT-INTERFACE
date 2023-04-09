# OVH-React-Interface
## OVH React Interface to manage DNS Zones

### Install npm packages
```bash
npm install
```

### Declare your API gateway URL in a .env file
```bash
cp .env.example .env
```

### Run the development server
```bash
npm start
```

## Or use docker to build a production image
```bash
docker build -t ovh-react-interface .
docker run -d --restart always -p 80:80 --name ovh-react-interface ovh-react-interface
```

## OVH Endpoints used in this project
```
GET /domain/zone
GET /domain/zone/{zoneName}
GET /domain/zone/{zoneName}/record
POST /domain/zone/{zoneName}/record
GET /domain/zone/{zoneName}/record/{id}
PUT /domain/zone/{zoneName}/record/{id}
DELETE /domain/zone/{zoneName}/record/{id}
POST /domain/zone/{zoneName}/refresh
```