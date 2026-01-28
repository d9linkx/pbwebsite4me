# API Integration Setup

This document describe to set up and use the API integration for the Prawnbox delivery application.

## Overview

The API integration replaces the mock data approach with real HTTP API calls. The system includes:

- **API Client**: Configurable HTTP client with authentication, retry logic, and error handling
- **API Services**: High-level service functions for all application features
- **React Hooks**: Custom hooks for easy API integration in components
- **Error Handling**: Comprehensive error management and user feedback
- **Loading States**: Built-in loading state management

## Environment Setup

### 1. Environment Variables

Update your `.env.local` file with variables:

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_API_RETRY_ATTEMPTS=3

# WebSocket Configuration (for real-time updates)
NEXT_PUBLIC_WS_URL=ws://localhost:8000

# File Upload Configuration
NEXT_PUBLIC_MAX_FILE_SIZE=10485760
NEXT_PUBLIC_ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp,application/pdf
```

For production, set these in your deployment platform's environment variables.

### 2. Backend API

The application expects a backend API with the following structure:

```
Base URL: http://localhost:8000/api

Authentication:
- POST /auth/login
- POST /auth/register
- POST /auth/refresh
- POST /auth/logout
- GET /auth/me

Users:
- GET /users
- GET /users/{id}
- PUT /users/{id}
- PUT /users/profile
- GET /users/profile

Jobs:
- GET /jobs
- GET /jobs/{id}
- POST /jobs
- PUT /jobs/{id}
- DELETE /jobs/{id}

Bids:
- GET /jobs/{id}/bids
- POST /bids
- PUT /bids/{id}
- DELETE /bids/{id}

Chat:
- GET /users/{id}/chat-threads
- GET /chat-threads/{id}
- POST /messages

Notifications:
- GET /users/{id}/notifications
- PUT /notifications/{id}/read

Wallet:
- GET /users/{id}/wallet
- GET /users/{id}/transactions
- POST /transactions

# ... and more (see apiService.ts for complete list)
```

## Usage Examples

### 1. Authentication

```typescript
import { useAuth } from '@/utils/apiHooks';

