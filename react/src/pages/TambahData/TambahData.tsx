import React, { useState } from 'react';
import { createKeuangan, createTataUsaha } from '../../services/api';
import { Keuangan, TataUsaha } from '../../types/arsip';
import SelectBidang from '../../components/Forms/SelectGroup/SelectBidang';
import SelectMonth from '../../components/Forms/SelectGroup/SelectMonth';
import MultiSelectColors from '../../components/Forms/SelectGroup/MultiSelectColors';

type FormData = Keuangan | TataUsaha;

const TambahData: React.FC = () => {
  const [formType, setFormType] = useState<'keuangan' | 'tatausaha'>(
    'keuangan',
  );
  const [formData, setFormData] = useState<FormData>({
    no_rak: '',
    no_box: '',
    jenis_arsip: '',
    no_arsip: '',
    bulan: '',
    tahun: '',
    warna: '',
    jumlah_folder: '',
    status: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, bulan: e.target.value });
  };

  const handleFormTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormType(e.target.value as 'keuangan' | 'tatausaha');
    // Reset form data when form type changes
    setFormData({
      no_rak: '',
      no_box: '',
      jenis_arsip: '',
      no_arsip: '',
      bulan: '',
      tahun: '',
      warna: '',
      jumlah_folder: '',
      status: '',
    });
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formType === 'keuangan') {
        await createKeuangan(formData as Keuangan);
      } else {
        await createTataUsaha(formData as TataUsaha);
      }
      setSuccess(
        `${
          formType.charAt(0).toUpperCase() + formType.slice(1)
        } entry created successfully!`,
      );
      setFormData({
        no_rak: '',
        no_box: '',
        jenis_arsip: '',
        no_arsip: '',
        bulan: '',
        tahun: '',
        warna: '',
        jumlah_folder: '',
        status: '',
      });
      setError(null);
    } catch (err) {
      setError(`Failed to create ${formType}.`);
      setSuccess(null);
    }
  };

  const handleColorChange = (selectedValues: string[]) => {
    setFormData({ ...formData, warna: selectedValues.join(',') });
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Tambah Arsip Inaktif Bidang{' '}
            {formType.charAt(0).toUpperCase() + formType.slice(1)}{' '}
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6.5">
          <div className="mb-4.5">
            <SelectBidang onChange={handleFormTypeChange} />
          </div>

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
              id="color-select"
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
            <input
              name="status"
              value={formData.status}
              onChange={handleChange}
              placeholder="Status"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          {/* {formType === 'tatausaha' && (
            <>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Status
                </label>
                <input
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  placeholder="Status"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>
            </>
          )} */}

          <button
            type="submit"
            className="w-full rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          >
            Create
          </button>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default TambahData;
