import React from 'react';

interface SelectBidangProps {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectBidang: React.FC<SelectBidangProps> = ({ onChange }) => {
  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">Bidang</label>
      <select
        onChange={onChange}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      >
        <option value="" disabled>
          Select Bidang
        </option>
        <option value="keuangan">Keuangan</option>
        <option value="tatausaha">Tata Usaha</option>
      </select>
    </div>
  );
};

export default SelectBidang;
