"use client";

import { Flex } from "@/components/flex";
import { useGetProductFromSlug } from "@/hooks/useProductApi";
import { Typography } from "@ensdomains/thorin";
import { CircularProgress, Divider } from "@mui/material";
import { Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import ImageGallery from "@/components/gallery";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { data } = useGetProductFromSlug(params.slug);
  if (!data)
    return (
      <Flex y grow yc xc>
        <CircularProgress />
      </Flex>
    );

  return (
    <Flex y style={{ padding: "16px" }} gap2>
      <ImageGallery images={data.media} />
      <Flex y>
        <Typography fontVariant="headingTwo">{data?.name}</Typography>
        {data.tagline && (
          <Typography color="textTertiary" weight="light" fontVariant="body">
            {data.tagline}
          </Typography>
        )}
      </Flex>
      <Typography weight="light" fontVariant="body">
        {data.description}
      </Typography>
      <Divider />
      <Typography>Holders</Typography>
    </Flex>
  );
}
