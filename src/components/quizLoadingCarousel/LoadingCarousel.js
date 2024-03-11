import React, { useState, useEffect } from "react";
import styled, { keyframes,css } from "styled-components";
import { useSpringCarousel } from "react-spring-carousel";
const LoadingCarousel = () => {
    
      const row = [
        "https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80",
        "https://images.unsplash.com/photo-1603512500383-f1f87c13ffc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlZHJvb218ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60",
        "https://images.unsplash.com/photo-1507812984078-917a274065be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWlycGxhbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60",
        "https://images.unsplash.com/photo-1617152683514-08cd8b3da14f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRyYW5zcG9ydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60",
        "https://images.unsplash.com/photo-1559734840-f9509ee5677f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
        "https://images.unsplash.com/photo-1577897113292-3b95936e5206?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1090&q=80",
      ];
    
      return (
        <AppContainer>
          <Wrapper>
            <Marquee>
              <MarqueeGroup2>
                {row.map((el,i) => (
                  <ImageGroup key={i}>
                    <Image src={el} />
                  </ImageGroup>
                ))}
              </MarqueeGroup2>
              <MarqueeGroup2>
                {row.map((el, i) => (
                  <ImageGroup key={i}>
                    <Image src={el} />
                  </ImageGroup>
                ))}
              </MarqueeGroup2>
            </Marquee>
          </Wrapper>
        </AppContainer>
      );
    }
export default LoadingCarousel;
const AppContainer = styled.div`
  overflow: hidden;  
  color: #000000;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;


const Marquee = styled.div`
  display: flex;
  width: 1200px;
  height:300px;
  overflow: hidden;
  user-select: none;

  mask-image: linear-gradient(
    to right,
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 1) 10%,
    hsl(0 0% 0% / 1) 90%,
    hsl(0 0% 0% / 0)
  );
`;

const scrollX = keyframes`
  from {
    left: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const common = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  white-space: nowrap;
  width: 140%;
  animation: ${scrollX} 30s linear infinite;
`;
const MarqueeGroup2 = styled.div`
  ${common}
  animation-direction: reverse;
  animation-delay: -3s;
`;

const ImageGroup = styled.div`
  display: grid;
  place-items: center;
  height:100%;
  width: clamp(10rem, 1rem + 80vmin, 80rem);
  padding: calc(clamp(5rem, 1rem + 10vmin, 10rem) / 10);
`;

const Image = styled.img`
  object-fit: cover;
  width: 150%;
  height: 100%;
  /* border: 1px solid black; */
  border-radius: 0.5rem;
  aspect-ratio: 16/9;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;