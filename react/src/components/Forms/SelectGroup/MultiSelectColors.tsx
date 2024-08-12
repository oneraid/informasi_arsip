// components/Forms/SelectGroup/MultiSelectColors.tsx

import React, { useState, useEffect, useRef } from 'react';

interface Option {
  value: string;
  text: string;
  selected: boolean;
  element?: HTMLElement;
}

interface MultiSelectColorsProps {
  id: string;
  onChange?: (selectedValues: string[]) => void;
}

const MultiSelectColors: React.FC<MultiSelectColorsProps> = ({
  id,
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
            selected: select.options[i].hasAttribute('selected'),
          });
        }
        setOptions(newOptions);
      }
    };

    loadOptions();
  }, [id]);

  const open = () => {
    setShow(true);
  };

  const select = (index: number, event: React.MouseEvent) => {
    const newOptions = [...options];
    if (!newOptions[index].selected) {
      newOptions[index].selected = true;
      newOptions[index].element = event.currentTarget as HTMLElement;
      setSelected([...selected, index]);
    } else {
      const selectedIndex = selected.indexOf(index);
      if (selectedIndex !== -1) {
        newOptions[index].selected = false;
        setSelected(selected.filter((i) => i !== index));
      }
    }
    setOptions(newOptions);
    if (onChange) {
      onChange(selected.map((i) => options[i].value));
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
        onChange(selected.map((i) => options[i].value));
      }
    }
  };

  const selectedValues = () => {
    return selected.map((option) => options[option].value);
  };

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (
        !show ||
        dropdownRef.current.contains(target as Node) ||
        trigger.current?.contains(target as Node)
      )
        return;
      setShow(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

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
              <div ref={trigger} onClick={open} className="w-full">
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
                          className="h-full w-full appearance-none bg-transparent p-1 text-sm placeholder-gray dark:placeholder-white"
                          readOnly
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {show && (
              <div
                ref={dropdownRef}
                className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded border border-stroke bg-white dark:border-strokedark dark:bg-boxdark"
              >
                <div className="p-2">
                  {options.map((option, index) => (
                    <div
                      key={index}
                      onClick={(event) => select(index, event)}
                      className={`relative flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 ${
                        option.selected ? 'bg-primary text-white' : ''
                      }`}
                    >
                      <span>{option.text}</span>
                      {option.selected && (
                        <svg
                          className="absolute right-2 h-4 w-4 fill-current text-primary"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7.629 12.787L4.218 9.377a1 1 0 0 1 1.414-1.414L8 10.207l8.914-8.914a1 1 0 0 1 1.414 1.414L9.629 12.787a1 1 0 0 1-1.414 0z" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSelectColors;
