"use client";

import { CreateSafe } from "@/components/create-safe";
import { Flex } from "@/components/flex";
import { useCreateProduct } from "@/hooks/useProductTechContract";
import { Button, Input } from "@ensdomains/thorin";
import { useState } from "react";

export default function SubmitPage() {
  const [value, setValue] = useState("");
  const { executeTx } = useCreateProduct();
  const [safe, setSafe] = useState<string>();

  return (
    <Flex grow y yc xc gap3>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label="Product hunt URL"
        placeholder="https://www.producthunt.com/posts/product-tech"
      />
      <CreateSafe setSafe={setSafe} />
      <Button onClick={() => safe && executeTx()}>Submit</Button>
    </Flex>
  );
}
