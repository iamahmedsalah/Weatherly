'use client'


// Framer motion 
import { motion } from 'framer-motion';

// Variants
import { fadeIn } from '../../variants'


const DownLeft = () => {
    return (
        <motion.div className='absolute left-20 bottom-20 0 w-[200px] xl-w-[400px] '
        variants={fadeIn('right', 1.2)}
        initial='hidden'
        animate='show'
        exit='hidden'>
            <img
                src={'/cloudy.png'}
                width={260}
                height={200}
                alt='cloudImg'
                priority='true'
                className='w-auto h-auto 
                transition-all duration-150
                xl:w-[200px] md:w-[140px] sm:w-[100px] 
                invisible lg:visible' />
        </motion.div>
    );
};

export default DownLeft;