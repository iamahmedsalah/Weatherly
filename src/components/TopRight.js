'use client'

// Framer motion 
import { motion } from 'framer-motion';

// Variants
import { fadeIn } from '../../variants'


const TopRight = () => {
    return (
        <motion.div className='absolute right-20 top-20 0 w-[200px] xl-w-[400px] '
        variants={fadeIn('left',1.8)}
        initial='hidden'
        animate='show'
        exit='hidden'>
            <img
                src={'/winter.png'}
                width={260}
                height={200}
                alt='winterImg'
                priority='true'
                className='w-full h-full 
                transition-all duration-150 
                xl:w-[200px] md:w-[140px] sm:w-[100px]
                invisible lg:visible ' />
        </motion.div>
    );
};

export default TopRight;