# Docker Deployment - Quick Start Guide

## Prerequisites

Before deploying with Docker, ensure you have:

- **Docker Desktop** installed ([Download](https://www.docker.com/products/docker-desktop))
- **Docker Compose** installed (comes with Docker Desktop)
- **Git** installed ([Download](https://git-scm.com))
- At least 4GB RAM available
- Ports 80, 443, 5000, and 27017 available

## Quick Start (2 Minutes)

### Mac/Linux Users:

```bash
# 1. Clone the repository
git clone https://github.com/Benzica/BenZicabank-.git
cd BenZicabank-

# 2. Make deployment script executable
chmod +x deploy.sh

# 3. Run deployment
./deploy.sh
```

### Windows Users:

```bash
# 1. Clone the repository
git clone https://github.com/Benzica/BenZicabank-.git
cd BenZicabank-

# 2. Run deployment script (double-click or run in CMD)
deploy.bat
```

### Manual Deployment (All Platforms):

```bash
# 1. Clone the repository
git clone https://github.com/Benzica/BenZicabank-.git
cd BenZicabank-

# 2. Start all services
docker-compose up -d

# 3. View status
docker-compose ps
```

---

## ✅ After Deployment

### Access Your Application

Once deployment is complete, you can access:

- **🌐 Website**: http://localhost
- **🔌 API**: http://localhost/api
- **📊 Health Check**: http://localhost/api/health
- **💾 MongoDB**: mongodb://admin:password123@localhost:27017/benzicabank

### Test the Application

#### 1. Register a New Account

```bash
curl -X POST http://localhost/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "1234567890",
    "ssn": "123-45-6789",
    "dateOfBirth": "1990-01-01"
  }'
```

#### 2. Login

```bash
curl -X POST http://localhost/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### 3. Check Health

```bash
curl http://localhost/api/health
```

---

## 📋 Docker Services

Your Docker deployment includes:

### 1. **MongoDB** (Port 27017)
   - Database for storing users, accounts, and transactions
   - Username: `admin`
   - Password: `password123`
   - Database: `benzicabank`

### 2. **Node.js App** (Port 5000)
   - Express API server
   - Handles all business logic
   - Connected to MongoDB

### 3. **Nginx** (Port 80)
   - Reverse proxy
   - Serves static files
   - Routes API requests to Node.js app

---

## 🔧 Managing Docker Containers

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app
docker-compose logs -f mongodb
docker-compose logs -f nginx
```

### Restart Services

```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart app
docker-compose restart mongodb
```

### Stop Services

```bash
# Stop all (keeps data)
docker-compose stop

# Stop and remove containers (keeps data)
docker-compose down

# Stop and remove everything including volumes
docker-compose down -v
```

### Check Container Status

```bash
docker-compose ps
```

### Execute Commands in Container

```bash
# Access MongoDB shell
docker exec -it benzicabank-mongodb mongosh -u admin -p password123 --authenticationDatabase admin

# Access Node.js container
docker exec -it benzicabank-app sh

# View app logs
docker logs -f benzicabank-app
```

---

## 🔐 Security Configuration

### For Production, Update These Settings:

1. **MongoDB Password** - Change in `docker-compose.yml`:
   ```yaml
   MONGO_INITDB_ROOT_PASSWORD: your_secure_password
   ```

2. **JWT Secret** - Change in `docker-compose.yml`:
   ```yaml
   JWT_SECRET: your_very_secure_random_key
   ```

3. **CORS Origin** - Update for your domain:
   ```yaml
   CORS_ORIGIN: https://yourdomain.com
   ```

4. **Enable HTTPS** - Add SSL certificates to Nginx:
   - Use Let's Encrypt for free certificates
   - Update nginx.conf with SSL configuration

### Docker Compose with Production Settings:

```yaml
environment:
  - NODE_ENV=production
  - MONGODB_URI=mongodb://admin:securepass@mongodb:27017/benzicabank
  - JWT_SECRET=your-very-secure-key-here
  - CORS_ORIGIN=https://yourdomain.com
  - BCRYPT_ROUNDS=12
```

---

## 📊 Monitoring & Debugging

### Monitor Resource Usage

```bash
docker stats
```

### Check Container Health

```bash
# Check specific container
docker inspect benzicabank-app
```

### View Network

```bash
docker network inspect benzicabank-network
```

### Troubleshooting

#### Port Already in Use
```bash
# Free up port 80
sudo lsof -i :80
sudo kill -9 <PID>

# Or change port in docker-compose.yml
ports:
  - "8080:80"  # Use 8080 instead
```

#### MongoDB Connection Issues
```bash
# Check MongoDB logs
docker-compose logs mongodb

# Connect to MongoDB
docker exec -it benzicabank-mongodb mongosh -u admin -p password123
```

#### App Crashes
```bash
# View app logs
docker-compose logs app

# Rebuild app image
docker-compose build app
docker-compose up -d app
```

---

## 🚀 Scaling & Performance

### Increase Resources

Edit `docker-compose.yml`:

```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '1'
          memory: 1G
```

### Add More App Instances (Load Balancing)

```yaml
version: '3.8'
services:
  app1:
    # ... app configuration
  app2:
    # ... same as app1
  app3:
    # ... same as app1
  nginx:
    # Nginx automatically load balances
```

---

## 📦 Updating the Application

### Pull Latest Changes

```bash
# Stop services
docker-compose down

# Update code
git pull origin main

# Rebuild and restart
docker-compose up -d --build
```

### Update Dependencies

```bash
# Update package.json
# Then rebuild
docker-compose build app
docker-compose up -d app
```

---

## 🗄️ Database Management

### Backup MongoDB

```bash
docker exec benzicabank-mongodb mongodump -u admin -p password123 \
  --authenticationDatabase admin --out /backup
```

### Restore MongoDB

```bash
docker exec benzicabank-mongodb mongorestore -u admin -p password123 \
  --authenticationDatabase admin /backup
```

### Access MongoDB CLI

```bash
docker exec -it benzicabank-mongodb mongosh -u admin -p password123 --authenticationDatabase admin
```

---

## 📈 Migration to Production

When ready for production:

1. **Update Environment Variables**
   - Change all secrets
   - Set NODE_ENV=production
   - Update CORS_ORIGIN

2. **Enable HTTPS**
   - Get SSL certificates
   - Update nginx.conf

3. **Use External Database**
   - Switch from local MongoDB to MongoDB Atlas
   - Update MONGODB_URI

4. **Use External MongoDB**
   ```yaml
   MONGODB_URI: mongodb+srv://user:pass@cluster.mongodb.net/benzicabank
   ```

5. **Set Resource Limits**
   - Configure memory and CPU limits
   - Enable auto-restart policies

6. **Enable Monitoring**
   - Set up logging aggregation
   - Configure health checks
   - Enable performance monitoring

---

## 🆘 Support & Help

### Common Issues

**Q: Containers not starting?**
A: Check Docker Desktop is running and you have enough disk space

**Q: Port 80 already in use?**
A: Change the port in docker-compose.yml or stop the conflicting service

**Q: Database connection refused?**
A: Wait 10-15 seconds for MongoDB to fully start

**Q: High memory usage?**
A: Reduce `memory` limits in docker-compose.yml or increase system RAM

### Get Logs for Support

```bash
# Collect all logs
docker-compose logs > logs.txt

# Share logs.txt with support team
```

---

## 📚 Next Steps

- [ ] Register test accounts in the application
- [ ] Verify all transaction features work
- [ ] Configure for production (update secrets)
- [ ] Set up monitoring and backups
- [ ] Deploy to production environment

---

**Deployment Date**: 2025
**Docker Version**: 3.8+
**Node.js Version**: 18 Alpine
**MongoDB Version**: 6.0
