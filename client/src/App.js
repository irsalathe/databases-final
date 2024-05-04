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
import GeneralSearchResultsPage from './pages/GeneralSearchResultsPage';

export const theme = createTheme({
    palette: {
      primary: indigo,
      secondary: amber,
    },
  });
// App is the root component of our application and as children contain all our pages
// We use React Router's BrowserRouter and Routes components to define the pages for
// our application, with each Route component representing a page and the common
// NavBar component allowing us to navigate between pages (with hyperlinks)
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
        <Route path="/general_search" element={<GeneralSearchResultsPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}