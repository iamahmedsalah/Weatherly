'use client'



import { Particles } from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import React, { useCallback } from 'react';



const ParticlesContainer = ({ weatherCondition = 'default' }) => {

    // initail
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (engine) => { }, []);

    // Weather-based particle configurations
    const getParticleConfig = () => {
        switch (weatherCondition) {
            case 'rain':
                return {
                    color: '#4a9eff',
                    images: [
                        { src: 'https://cdn-icons-png.flaticon.com/512/427/427112.png' }, // raindrop
                    ],
                    speed: { min: 10, max: 20 },
                    direction: 'bottom',
                    straight: true,
                    number: 100,
                    size: { min: 5, max: 15 },
                };
            case 'snow':
                return {
                    color: '#ffffff',
                    images: [
                        { src: 'https://cdn-icons-png.flaticon.com/512/1146/1146899.png' }, // snowflake
                    ],
                    speed: { min: 2, max: 5 },
                    direction: 'bottom',
                    straight: false,
                    number: 80,
                    size: { min: 5, max: 20 },
                };
            case 'sunny':
                return {
                    color: '#ffd700',
                    images: [
                        { src: 'https://cdn-icons-png.flaticon.com/512/869/869869.png' }, // sun
                    ],
                    speed: { min: 1, max: 2 },
                    direction: 'none',
                    straight: false,
                    number: 30,
                    size: { min: 10, max: 30 },
                };
            case 'cloudy':
                return {
                    color: '#b0c4de',
                    images: [
                        { src: 'https://cdn-icons-png.flaticon.com/512/414/414927.png' }, // cloud
                    ],
                    speed: { min: 1, max: 3 },
                    direction: 'right',
                    straight: true,
                    number: 40,
                    size: { min: 20, max: 40 },
                };
            default:
                return {
                    color: '#e68e2e',
                    images: [
                        { src: 'https://cdn-icons-png.flaticon.com/512/642/642000.png' }, // sun
                        { src: 'https://cdn-icons-png.flaticon.com/512/1163/1163624.png' }, // cloud
                        { src: 'https://cdn-icons-png.flaticon.com/512/1779/1779940.png' }, // rain
                        { src: 'https://cdn-icons-png.flaticon.com/512/1163/1163634.png' }, // moon
                        { src: 'https://cdn-icons-png.flaticon.com/512/1779/1779927.png' }, // star
                        { src: 'https://cdn-icons-png.flaticon.com/512/2924/2924242.png' }, // umbrella
                        { src: 'https://cdn-icons-png.flaticon.com/512/1163/1163657.png' }, // storm
                        { src: 'https://cdn-icons-png.flaticon.com/512/1163/1163661.png' }, // lightning
                        { src: 'https://cdn-icons-png.flaticon.com/512/1779/1779912.png' }, // wind
                        { src: 'https://cdn-icons-png.flaticon.com/512/1163/1163641.png' }, // partly cloudy
                        { src: 'https://cdn-icons-png.flaticon.com/512/427/427112.png' }, // raindrop
                    ],
                    speed: { min: 3, max: 5 },
                    direction: 'bottom',
                    straight: true,
                    number: 100,
                    size: { min: 5, max: 30 },
                };
        }
    };

    const config = getParticleConfig();


    return <Particles
        className=' w-full h-full absolute translate -z-10 '
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
                    value: config.color,
                },
                links: {
                    enable: false,
                    color: ' #f5d393',
                    distance: 350,
                    opacity: 0.5,
                    width: 1,
                },
                move: {
                    direction: config.direction,
                    enable: true,
                    straight: config.straight,
                    speed: config.speed,
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: config.number,
                },
                opacity: {
                    value:{min: 0.5, max: 1},
                },
                shape: {
                    type: 'image',
                    image: config.images,
                },
                size: {
                    value: config.size,
                },
            },
            detectRetina: true,
        }} />
};

export default ParticlesContainer;