"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/lib/actions";

type Props = {
  productId: number;
  userId: string;
};

export default function DeleteProductButton({ productId, userId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setLoading(true);
    const result = await deleteProduct(productId, userId);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.message);
    }
    setLoading(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      style={{
        flex: 1,
        padding: "0.5rem",
        border: "none",
        borderRadius: "6px",
        fontSize: "0.875rem",
        fontWeight: 600,
        cursor: loading ? "not-allowed" : "pointer",
        backgroundColor: "#fee2e2",
        color: "#b91c1c",
        transition: "background-color 0.2s",
      }}
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}