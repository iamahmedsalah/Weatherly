'use client'


// Framer motion 
import { motion } from 'framer-motion';

// Variants
import { fadeIn } from '../../variants'


const DownRight = () => {
    return (
        <motion.div className='absolute right-20 bottom-20 0 w-[200px] xl-w-[400px] '
        variants={fadeIn('left', 2.3)}
        initial='hidden'
        animate='show'
        exit='hidden'>
            <img
                src={'/rain.png'}
                width={260}
                height={200}
                alt='rainImg'
                priority='true'
                className='w-auto h-auto 
                transition-all duration-150 
                xl:w-[200px] md:w-[140px] sm:w-[100px]
                invisible lg:visible' />
        </motion.div>
    );
};

export default DownRight;