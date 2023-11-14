import apiBase from '@/api';
import { ICONS_DIR } from '@/config/config';
import { useAuth } from '@/contexts';
import { FormEvent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Sidebar({
  navList,
  currentUrl,
}: // value,
// setValue,
{
  navList: Record<string, string[]>;
  currentUrl: string;
  // value: string;
  // setValue: (event: string) => void;
}) {
  const apiBaseError = apiBase().error();
  const { logout } = useAuth();

  const [isLtMd, setIsLtMd] = useState(window.innerWidth < 1024);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsLtMd(window.innerWidth < 1024);
    });
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await logout();
    } catch (error) {
      apiBaseError.set(error);
      if (apiBaseError.getMessage()) {
        // console.log(apiBaseError.message);
        // TODO: notification handle

        alert(apiBaseError.getMessage());
      }
    }
  };

  return (
    <>
      {isLtMd ? (
        <button onClick={toggleSidebar} className="absolute left-8 top-7 z-10">
          <img src="/assets/icons/burger.svg" className="overflow-hidden" />
        </button>
      ) : null}
      {(isLtMd && isSidebarOpen) || !isLtMd ? (
        <div
          className={`flex flex-col rounded-lg col-span-1 row-span-6 font-medium justify-between ${
            isLtMd
              ? 'fixed inset-y-0 left-0 z-10 w-fit pt-12 pb-4 pl-4 pr-8 bg-clr-background-base-one'
              : 'px-2 py-4 bg-clr-background-base-two'
          }`}
        >
          <div>
            <div
              className={`${
                isLtMd
                  ? 'fixed top-0 left-0 w-screen h-screen bg-clr-background-highlight-one bg-opacity-50 -z-10'
                  : ''
              }`}
            ></div>
            <div className="flex flex-col gap-2">
              {isLtMd ? (
                <button
                  onClick={toggleSidebar}
                  className="absolute right-4 top-4 z-10"
                >
                  <img
                    src="/assets/icons/close.svg"
                    className="overflow-hidden"
                  />
                </button>
              ) : null}
              {Object.entries(navList).map(
                ([url, [displayName, iconUrl]], index) => (
                  <Link
                    key={index}
                    to={url}
                    className={`flex justify-start gap-6 items-center cursor-pointer p-2 font-bold ${
                      currentUrl === url ? 'opacity-100' : 'opacity-70'
                    }`}
                    onClick={toggleSidebar}
                  >
                    <img src={iconUrl} className="overflow-hidden" />
                    <div>{displayName}</div>
                  </Link>
                ),
              )}
            </div>
          </div>
          <div>
            <div
              className="flex items-center gap-6 opacity-70 hover:opacity-100 cursor-pointer p-2"
              onClick={handleLogout}
            >
              <img src={ICONS_DIR + 'logout.svg'} alt="" />
              <p>Logout</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Sidebar;
