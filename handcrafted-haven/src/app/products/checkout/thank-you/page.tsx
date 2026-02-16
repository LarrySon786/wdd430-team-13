import "../../cart/cart.css";
import Link from "next/link";

export default async  function ThankYouPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const params = await searchParams;

    const customerName = params.customerName as string;
    const street = params.street as string;
    const city = params.city as string;
    const state = params.state as string;
    const country = params.country as string;
    const zip = params.zip as string;

    return <>
        <main className="page">
                <header className="page__header">
                    <Link className="btn-link" href="/products">← Return to Products</Link>
                    <h1 className="page__title">Thank You</h1>
                    <p className="page__subtitle">Your purchase has been completed</p>
                </header>

        <div className="order-details-container">
            <h2 className="">Order Details</h2>

            <div className="">
            <p><strong>Customer Name:</strong> {customerName}</p>
            <p><strong>Street:</strong> {street}</p>
            <p><strong>City:</strong> {city}</p>
            <p><strong>State:</strong> {state}</p>
            <p><strong>Country:</strong> {country}</p>
            <p><strong>ZIP:</strong> {zip}</p>
            </div>
        </div>
        </main>
    </>
}


