import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className='bg-white text-gray-400 dark:text-gray-200 dark:bg-[#D2E3FD] min-h-screen'>
        {children}
      </div>
    </div>
  );
}
