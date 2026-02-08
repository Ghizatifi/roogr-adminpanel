import { Link } from 'react-router-dom';
import useColorMode from '../../hooks/useColorMode';
const sun = '/logo/sun.svg';
const moon = '/logo/moon.svg';
const logoLight = '../../../logo/logoLight.png';
const logoDark = '../../../logo/logoDark.png';
const DarkModeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <div className="flex items-center gap-2 2xsm:gap-4">
    <Link to={`/`}>
            <img
              src={colorMode === 'light' ? logoLight : logoDark}
              width={100}
              height={100}
              alt="logo"
            />
          </Link>
    <li role="button" className={`relative m-0 block h-7.5 w-14`}>
      <span
        onClick={() => {
          if (typeof setColorMode === 'function') {
            setColorMode(colorMode === 'light' ? 'dark' : 'light');
          }
        }}
        className={`absolute top-1/2 left-[3px] flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center
            rounded-full`}
      >
        <span className="dark:hidden">
          <img src={moon} alt="dark mode" />
        </span>
        <span className="hidden dark:inline-block">
          <img src={sun} alt="light mode" />
        </span>
      </span>
    </li>
    </div>
  );
};

export default DarkModeSwitcher;
