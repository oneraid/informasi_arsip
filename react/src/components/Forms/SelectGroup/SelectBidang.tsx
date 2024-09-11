// components/Forms/SelectGroup/SelectMonth.tsx

import React from 'react';

interface SelectBidangProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectMonth: React.FC<SelectBidangProps> = ({ value, onChange }) => {
  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">Bidang</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      >
        <option value="">Select Bidang</option>
        <option value="Keuangan">Keuangan</option>
        <option value="Tata Usaha">Tata Usaha</option>
        <option value="Susunan Program">Susunan Program</option>
        <option value="Pembangunan Ekonomi">Pembangunan Ekonomi</option>
        <option value="Pemerintahan">Pemerintahan</option>
        <option value="Sarana Prasarana">Sarana Prasarana</option>
        <option value="Kemasyarakatan">Kemasyarakatan</option>
      </select>
    </div>
  );
};

export default SelectMonth;
