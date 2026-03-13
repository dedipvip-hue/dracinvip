/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import Detail from './pages/Detail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="detail/:id" element={<Detail />} />
          {/* Add placeholders for other routes */}
          <Route path="latest" element={<Home />} />
          <Route path="vip" element={<Home />} />
          <Route path="profile" element={<div className="p-8 text-center">Profile Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
