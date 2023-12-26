'use client'



import { Particles } from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import React, { useCallback } from 'react';



const ParticlesContainer = () => {

    // initail
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (engine) => { }, []);


    return <Particles
        className=' w-full h-full absolute translate -z-10 bg-black/10'
        id='tsparticles'
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
            fullScreen: { enable: false },
            background: {
                color: {
                    value: '',
                }
            },
            fps_limit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: false,
                        mode: 'push',
                    },
                    onHover: {
                        enable: false,
                        mode: 'repulse'
                    },
                    resize: true,
                },
                modes: {
                    push: {
                        quantity: 90
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: '#e68e2e',
                },
                links: {
                    enable: false,
                    color: ' #f5d393',
                    distance: 350,
                    opacity: 0.5,
                    width: 1,
                },
                move: {
                    direction: 'bottom',
                    enable: true,
                    straight: true,
                    speed:{min: 3, max: 5},
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: 80,
                },
                opacity: {
                    value:{min: 0.5, max: 1},
                },
                shape: {
                    type: 'image',
                    image: [{
                        src: 'https://cdn-icons-png.flaticon.com/512/1146/1146899.png',
                    },
                    {
                        src: 'https://cdn-icons-png.flaticon.com/512/427/427112.png'
                    },
                ],
                },
                size: {
                    value: { min: 3, max: 20 },
                },
            },
            detectRetina: true,
        }} />
};

export default ParticlesContainer;