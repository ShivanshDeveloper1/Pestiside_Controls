"use client";

import { useState, useEffect, type SVGProps, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ReviewItem {
  _id: string;
  name: string;
  email?: string;
  area: string;
  rating: number;
  quote: string;
  avatar?: string;
  createdAt?: string;
}

function StarIcon({ filled, ...props }: SVGProps<SVGSVGElement> & { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
      {...props}
    >
      <path d="M10 1.8l2.47 5.24 5.68.62-4.24 3.94 1.2 5.6L10 14.4l-5.11 2.8 1.2-5.6L1.85 7.66l5.68-.62L10 1.8Z" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5 text-brand-red" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} filled={i < rating} className="h-4 w-4" aria-hidden="true" />
      ))}
    </div>
  );
}

function InteractiveStarRating({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (val: number) => void;
}) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center gap-1 text-brand-red">
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={index}
            type="button"
            className="p-1 focus:outline-none focus:ring-2 focus:ring-brand-purple-strong rounded"
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <StarIcon
              filled={starValue <= (hoverRating || rating)}
              className="h-6 w-6 cursor-pointer transition-transform hover:scale-110"
            />
          </button>
        );
      })}
    </div>
  );
}

// Client-side image compression helper
const compressImage = (file: File, maxWidth = 200, maxHeight = 200, quality = 0.75): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Reviews() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    area: "",
    rating: 5,
    quote: "",
    avatar: "",
  });

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/reviews");
      const json = await res.json();
      if (json.success) {
        setReviews(json.data);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedBase64 = await compressImage(file, 200, 200, 0.8);
        setFormData((prev) => ({ ...prev, avatar: compressedBase64 }));
      } catch (err) {
        console.error("Image compression error:", err);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (json.success) {
        setShowModal(false);
        setFormData({ name: "", email: "", area: "", rating: 5, quote: "", avatar: "" });
        fetchReviews();
      }
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-section px-page">
      <div className="mx-auto max-w-content">
        <div className="mx-auto max-w-[38ch] text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.09em] text-brand-purple-strong">
            <span className="h-2 w-2 rounded-pill bg-brand-red" aria-hidden="true" />
            Verified Customer Reviews
          </span>
          <h2 className="mt-4 font-display text-heading-xl font-bold leading-tight tracking-tight text-brand-navy">
            What our customers say
          </h2>
          <p className="mt-4 text-text-secondary">
            Real feedback from homeowners and businesses we&apos;ve helped.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white shadow hover:opacity-90 transition-opacity"
          >
            Leave a Review
          </button>
        </div>

        {loading ? (
          <div className="mt-10 text-center text-sm text-text-secondary">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="mt-10 text-center text-sm text-text-secondary">
            No reviews yet. Be the first to leave one!
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {reviews.map((review) => (
              <motion.figure
                key={review._id}
                variants={cardVariants}
                className="flex h-full flex-col rounded-lg border border-border bg-surface p-6 shadow-soft"
              >
                <StarRating rating={review.rating} />

                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-text-primary">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  {review.avatar ? (
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      width={44}
                      height={44}
                      className="h-11 w-11 flex-none rounded-pill object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-pill bg-brand-navy/10 text-brand-navy font-bold text-sm">
                      {review.name.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-display text-sm font-bold text-brand-navy">
                      {review.name}
                    </p>
                    <p className="truncate text-xs text-text-secondary">
                      {review.area}
                    </p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        )}
      </div>

      {/* Write Review Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-lg border border-border bg-surface p-6 shadow-lg"
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="font-display text-lg font-bold text-brand-navy">Submit Your Review</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-text-secondary hover:text-brand-navy"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-text-secondary">
                    Overall Rating
                  </label>
                  <InteractiveStarRating
                    rating={formData.rating}
                    setRating={(r) => setFormData((prev) => ({ ...prev, rating: r }))}
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-text-secondary">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 w-full rounded border border-border p-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-purple-strong"
                      placeholder="e.g. Sarah Whitfield"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-secondary">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 w-full rounded border border-border p-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-purple-strong"
                      placeholder="e.g. sarah@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary">Area / Location</label>
                  <input
                    type="text"
                    required
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="mt-1 w-full rounded border border-border p-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-purple-strong"
                    placeholder="e.g. Clapham, London"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary">Your Review</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    className="mt-1 w-full rounded border border-border p-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-purple-strong"
                    placeholder="Write details of your experience..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary">Photo / Avatar (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mt-1 block w-full text-xs text-text-secondary file:mr-4 file:rounded file:border-0 file:bg-brand-navy/10 file:px-3 file:py-1 file:font-semibold file:text-brand-navy hover:file:bg-brand-navy/20"
                  />
                  {formData.avatar && (
                    <div className="mt-2 flex items-center gap-2">
                      <img
                        src={formData.avatar}
                        alt="Preview"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <span className="text-xs text-green-600 font-medium">Image uploaded!</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="rounded px-4 py-2 text-sm font-semibold text-text-secondary hover:bg-black/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded bg-brand-navy px-5 py-2 text-sm font-semibold text-white shadow hover:opacity-90 disabled:opacity-50"
                  >
                    {submitting ? "Posting..." : "Post Review"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}