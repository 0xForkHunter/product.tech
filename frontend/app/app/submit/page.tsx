"use client";

import { Flex } from "@/components/flex";
import ImageGallery from "@/components/gallery";
import { useCreateProductApi, useGetProductFromSlug } from "@/hooks/useProductApi";
import { useCreateProduct } from "@/hooks/useProductTechContract";
import { useCreateSafe } from "@/hooks/useSafe";
import { Avatar, Button, Input, Typography } from "@ensdomains/thorin";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

export default function SubmitPage() {
  const [value, setValue] = useState("");
  const createProductApi = useCreateProductApi();
  const [safe, setSafe] = useState<string>();
  const [slug, setSlug] = useState<string>();
  const { address } = useAccount();
  const { data: product, isLoading: isProductLoading } = useGetProductFromSlug(slug);
  const router = useRouter();
  const { executeTx, isLoading } = useCreateProduct(async () => {
    if (!safe) throw new Error("Safe not created");
    if (!slug) throw new Error("Invalid Product Hunt URL");
    if (!address) throw new Error("Wallet not connected");

    await createProductApi
      .mutateAsync({ safe_address: safe, slug: slug, submitter_address: address })
      .then(() => router.push("/app/product/" + slug));
  });

  const { createSafe, isLoading: isCreateSafeLoading } = useCreateSafe();

  const handleAddProduct = () => {
    if (!slug) {
      toast.error("Invalid Product Hunt URL");
      return;
    }
    if (!safe) {
      toast.error("Please create a safe first");
      return;
    }
    executeTx({ args: [safe as `0x${string}`, slug] });
  };

  const handleSetUrl = (url: string) => {
    setValue(url);
    const regex = /posts\/([^/?]+)/;
    const match = regex.exec(url);
    if (match) setSlug(match[1]);
    else toast.error("Invalid Product Hunt URL");
  };

  return (
    <Flex y yc xc gap3 style={{ padding: "16px" }}>
      <Typography fontVariant="headingTwo">Submit a product</Typography>
      <Flex y>{}</Flex>
      <Flex y yc gap3 fullwidth style={{ height: "100px" }}>
        <Input
          value={value}
          onChange={(e) => handleSetUrl(e.target.value)}
          label="Product hunt URL"
          placeholder="https://www.producthunt.com/posts/product-tech"
        />
      </Flex>
      {!product && isProductLoading && <CircularProgress />}
      {product && (
        <Flex y yc gap2 grow fullwidth>
          <Flex x gap1 yc>
            <div style={{ width: "50px", height: "50px" }}>
              <Avatar shape="circle" label="avatar" src={product.thumbnail_url} />
            </div>
            <Flex y>
              <Typography fontVariant="headingThree">{product.name}</Typography>
              {product.tagline && (
                <Typography color="textTertiary" weight="light" fontVariant="body">
                  {product.tagline}
                </Typography>
              )}
            </Flex>
          </Flex>
          <Typography weight="light" fontVariant="body">
            {product.description}
          </Typography>
          {/* <ImageGallery images={product.media} /> */}
          <Button disabled={isCreateSafeLoading || !!safe} onClick={() => createSafe().then((res) => setSafe(res))}>
            Create Safe
          </Button>
          <Button disabled={!slug || isLoading || !safe} onClick={handleAddProduct}>
            Submit
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
