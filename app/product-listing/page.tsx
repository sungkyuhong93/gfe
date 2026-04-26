"use client";

import { useMemo, useState } from "react";
import { Button } from "@/app/components/ui/button/Button";
import { FiltersDrawer } from "./components/FiltersDrawer";
import categories from "@/reference/product-listing-section/data/categories.json";
import collections from "@/reference/product-listing-section/data/collections.json";
import inventory from "@/reference/product-listing-section/data/inventory.json";
import products from "@/reference/product-listing-section/data/products.json";
import productReviews from "@/reference/product-listing-section/data/product-reviews.json";
import {
  ProductGrid,
  type InventoryVariant,
  type ProductWithVariants,
  type ProductWithVariantsAndRating,
} from "./components/ProductGrid";

export default function ProductListingPage() {
  const [isFiltersOpen, setisFiltersOpen] = useState(false);
  const [selectedCollections, setSelectedCollections] = useState<string[]>(() => []);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => []);
  const [selectedColors, setSelectedColors] = useState<string[]>(() => []);
  const [selectedRatings, setSelectedRatings] = useState<number[]>(() => []);
  const colors = useMemo(() => {
    const set = new Set<string>();
    for (const item of inventory as Array<{ color?: string }>) {
      if (item.color) set.add(item.color);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const joinedProducts = useMemo(() => {
    const byProductId = new Map<string, InventoryVariant[]>();

    for (const v of inventory as InventoryVariant[]) {
      const arr = byProductId.get(v.product_id);
      if (arr) arr.push(v);
      else byProductId.set(v.product_id, [v]);
    }

    const sumById = new Map<string, number>();
    const countById = new Map<string, number>();

    for (const r of productReviews as Array<{ product_id: string; rating: number }>) {
      sumById.set(r.product_id, (sumById.get(r.product_id) ?? 0) + r.rating);
      countById.set(r.product_id, (countById.get(r.product_id) ?? 0) + 1);
    }

    return (products as Array<Omit<ProductWithVariants, "variants">>).map((p) => {
      const variants = byProductId.get(p.product_id) ?? [];
      const reviewCount = countById.get(p.product_id) ?? 0;
      const ratingSum = sumById.get(p.product_id) ?? 0;
      const averageRating = reviewCount > 0 ? ratingSum / reviewCount : 0;

      const joined: ProductWithVariantsAndRating = {
        ...p,
        variants,
        reviewCount,
        averageRating,
      };

      return joined;
    });
  }, []);

  const filteredProducts = useMemo(() => {
    return joinedProducts.filter((p) => {
      if (selectedCollections.length > 0 && !selectedCollections.includes(p.collection)) {
        return false;
      }

      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) {
        return false;
      }

      if (
        selectedColors.length > 0 &&
        !p.variants.some((v) => selectedColors.includes(v.color))
      ) {
        return false;
      }

      if (selectedRatings.length > 0) {
        // Exact bucket match (1–5) based on rounded average rating.
        // Products with no reviews have averageRating = 0 and won't match.
        const bucket = Math.round(p.averageRating);
        if (!selectedRatings.includes(bucket)) return false;
      }

      return true;
    });
  }, [joinedProducts, selectedCollections, selectedCategories, selectedColors, selectedRatings]);

  function toggleCollection(id: string) {
    setSelectedCollections((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function toggleCategory(id: string) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function toggleColor(color: string) {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((x) => x !== color) : [...prev, color],
    );
  }

  function toggleRating(rating: number) {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((x) => x !== rating) : [...prev, rating],
    );
  }

  return (
    <main className="py-gutter-mobile px-gutter-mobile tablet:px-gutter-tablet">
        <div className="w-full min-h-screen bg-surface py-[48px] px-[12px]">
            <div className="flex justify-between desktop:justify-end">
                <span className="desktop:hidden">
                    <Button 
                        startIcon={<img src="./filter.svg" width={12} height={12} />}
                        onClick={() => setisFiltersOpen(true)}
                    >
                        Filter
                    </Button>
                </span>
                <Button endIcon={<img src="./chevron-down.svg" width={12} height={12} />}
                >
                    Sort by
                </Button>
            </div>

            {/* Tiny state demo (remove once wired to FiltersPanel) */}
            <div className="mt-6 flex items-center gap-3">
              <Button onClick={() => toggleCollection("urban")}>
                Toggle “urban”
              </Button>
              <div className="text-sm text-ink-secondary">
                Selected collections:{" "}
                <span className="text-ink-primary">
                  {selectedCollections.join(", ") || "none"}
                </span>
              </div>
            </div>

            <ProductGrid products={filteredProducts} />
        </div>
        <FiltersDrawer
          open={isFiltersOpen}
          onClose={() => setisFiltersOpen(false)}
          collections={collections}
          categories={categories}
          colors={colors}
          selectedRatings={selectedRatings}
          selectedCollections={selectedCollections}
          selectedCategories={selectedCategories}
          selectedColors={selectedColors}
          toggleCollection={toggleCollection}
          toggleCategory={toggleCategory}
          toggleColor={toggleColor}
          toggleRating={toggleRating}
        />
    </main>
  );
}
