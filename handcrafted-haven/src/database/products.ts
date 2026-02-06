import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

export type DbProduct = {
  productid: number;
  name: string;
  description: string;
  price: string; // saw in the console
  imageurl: string;
  userid: number;
};

// UI shape (for ProductCard + pages)
export type UiProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string; // not in DB -> fallback
};

function toUiProduct(p: DbProduct): UiProduct {
  if (p.productid === undefined || p.productid === null) {
    throw new Error("DB product is missing productid");
  }

  const raw = (p.imageurl || "").trim();
  const normalized =
    !raw || raw === "/none"
      ? "/favicon.ico"
      : raw.startsWith("/")
        ? raw
        : `/${raw}`;

  return {
    id: String(p.productid),
    name: p.name ?? "",
    description: p.description ?? "",
    price: Number(p.price) || 0,
    imageUrl: normalized,
    category: "Handcrafted",
  };
}

export async function getUiProducts(): Promise<UiProduct[]> {
  const rows = await sql<
    DbProduct[]
  >`SELECT * FROM products ORDER BY productid;`;
  return rows.map(toUiProduct);
}

export async function getUiProductById(
  id: string | undefined,
): Promise<UiProduct | null> {
  if (!id) return null;

  const rows = await sql<DbProduct[]>`
    SELECT * FROM products WHERE productid = ${id}
  `;
  return rows[0] ? toUiProduct(rows[0]) : null;
}

