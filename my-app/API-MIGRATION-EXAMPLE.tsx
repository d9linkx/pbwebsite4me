// // Example: Converting from Mock Data to API Integration

// // BEFORE: Using Mock Data
// import { mockDeliveryJobs } from '@/data/mockData';

// function JobsList() {
//   const [jobs, setJobs] = useState(mockDeliveryJobs);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleRefresh = () => {
//     // Mock refresh - no actual API call
//     setJobs(mockDeliveryJobs);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       {jobs.map(job => (
//         <JobCard key={job.id} job={job} />
//       ))}
//       <button onClick={handleRefresh}>Refresh</button>
//     </div>
//   );
// }

// // AFTER: Using API Integration
// import { useJobs } from '@/utils/apiHooks';

// function JobsList() {
//   const { jobs, loading, error, refetch, pagination, total } = useJobs({
//     status: ['pending', 'assigned'],
//     role: 'pal',
//     limit: 20
//   });

//   if (loading) return <LoadingSpinner />;
//   if (error) return <ErrorMessage error={error} onRetry={refetch} />;

//   return (
//     <div>
//       <div className="jobs-header">
//         <h2>Available Jobs ({total})</h2>
//         <button onClick={refetch} disabled={loading}>
//           {loading ? 'Refreshing...' : 'Refresh'}
//         </button>
//       </div>

//       {pagination && (
//         <div className="pagination-info">
//           Page {pagination.page} of {pagination.totalPages} • {pagination.total} total jobs
//         </div>
//       )}

//       {jobs.length === 0 ? (
//         <div className="empty-state">
//           <p>No jobs available</p>
//         </div>
//       ) : (
//         <div className="jobs-grid">
//           {jobs.map(job => (
//             <JobCard key={job.id} job={job} onSelect={() => handleJobSelect(job)} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // API Integration Benefits:
// // ✅ Real-time data from server
// // ✅ Automatic loading states
// // ✅ Built-in error handling and retry
// // ✅ Pagination support
// // ✅ Caching and performance optimization
// // ✅ Type safety with TypeScript
// // ✅ Consistent error handling across the app
// // ✅ Easy to test and mock for development

// // Migration Steps:
// // 1. Replace mock data imports with API hooks
// // 2. Update component props and state management
// // 3. Add loading and error states
// // 4. Implement retry functionality
// // 5. Add pagination if needed
// // 6. Update tests to use API mocks