function LoginComponent() {
  const { user, loading, error, login, logout } = useAuth();

  const handleLogin = async () => {
    const result = await login('user@example.com', 'password');
    if (result.success) {
      // Login successful, user state is updated automatically
      console.log('Welcome!', user);
    } else {
      console.error('Login failed:', result.error);
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}
```

### 2. Fetching Data

```typescript
import { useJobs, useJob } from '@/utils/apiHooks';

function JobsList() {
  const { jobs, loading, error, refetch } = useJobs({
    status: ['pending', 'assigned'],
    role: 'pal',
    limit: 20
  });

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

function JobDetails({ jobId }: { jobId: string }) {
  const { job, loading, error } = useJob(jobId);

  if (loading) return <div>Loading job details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!job) return <div>Job not found</div>;

  return <JobDetailView job={job} />;
}
```

### 3. Creating/Updating Data

```typescript
import { useCreateJob, useUpdateJob } from '@/utils/apiHooks';

function CreateJobForm() {
  const { createJob, loading, error } = useCreateJob();

  const handleSubmit = async (formData: JobFormData) => {
    const result = await createJob({
      title: formData.title,
      description: formData.description,
      pickupLocation: formData.pickupLocation,
      dropoffLocation: formData.dropoffLocation,
      itemSize: formData.itemSize,
      value: formData.value,
      pickupDate: formData.pickupDate,
      // ... other fields
    });

    if (result.success) {
      // Job created successfully
      console.log('Job created:', result.job);
    } else {
      console.error('Failed to create job:', result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Job'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
```

### 4. Real-time Updates

```typescript
import { useRealTimeUpdates } from '@/utils/apiHooks';

function Dashboard() {
  const { connected, lastUpdate } = useRealTimeUpdates(user?.id);

  return (
    <div>
      <div className="status">
        Status: {connected ? '🟢 Connected' : '🔴 Disconnected'}
        {lastUpdate && ` • Last update: ${lastUpdate.toLocaleTimeString()}`}
      </div>
      {/* Dashboard content */}
    </div>
  );
}
```

### 5. Error Handling

```typescript
import { ErrorHandler } from '@/utils/errorHandling';

function SomeComponent() {
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const handleApiCall = async () => {
      try {
        await someApiCall();
      } catch (error) {
        if (error.status) {
          // API error
          const appError = ErrorHandler.handleApiError(error, {
            component: 'SomeComponent',
            action: 'fetchData'
          });
          setErrors(prev => [...prev, appError]);
        } else {
          // Network error
          const networkError = ErrorHandler.handleNetworkError({
            component: 'SomeComponent',
            action: 'fetchData'
          });
          setErrors(prev => [...prev, networkError]);
        }
      }
    };

    handleApiCall();
  }, []);

  return (
    <div>
      {errors.map(error => (
        <ErrorMessage
          key={error.id}
          error={error}
          onRetry={() => {
            ErrorHandler.resolveError(error.id);
            // Retry the operation
          }}
        />
      ))}
    </div>
  );
}
```

## API Service Methods

### Authentication
- `login(credentials)` - User login
- `register(userData)` - User registration
- `refreshToken(token)` - Refresh authentication token
- `logout()` - User logout
- `getCurrentUser()` - Get current user info

### Jobs
- `getJobs(params)` - Get jobs with filtering
- `getJobById(jobId)` - Get specific job
- `createJob(jobData)` - Create new job
- `updateJob(jobId, updates)` - Update job
- `deleteJob(jobId)` - Delete job
- `getUserJobs(userId, role, params)` - Get user's jobs

### Bids
- `createBid(bidData)` - Place bid on job
- `updateBid(bidId, updates)` - Update bid
- `deleteBid(bidId)` - Delete bid
- `acceptBid(jobId, bidId)` - Accept bid

### Chat & Messaging
- `getChatThreads(userId)` - Get user's chat threads
- `sendMessage(messageData)` - Send message
- `markThreadAsRead(threadId)` - Mark thread as read

### Notifications
- `getNotifications(userId)` - Get user notifications
- `markNotificationAsRead(notificationId)` - Mark as read
- `createNotification(data)` - Create notification

### Wallet & Transactions
- `getWalletBalance(userId)` - Get wallet balance
- `getTransactions(userId, params)` - Get transactions
- `createTransaction(data)` - Create transaction
- `withdrawFunds(data)` - Withdraw funds

## Migration from Mock Data

### Before (Mock Data)
```typescript
import { mockDeliveryJobs } from '@/data/mockData';

function JobsList() {
  const [jobs, setJobs] = useState(mockDeliveryJobs);

  // Component logic
}
```

### After (API Integration)
```typescript
import { useJobs } from '@/utils/apiHooks';

function JobsList() {
  const { jobs, loading, error, refetch } = useJobs({
    status: ['pending', 'assigned'],
    limit: 20
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={refetch} />;

  // Component logic with real data
}
```

## Development Setup

### 1. Install Dependencies
No additional dependencies are required as the system uses the native `fetch` API.

### 2. Start Backend API
Make sure your backend API is running on the configured URL (default: `http://localhost:8000`).

### 3. Test API Connection
```bash
# Test API health
curl http://localhost:8000/api/health

# Test authentication
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

### 4. Enable API Mode
In your components, replace mock data imports with API hooks:

```typescript
// Remove these imports:
// import { mockDeliveryJobs, mockUsers } from '@/data/mockData';

// Add these imports:
// import { useJobs, useUsers } from '@/utils/apiHooks';
```

## Production Deployment

### 1. Environment Variables
Set the following environment variables in your deployment platform:

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.your-domain.com/api
NEXT_PUBLIC_WS_URL=wss://api.your-domain.com
```

### 2. API Security
- Ensure HTTPS is enabled for production
- Implement proper CORS policies
- Use secure authentication tokens
- Implement rate limiting

### 3. Error Monitoring
- Set up error tracking (Sentry, LogRocket, etc.)
- Monitor API response times
- Track error rates and patterns

## Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check if backend API is running
   - Verify API_BASE_URL configuration
   - Check network connectivity

2. **Authentication Errors**
   - Verify token storage in localStorage
   - Check token expiration
   - Validate API credentials

3. **TypeScript Errors**
   - Ensure all API response types are properly defined
   - Check import paths for API utilities
   - Verify environment variable types

### Debug Mode
Enable debug logging by setting:
```typescript
// In development
console.log('API Debug:', { baseURL, headers, response });
```

## Contributing

When adding new API endpoints:

1. Add request/response types in `types/api.ts`
2. Add service methods in `utils/apiService.ts`
3. Add React hooks in `utils/apiHooks.ts`
4. Update this documentation
5. Add error handling for new endpoints

## Support

For API integration issues:
- Check the browser console for detailed error messages
- Verify backend API logs
- Review network requests in browser dev tools
- Test API endpoints directly using tools like Postman
