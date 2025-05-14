import { Switch, Route } from "wouter"; // 'wouter' uses Switch and Route
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import DatasetPage from "@/pages/DatasetPage";
import OrganizationPage from "@/pages/OrganizationPage";
import DataCatalogPage from "@/pages/DataCatalogPage";
import UploadDatasetPage from "@/pages/UploadDatasetPage";

import Header from "@/components/layout/Header";
import CreateUserPage from "@/pages/CreateUserPage";
import ApiDataPage from "@/pages/ApiDataPage";
import ImageGallery from "@/pages/ImageGallery"; // Add ImageGallery import

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Switch>
          {/* Basic routes */}
          <Route path="/" component={HomePage} />
          <Route path="/datasets/:id" component={DatasetPage} />
          <Route path="/organizations/:id" component={OrganizationPage} />
          <Route path="/data-catalog" component={DataCatalogPage} />
      

            {/* Added ApiDataPage route */}
            <Route path="/api-data" component={ApiDataPage} />

          {/* Image Gallery route */}
          <Route path="/gallery" component={ImageGallery} /> {/* Add this line */}

          {/* Protected routes */}
          <Route path="/upload-dataset" component={UploadDatasetPage}></Route>

         
           


          <Route path="/create-user" component={CreateUserPage}></Route>

        

          {/* Fallback 404 route */}
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
   
        <Router />
        <Toaster />
    
    </QueryClientProvider>
  );
}

export default App;
