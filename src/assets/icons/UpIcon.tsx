import { motion } from 'framer-motion';

export const UpIcon = ({ width, height, fill = 'currentColor', ...props }: any) => {
  return (
    <motion.svg
      xmlns='http://www.w3.org/2000/svg'
      width={width || '16'}
      height={height || '16'}
      fill={fill}
      className='bi bi-cursor-fill'
      viewBox='0 0 16 16'
      {...props}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <path
        fillRule='evenodd'
        d='M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z'
      />
    </motion.svg>
  );
};
