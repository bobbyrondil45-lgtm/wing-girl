import { Switch, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Browse from "@/pages/browse";
import ProfileDetail from "@/pages/profile-detail";
import Matches from "@/pages/matches";
import Rewards from "@/pages/rewards";
import MyProfile from "@/pages/my-profile";

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/browse" component={Browse} />
      <Route path="/profile/:id" component={ProfileDetail} />
      <Route path="/matches" component={Matches} />
      <Route path="/rewards" component={Rewards} />
      <Route path="/me" component={MyProfile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router hook={useHashLocation}>
          <AppRouter />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
