'use client'

// Framer motion 
import { motion } from 'framer-motion';

// Variants
import { fadeIn } from '../../variants'




const TopLeft = () => {
    return (
        <motion.div className='absolute left-20 top-20 w-[200px] '
            variants={fadeIn('right', 0.7)}
            initial='hidden'
            animate='show'
            exit='hidden'>
            <img
                src={'/thunderstorm.png'}
                width={260}
                height={200}
                alt='thunderstormImg'
                priority='true'
                className='w-auto h-auto 
                transition-all duration-150 
                xl:w-[200px] md:w-[140px] 
                invisible lg:visible '/>
        </motion.div>
    );
};

export default TopLeft;