"use client";

import { useActionState, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addProduct, ProductState } from "@/lib/actions";
import styles from "../../(auth)/auth.module.css";
import dashStyles from "../dashboard/dashboard.module.css";

const initialState: ProductState = {
	success: false,
	message: "",
};

export default function AddProductPage() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [state, formAction, pending] = useActionState(addProduct, initialState);

	// Image upload state
	const [imageUrl, setImageUrl] = useState("");
	const [uploading, setUploading] = useState(false);
	const [uploadError, setUploadError] = useState("");
	const [previewUrl, setPreviewUrl] = useState("");

	// Handle file upload
	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Validate file type
		const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
		if (!allowedTypes.includes(file.type)) {
			setUploadError(
				"Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.",
			);
			return;
		}

		// Validate file size (max 5MB)
		if (file.size > 5 * 1024 * 1024) {
			setUploadError("File too large. Maximum size is 5MB.");
			return;
		}

		setUploadError("");
		setUploading(true);

		try {
			const formData = new FormData();
			formData.append("file", file);

			const response = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to upload file");
			}

			setImageUrl(data.path);
			setPreviewUrl(data.path);
		} catch (error) {
			console.error("Upload error:", error);
			setUploadError(
				error instanceof Error ? error.message : "Failed to upload file",
			);
		} finally {
			setUploading(false);
		}
	};

	// Handle URL input change
	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setImageUrl(e.target.value);
		setPreviewUrl(e.target.value);
		setUploadError("");
	};

	// Redirect if not logged in
	if (status === "unauthenticated") {
		router.push("/login");
		return null;
	}

	if (status === "loading") {
		return (
			<main className={styles.authPage}>
				<p>Loading...</p>
			</main>
		);
	}

	return (
		<main className={styles.authPage}>
			<div className={styles.authContainer} style={{ maxWidth: "500px" }}>
				<Link
					href="/seller/dashboard"
					style={{
						display: "inline-block",
						marginBottom: "1rem",
						color: "var(--terracotta)",
					}}
				>
					← Back to Dashboard
				</Link>

				<h1>Add New Product</h1>
				<p className={styles.subtitle}>List a new handcrafted item for sale</p>

				{state.message && (
					<div
						className={
							state.success ? styles.successMessage : styles.errorMessage
						}
					>
						{state.message}
					</div>
				)}

				{state.success ? (
					<div style={{ textAlign: "center", marginTop: "1rem" }}>
						<Link href="/seller/dashboard" className={dashStyles.addProductBtn}>
							View Dashboard
						</Link>
					</div>
				) : (
					<form action={formAction} className={styles.authForm}>
						{/* Hidden field for user ID */}
						<input
							type="hidden"
							name="userId"
							value={session?.user?.id || ""}
						/>

						<div className={styles.formGroup}>
							<label htmlFor="name">Product Name</label>
							<input
								type="text"
								id="name"
								name="name"
								placeholder="e.g., Handwoven Basket"
								required
							/>
						</div>

						<div className={styles.formGroup}>
							<label htmlFor="description">Description</label>
							<textarea
								id="description"
								name="description"
								placeholder="Describe your handcrafted item..."
								rows={4}
								required
								style={{
									padding: "0.875rem",
									border: "2px solid var(--sage)",
									borderRadius: "8px",
									fontSize: "1rem",
									fontFamily: "inherit",
									color: "var(--brown)",
									backgroundColor: "var(--cream)",
									resize: "vertical",
								}}
							/>
						</div>

						<div className={styles.formGroup}>
							<label htmlFor="price">Price ($)</label>
							<input
								type="number"
								id="price"
								name="price"
								placeholder="29.99"
								min="0.01"
								step="0.01"
								required
							/>
						</div>

						<div className={styles.formGroup}>
							<label htmlFor="image">Product Image (optional)</label>

							{/* File upload input */}
							<input
								type="file"
								id="image"
								name="image"
								accept="image/jpeg,image/png,image/webp,image/gif"
								onChange={handleFileUpload}
								disabled={uploading}
								style={{
									marginBottom: "0.5rem",
									padding: "0.5rem",
									border: "2px solid var(--sage)",
									borderRadius: "8px",
									width: "100%",
									backgroundColor: "var(--cream)",
								}}
							/>

							{uploading && (
								<p style={{ color: "var(--sage)" }}>Uploading...</p>
							)}

							{uploadError && <p style={{ color: "#e53e3e" }}>{uploadError}</p>}

							{/* Image preview */}
							{previewUrl && (
								<div style={{ marginTop: "0.5rem" }}>
									<p
										style={{
											fontSize: "0.875rem",
											color: "var(--brown)",
											marginBottom: "0.25rem",
										}}
									>
										Preview:
									</p>
									<img
										src={previewUrl}
										alt="Preview"
										style={{
											maxWidth: "200px",
											maxHeight: "200px",
											objectFit: "cover",
											borderRadius: "8px",
											border: "2px solid var(--sage)",
										}}
									/>
								</div>
							)}

							{/* URL input as fallback */}
							<div style={{ marginTop: "1rem" }}>
								<label htmlFor="imageUrl">Or enter Image URL:</label>
								<input
									type="text"
									id="imageUrl"
									name="imageUrl"
									value={imageUrl}
									onChange={handleUrlChange}
									placeholder="/images/my-product.jpg"
								/>
								<small style={{ color: "var(--brown)", opacity: 0.6 }}>
									Leave blank to use default image
								</small>
							</div>

							{/* Hidden field to pass the image URL to the form action */}
							<input type="hidden" name="imageUrl" value={imageUrl} />
						</div>

						<button
							type="submit"
							className={styles.submitBtn}
							disabled={pending}
						>
							{pending ? "Adding Product..." : "Add Product"}
						</button>
					</form>
				)}
			</div>
		</main>
	);
}
