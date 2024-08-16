import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTataUsahaById, updateTataUsaha } from '../../services/api';
import { TataUsaha } from '../../types/arsip';
import SelectMonth from '../../components/Forms/SelectGroup/SelectMonth';
import MultiSelectColors from '../../components/Forms/SelectGroup/MultiSelectColors';

const UpdateTataUsaha: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TataUsaha>({
    id: undefined,
    no_rak: '',
    no_box: '',
    jenis_arsip: '',
    no_arsip: '',
    bulan: '',
    tahun: '',
    jumlah_folder: '',
    warna: '',
    status: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchTataUsaha = async () => {
      try {
        if (id) {
          const response = await getTataUsahaById(parseInt(id));
          setFormData(response.data);
        }
      } catch (error) {
        setError('Error fetching tata usaha data');
        console.error('Error fetching tata usaha data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTataUsaha();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, bulan: e.target.value });
  };

  const handleColorChange = (selectedValues: string[]) => {
    setFormData({ ...formData, warna: selectedValues.join(',') });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateTataUsaha(parseInt(id!), formData);
      setSuccess('Tata Usaha entry updated successfully!');
      navigate('/tatausaha');
    } catch (error) {
      setError('Error updating tata usaha');
      console.error('Error updating tata usaha', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Update Arsip Inaktif Bidang Tata Usaha
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                No Rak
              </label>
              <input
                name="no_rak"
                value={formData.no_rak}
                onChange={handleChange}
                placeholder="Isi nomor rak"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                No Box
              </label>
              <input
                name="no_box"
                value={formData.no_box}
                onChange={handleChange}
                placeholder="Isi nomor box"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Jenis Arsip
            </label>
            <input
              name="jenis_arsip"
              value={formData.jenis_arsip}
              onChange={handleChange}
              placeholder="Jenis arsip"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              No Arsip
            </label>
            <input
              name="no_arsip"
              value={formData.no_arsip}
              onChange={handleChange}
              placeholder="Nomor arsip"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          <div className="mb-4.5">
            <SelectMonth value={formData.bulan} onChange={handleMonthChange} />
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Tahun
            </label>
            <input
              name="tahun"
              value={formData.tahun}
              onChange={handleChange}
              placeholder="Tahun"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          <div className="mb-4.5">
            <MultiSelectColors
              id="warna"
              value={formData.warna.split(',')}
              onChange={handleColorChange}
            />
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Jumlah Folder
            </label>
            <input
              name="jumlah_folder"
              value={formData.jumlah_folder}
              onChange={handleChange}
              placeholder="Jumlah folder"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="tersedia">Tersedia</option>
              <option value="tidak tersedia">Tidak Tersedia</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          >
            Update
          </button>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default UpdateTataUsaha;
