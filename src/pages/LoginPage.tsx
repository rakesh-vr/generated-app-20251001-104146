import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/auth';
import { useWorkoutStore } from '@/store/workout';
import { Toaster, toast } from 'sonner';
import { api } from '@/lib/api-client';
import type { UserData } from '@shared/types';
export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const setProgress = useWorkoutStore((state) => state.setProgress);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('demo@ironpath.com');
  const [password, setPassword] = useState('password');
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock password check, real logic is backend user creation/lookup
    if (password !== 'password') {
      toast.error('Invalid password.');
      setIsLoading(false);
      return;
    }
    try {
      const userData = await api<UserData>('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, name: 'Demo User' }), // Name is hardcoded for demo
      });
      login({ id: userData.id, name: userData.name, email: userData.email });
      setProgress({
        completedWorkouts: userData.completedWorkouts,
        totalCalories: userData.totalCalories,
      });
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during login.');
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Toaster richColors theme="dark" />
      <div className="absolute inset-0 bg-gradient-to-br from-background to-primary/10 -z-10" />
      <Card className="w-full max-w-sm animate-fade-in shadow-2xl shadow-primary/10">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Dumbbell className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold font-display text-foreground">IronPath</h1>
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access your workout plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign In'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">Use <span className="font-mono text-foreground/80">demo@ironpath.com</span> and any <span className="font-mono text-foreground/80">password</span> to log in.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}