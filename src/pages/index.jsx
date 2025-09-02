import Layout from "./Layout.jsx";

import Home from "./Home";

import Canada from "./Canada";

import DevelopmentPrograms from "./DevelopmentPrograms";
import Register from "./Register";

// Admin components
import AdminLayout from "./admin/AdminLayout";
import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import Candidates from "./admin/Candidates";
import AdminPages from "./admin/Pages";
import Programs from "./admin/Programs";
import Coaches from "./admin/Coaches";
import Testimonials from "./admin/Testimonials";
import Locations from "./admin/Locations";
import Settings from "./admin/Settings";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    Canada: Canada,
    
    DevelopmentPrograms: DevelopmentPrograms,
    
    Register: Register,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="candidates" element={<Candidates />} />
                <Route path="pages" element={<AdminPages />} />
                <Route path="testimonials" element={<Testimonials />} />
                <Route path="locations" element={<Locations />} />
                <Route path="settings" element={<Settings />} />
                <Route path="programs" element={<Programs />} />
                <Route path="coaches" element={<Coaches />} />
            </Route>
            
            {/* Public Routes */}
            <Route path="/*" element={
                <Layout currentPageName={currentPage}>
                    <Routes>            
                        <Route path="/" element={<Home />} />
                        <Route path="/Home" element={<Home />} />
                        <Route path="/Canada" element={<Canada />} />
                        <Route path="/DevelopmentPrograms" element={<DevelopmentPrograms />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </Layout>
            } />
        </Routes>
    );
}

export default function AppPages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}