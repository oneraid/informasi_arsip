import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getKeuanganById, updateKeuangan } from '../../services/api';
import SelectBidang from '../../components/Forms/SelectGroup/SelectBidang';
import SelectMonth from '../../components/Forms/SelectGroup/SelectMonth';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import MultiSelectColors from '../../components/Forms/SelectGroup/MultiSelectColors';
import { Keuangan } from '../../types/arsip';

const UpdateData = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<Partial<Keuangan>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKeuanganData = async () => {
      try {
        if (id) {
          const response = await getKeuanganById(parseInt(id));
          setFormData(response.data);
        }
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKeuanganData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateKeuangan(parseInt(id), formData);
        alert('Data updated successfully!');
      }
    } catch (error) {
      console.error('Error updating data:', error);
      setError('Failed to update data');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Breadcrumb pageName="Update Arsip Inaktif" />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Update Arsip Inaktif
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <SelectBidang />
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    No. Rak
                  </label>
                  <input
                    type="text"
                    name="no_rak"
                    value={formData.no_rak || ''}
                    onChange={handleChange}
                    placeholder="Isi nomer rak"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    No. Box
                  </label>
                  <input
                    type="text"
                    name="no_box"
                    value={formData.no_box || ''}
                    onChange={handleChange}
                    placeholder="Isi nomer box"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Jenis Arsip
                </label>
                <input
                  type="text"
                  name="jenis_arsip"
                  value={formData.jenis_arsip || ''}
                  onChange={handleChange}
                  placeholder="Isi jenis arsip"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Nomer Arsip
                </label>
                <input
                  type="text"
                  name="no_arsip"
                  value={formData.no_arsip || ''}
                  onChange={handleChange}
                  placeholder="Isi nomer arsip"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <SelectMonth />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tahun
                  </label>
                  <input
                    type="text"
                    name="tahun"
                    value={formData.tahun || ''}
                    onChange={handleChange}
                    placeholder="Isi tahun"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <MultiSelectColors id="multiSelect" />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Jumlah
                  </label>
                  <input
                    type="text"
                    name="jumlah_folder"
                    value={formData.jumlah_folder || ''}
                    onChange={handleChange}
                    placeholder="Isi jumlah folder"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateData;
