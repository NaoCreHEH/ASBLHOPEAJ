import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

import { HelmetProvider } from "react-helmet-async";
import Login from "./pages/Login";
import Mission from "./pages/Mission";
import Services from "./pages/Services";
import Projets from "./pages/Projets";
import About from "./pages/About";
import Contact from "./pages/Contact";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminServices from "./pages/admin/AdminServices";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import Testimonials from "./pages/Testimonials";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminNewsletter from "./pages/admin/AdminNewsletter";
import AdminResources from "./pages/admin/AdminResources";
import AdminDonations from "./pages/admin/AdminDonations";
import Resources from "./pages/Resources";
import Donate from "./pages/Donate";
import DonateSuccess from "./pages/DonateSuccess";
import Events from "./pages/Events";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminEventRegistrations from "./pages/admin/AdminEventRegistrations";

function Router() {
  return (
     <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/login"} component={Login} />
      <Route path={"/mission"} component={Mission} />
      <Route path={"/services"} component={Services} />
      <Route path={"/projets"} component={Projets} />
      <Route path={"/a-propos"} component={About} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/temoignages"} component={Testimonials} />
      <Route path={"/ressources"} component={Resources} />
      <Route path={"/faire-un-don"} component={Donate} />
      <Route path={"/don-reussi"} component={DonateSuccess} />
      <Route path={"/evenements"} component={Events} />

      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/admin/services"} component={AdminServices} />
      <Route path={"/admin/projets"} component={AdminProjects} />
      <Route path={"/admin/equipe"} component={AdminTeam} />
      <Route path={"/admin/messages"} component={AdminMessages} />
      <Route path={"/admin/temoignages"} component={AdminTestimonials} />
      <Route path={"/admin/galerie"} component={AdminGallery} />
      <Route path={"/admin/newsletter"} component={AdminNewsletter} />
      <Route path={"/admin/ressources"} component={AdminResources} />
      <Route path={"/admin/dons"} component={AdminDonations} />
      <Route path={"/admin/evenements"} component={AdminEvents} />
      <Route path={"/admin/reservations"} component={AdminEventRegistrations} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;