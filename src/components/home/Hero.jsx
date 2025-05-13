"use client";
import React from 'react';
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";

function Hero(props) {
    return (
        <div 
            className="w-full h-full flex flex-col items-center justify-center text-center opacity-50"
            style={{
                backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/MainImage.jpeg')",
                backgroundSize: "100% auto",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed"
            }}
        >
            <SplitText
                text="Welcome to Afgunseen"
                className="text-6xl font-serif text-center"
                delay={150}
                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                easing="easeOutCubic"
                threshold={0.2}
                rootMargin="-50px"
                onLetterAnimationComplete={() => {
                    console.log('All letters animated!');
                }
                }
            />
        </div>
    );
}

export default Hero;
