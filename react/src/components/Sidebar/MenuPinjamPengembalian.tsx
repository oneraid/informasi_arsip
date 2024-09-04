import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import { useAuth } from '../../contexts/AuthContext';

interface MenuPinjamKembali {
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
}

const MenuPinjamKembali: React.FC<MenuPinjamKembali> = ({
  sidebarExpanded,
  setSidebarExpanded,
}) => {
  const { pathname } = useLocation();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log('Authentication Status:', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <SidebarLinkGroup
      activeCondition={pathname === '/data' || pathname.includes('data')}
    >
      {(handleClick, open) => (
        <React.Fragment>
          <div
            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer`}
            onClick={(e) => {
              e.preventDefault();
              sidebarExpanded ? handleClick() : setSidebarExpanded(true);
            }}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {' '}
              <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />{' '}
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />{' '}
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />{' '}
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            Peminjaman
            <svg
              className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                open && 'rotate-180'
              }`}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                fill=""
              />
            </svg>
          </div>
          {/* <!-- Dropdown Menu Start --> */}
          <div
            className={`translate transform overflow-hidden ${
              !open && 'hidden'
            }`}
          >
            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
              <li>
                <NavLink
                  to="/peminjaman-arsip"
                  className={({ isActive }) =>
                    'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                    (isActive && '!text-white')
                  }
                >
                  Peminjaman
                </NavLink>
              </li>
              {isAuthenticated && (
                <>
                  <li>
                    <NavLink
                      to="/pengembalian-arsip"
                      className={({ isActive }) =>
                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                        (isActive ? '!text-white' : '')
                      }
                    >
                      Pengembalian
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/approval-arsip"
                      className={({ isActive }) =>
                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                        (isActive ? '!text-white' : '')
                      }
                    >
                      Approval
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          {/* <!-- Dropdown Menu End --> */}
        </React.Fragment>
      )}
    </SidebarLinkGroup>
  );
};

export default MenuPinjamKembali;
