// components/Forms/SelectGroup/SelectMonth.tsx

import React from 'react';

interface SelectMonthProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectMonth: React.FC<SelectMonthProps> = ({ value, onChange }) => {
  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">Bulan</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      >
        <option value="">Select Month</option>
        <option value="Januari">Januari</option>
        <option value="Februari">Februari</option>
        <option value="Maret">Maret</option>
        <option value="April">April</option>
        <option value="Mei">Mei</option>
        <option value="Juni">Juni</option>
        <option value="Juli">Juli</option>
        <option value="Agustus">Agustus</option>
        <option value="September">September</option>
        <option value="Oktober">Oktober</option>
        <option value="November">November</option>
        <option value="Desember">Desember</option>
      </select>
    </div>
  );
};

export default SelectMonth;
