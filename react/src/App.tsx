import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Chart from './pages/Chart';
import Dashboard from './pages/Dashboard/Dashboard';
import Settings from './pages/Settings';
import DefaultLayout from './layout/DefaultLayout';
import Keuangan from './pages/DataArsip/Keuangan';
import TataUsaha from './pages/DataArsip/TataUsaha';
import TambahData from './pages/TambahData/TambahData';
import UpdateArsip from './pages/UpdateData/UpdateArsip';
import Peminjaman from './pages/PeminjamanPengembalian/Peminjaman';
import Aprroval from './pages/PeminjamanPengembalian/Aprroval';
import Pengembalian from './pages/PeminjamanPengembalian/Pengembalian';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        {/* Routes that do not require authentication */}
        <Route
          index
          element={
            <>
              <PageTitle title="Dashboard | Bakorwil I Kota Madiun" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/update-arsip/:id"
          element={
            <>
              <PageTitle title="Update Data | Bakorwil I Kota Madiun" />
              <UpdateArsip />
            </>
          }
        />
        <Route
          path="/data/keuangan"
          element={
            <>
              <PageTitle title="Keuangan | Bakorwil I Kota Madiun" />
              <Keuangan />
            </>
          }
        />
        <Route
          path="/data/tata-usaha"
          element={
            <>
              <PageTitle title="Tata Usaha | Bakorwil I Kota Madiun" />
              <TataUsaha />
            </>
          }
        />
        <Route
          path="/peminjaman-arsip"
          element={
            <>
              <PageTitle title="Peminjaman | Bakorwil I Kota Madiun" />
              <Peminjaman />
            </>
          }
        />
        <Route
          path="/pengembalian-arsip"
          element={
            <>
              <PageTitle title="Pengembalian | Bakorwil I Kota Madiun" />
              <Pengembalian />
            </>
          }
        />
        <Route
          path="/approval-arsip"
          element={
            <>
              <PageTitle title="Approval | Bakorwil I Kota Madiun" />
              <Aprroval />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />

        {/* Protected Route for /tambah-data */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/tambah-data"
            element={
              <>
                <PageTitle title="Tambah data | Bakorwil I Kota Madiun" />
                <TambahData />
              </>
            }
          />
        </Route>
      </Routes>
    </DefaultLayout>
  );
}

export default App;
