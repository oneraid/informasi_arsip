import React, { useState, useEffect, useRef } from 'react';

interface Option {
  value: string;
  text: string;
  selected: boolean;
  element?: HTMLElement;
}

interface MultiSelectColorsProps {
  id: string;
  value: string[];
  onChange?: (selectedValues: string[]) => void;
}

const MultiSelectColors: React.FC<MultiSelectColorsProps> = ({
  id,
  value,
  onChange,
}) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadOptions = () => {
      const select = document.getElementById(id) as HTMLSelectElement | null;
      if (select) {
        const newOptions: Option[] = [];
        for (let i = 0; i < select.options.length; i++) {
          newOptions.push({
            value: select.options[i].value,
            text: select.options[i].innerText,
            selected: value.includes(select.options[i].value),
          });
        }
        setOptions(newOptions);
        setSelected(
          newOptions
            .map((option, index) => (option.selected ? index : -1))
            .filter((index) => index !== -1),
        );
      }
    };

    loadOptions();
  }, [id, value]);

  const toggleDropdown = () => {
    setShow((prevShow) => !prevShow);
  };

  const select = (index: number, event: React.MouseEvent) => {
    const newOptions = [...options];
    const isSelected = newOptions[index].selected;

    newOptions[index].selected = !isSelected;
    setOptions(newOptions);

    const newSelected = isSelected
      ? selected.filter((i) => i !== index)
      : [...selected, index];

    setSelected(newSelected);

    if (onChange) {
      const selectedValues = newOptions
        .filter((option) => option.selected)
        .map((option) => option.value);
      console.log('Colors selected:', selectedValues); // Debugging
      onChange(selectedValues);
    }
  };

  const remove = (index: number) => {
    const newOptions = [...options];
    const selectedIndex = selected.indexOf(index);

    if (selectedIndex !== -1) {
      newOptions[index].selected = false;
      setSelected(selected.filter((i) => i !== index));
      setOptions(newOptions);
      if (onChange) {
        const selectedValues = newOptions
          .filter((option) => option.selected)
          .map((option) => option.value);
        console.log('Colors selected after removal:', selectedValues); // Debugging
        onChange(selectedValues);
      }
    }
  };

  const selectedValues = () => {
    return selected.map((option) => options[option].value);
  };

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdownRef.current || !trigger.current) return;
      if (
        dropdownRef.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      ) {
        return;
      }
      setShow(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [show]);

  return (
    <div className="relative z-50">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Warna
      </label>
      <div>
        <select className="hidden" id={id}>
          <option value="M">Merah</option>
          <option value="P">Putih</option>
          <option value="H">Hijau</option>
          <option value="K">Kuning</option>
        </select>

        <div className="flex flex-col items-center">
          <input
            name="values"
            type="hidden"
            defaultValue={selectedValues().join(',')}
          />
          <div className="relative z-20 inline-block w-full">
            <div className="relative flex flex-col items-center">
              <div ref={trigger} onClick={toggleDropdown} className="w-full">
                <div className="mb-2 flex rounded border border-stroke py-2 pl-3 pr-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                  <div className="flex flex-auto flex-wrap gap-3">
                    {selected.map((index) => (
                      <div
                        key={index}
                        className="my-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray px-2.5 py-1.5 text-sm font-medium dark:border-strokedark dark:bg-white/30"
                      >
                        <div className="max-w-full flex-initial">
                          {options[index].text}
                        </div>
                        <div className="flex flex-auto flex-row-reverse">
                          <div
                            onClick={() => remove(index)}
                            className="cursor-pointer pl-2 hover:text-danger"
                          >
                            <svg
                              className="fill-current"
                              role="button"
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                    {selected.length === 0 && (
                      <div className="flex-1">
                        <input
                          placeholder="Select an option"
                          className="h-full w-full appearance-none bg-transparent p-1 px-2 outline-none"
                          defaultValue={selectedValues().join(',')}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex w-8 items-center py-1 pl-1 pr-1">
                    <button
                      type="button"
                      onClick={toggleDropdown}
                      className="h-6 w-6 cursor-pointer outline-none focus:outline-none"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill="currentColor"
                          ></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
                {show && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-full z-30 mt-1 w-full rounded border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-form-input"
                  >
                    <div className="overflow-y-auto max-h-40">
                      {options.map((option, index) => (
                        <div
                          key={index}
                          className={`cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-white ${
                            option.selected ? 'bg-primary text-white' : ''
                          }`}
                          onClick={(event) => select(index, event)}
                        >
                          {option.text}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSelectColors;
