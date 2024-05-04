import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material'
import { indigo, amber } from '@mui/material/colors'
import { createTheme } from "@mui/material/styles";

import BusinessInfoPage from './pages/BusinessInfoPage';
import BusinessReviewsPage from './pages/BusinessReviewsPage';
import BusinessTipsPage from './pages/BusinessTipsPage';
import HomePage from './pages/HomePage';
import TopBusinessesTipPage from './pages/TopBusinessesTipPage';
import CategorySearchForTipsPage from './pages/CategorySearchForTipsPage';
import ActiveUsers from './pages/ActiveUsers';
import UserPage from './pages/UserPage';
import GeneralSearchResultsPage from './pages/GeneralSearchResultsPage';
import BusinessRankedPostal from './pages/BusinessRankedPostal';
import SelectMinReviewForRanked from './pages/SelectMinReviewForRanked';
import GeneralSearchFilteredResultsPage from './pages/GeneralSearchFilteredResultPage';
// import NavBar from './components/NavBar';
// import HomePage from './pages/HomePage';
// import AlbumsPage from './pages/AlbumsPage';
// import SongsPage from './pages/SongsPage';
// import AlbumInfoPage from './pages/AlbumInfoPage'

// createTheme enables you to customize the look and feel of your app past the default
// in this case, we only change the color scheme

export const theme = createTheme({
    palette: {
      primary: indigo,
      secondary: amber,
    },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/business/:business_id" element={<BusinessInfoPage />} />
        <Route path="/business_reviews/:business_id" element={<BusinessReviewsPage />} />
        <Route path="/business_tips/:business_id" element={<BusinessTipsPage />} />
        <Route path="/select-category-for-tips" element={<CategorySearchForTipsPage />} />
        <Route path="/top_business_tips/:category" element={<TopBusinessesTipPage />} />
        <Route path="/active_users" element={<ActiveUsers />} /> 
       <Route path="/user/:userId" element={<UserPage />} />
        <Route path="/general_search" element={<GeneralSearchResultsPage />} />
        <Route path="/select-min-review-for-ranked" element={<SelectMinReviewForRanked />} />
        <Route path="/top_business_postal" element={<BusinessRankedPostal />} />
        <Route path="/search/businesses" element={<GeneralSearchFilteredResultsPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
