import React, { useRef, useState } from "react";
import { Flex } from "./flex";
import { Button, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const ImageGallery = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageContainerRef = useRef<HTMLDivElement>(null);

  const goToPrevious = () => {
    if (!imageContainerRef.current) return;
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      imageContainerRef.current.scrollLeft -= imageContainerRef.current.clientWidth;
    }
  };

  const goToNext = () => {
    if (!imageContainerRef.current) return;
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
      imageContainerRef.current.scrollLeft += imageContainerRef.current.clientWidth;
    }
  };

  return (
    <Flex grow style={{ position: "relative", overflowY: "auto" }}>
      {images.length > 0 && (
        <Flex x grow gap1 ref={imageContainerRef}>
          <Button variant="text" onClick={goToPrevious} style={{ position: "absolute", left: 0 }}>
            <ArrowBack />
          </Button>
          {images.map((image) => (
            <img
              key={image}
              src={image}
              alt={`Slide ${currentIndex}`}
              style={{ maxWidth: "80%", maxHeight: "500px" }}
            />
          ))}
          <Button variant="text" onClick={goToNext} style={{ position: "absolute", right: 0 }}>
            <ArrowForward />
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default ImageGallery;
