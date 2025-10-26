"use client"
import { AuthScreen } from '../../components/AuthScreen';
import { User } from '../../types';

export default function AuthPage() {
  const handleLogin = (user: User) => {
    // Store user in localStorage or context
    localStorage.setItem('prawnbox_user', JSON.stringify(user));

    // Redirect to home page or dashboard
    window.location.href = '/dashboard';
  };

  const handleDemoLogin = (userType: 'sender' | 'pal' | 'receiver' | 'proxy') => {
    // Create demo user based on type
    const demoUsers = {
      sender: {
        id: 'demo-sender',
        name: 'Demo Sender',
        email: 'sender@prawnbox.com',
        phone: '+234-801-234-5678',
        role: 'sender' as const,
        rating: 4.8,
        isVerified: true,
        walletBalance: 25000,
        totalDeliveries: 5,
        location: {
          address: 'Lagos, Nigeria',
          coordinates: {
            lat: 6.4474,
            lng: 3.3903
          }
        },
        preferences: {
          notifications: {
            push: true,
            email: true,
            sms: false
          },
          privacy: {
            shareLocation: false,
            shareProfile: false
          },
          delivery: {
            autoAcceptRadius: 5,
            //preferredVehicles: ['Car'] as VehicleType[]
          }
        }
      },
      pal: {
        id: 'demo-pal',
        name: 'Demo Pal',
        email: 'pal@prawnbox.com',
        phone: '+234-801-234-5678',
        role: 'pal' as const,
        rating: 4.9,
        isVerified: true,
        walletBalance: 15000,
        totalDeliveries: 12,
        vehicleType: 'Car',
        location: {
          address: 'Lagos, Nigeria',
          coordinates: {
            lat: 6.4474,
            lng: 3.3903
          }
        },
        preferences: {
          notifications: {
            push: true,
            email: true,
            sms: false
          },
          privacy: {
            shareLocation: false,
            shareProfile: false
          },
          delivery: {
            autoAcceptRadius: 5,
            //preferredVehicles: ['Car'] as VehicleType[]
          }
        }
      },
      receiver: {
        id: 'demo-receiver',
        name: 'Demo Receiver',
        email: 'receiver@prawnbox.com',
        phone: '+234-801-234-5678',
        role: 'receiver' as const,
        rating: 4.7,
        isVerified: true,
        walletBalance: 5000,
        totalDeliveries: 8,
        location: {
          address: 'Lagos, Nigeria',
          coordinates: {
            lat: 6.4474,
            lng: 3.3903
          }
        },
        preferences: {
          notifications: {
            push: true,
            email: true,
            sms: false
          },
          privacy: {
            shareLocation: false,
            shareProfile: false
          },
          delivery: {
            autoAcceptRadius: 5,
            //preferredVehicles: ['Car'] as VehicleType[]
          }
        }
      },
      proxy: {
        id: 'demo-proxy',
        name: 'Demo Proxy',
        email: 'proxy@prawnbox.com',
        phone: '+234-801-234-5678',
        role: 'proxy' as const,
        rating: 4.6,
        isVerified: true,
        walletBalance: 8000,
        totalDeliveries: 15,
        location: {
          address: 'Lagos, Nigeria',
          coordinates: {
            lat: 6.4474,
            lng: 3.3903
          }
        },
        preferences: {
          notifications: {
            push: true,
            email: true,
            sms: false
          },
          privacy: {
            shareLocation: false,
            shareProfile: false
          },
          delivery: {
            autoAcceptRadius: 5,
            //preferredVehicles: ['Car'] as VehicleType[]
          }
        }
      }
    };

    const demoUser = demoUsers[userType];
    handleLogin(demoUser as User);
  };

  return (
    <div className="min-h-screen">
      <AuthScreen
        onLogin={handleLogin}
        onDemoLogin={handleDemoLogin}
        onNavigate={(screen) => {
          // Handle navigation if needed
          console.log('Navigate to:', screen);
        }}
      />
    </div>
  );
}
