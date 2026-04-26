import { CheckboxRow } from "@/app/components/ui/forms/checkbox/CheckboxRow";
 
export type FiltersPanelProps = {
  collections: Array<{ collection_id: string; name: string }>;
  categories: Array<{ category_id: string; name: string }>;
  colors: string[];
  selectedCollections: string[];
  selectedCategories: string[];
  selectedColors: string[];
  selectedRatings: number[];
  toggleCollection: (id: string) => void;
  toggleCategory: (id: string) => void;
  toggleColor: (color: string) => void;
  toggleRating: (rating: number) => void;
};

export function FiltersPanel({
  collections,
  categories,
  colors,
  selectedCollections,
  selectedCategories,
  selectedColors,
  selectedRatings,
  toggleCollection,
  toggleCategory,
  toggleColor,
  toggleRating,
}: FiltersPanelProps) {
    return (
        <div>
            <div>
                <button>Collections</button>
                <ul>
                {collections.map((c) => (
                    <li key={c.collection_id}>
                        <CheckboxRow
                            id={c.collection_id}
                            name={c.name}
                            value={c.collection_id}
                            checked={selectedCollections.includes(c.collection_id)}
                            onChange={() => toggleCollection(c.collection_id)}
                        >
                            {c.name}
                        </CheckboxRow>
                    </li>
                ))}
                </ul>
            </div>
            <div>
                <button>Category</button>
                <ul>
                    {categories.map((c) => (
                        <li key={c.category_id}>
                            <CheckboxRow
                                id={c.category_id}
                                name={c.name}
                                value={c.category_id}
                                checked={selectedCategories.includes(c.category_id)}
                                onChange={() => toggleCategory(c.category_id)}
                            >
                                {c.name}
                            </CheckboxRow>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <button>Colors</button>
                <ul>
                    {colors.map((color) => (
                        <li key={color}>
                            <CheckboxRow
                                id={color}  
                                name={color}
                                value={color}
                                checked={selectedColors.includes(color)}
                                onChange={() => toggleColor(color)}
                            >
                                {color}
                            </CheckboxRow>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <button>Rating</button>
                <ul>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <li key={index}>
                            <CheckboxRow
                                id={`rating-${index + 1}`}
                                name={`rating-${index + 1}`}
                                value={index + 1}
                                checked={selectedRatings.includes(index + 1)}
                                onChange={() => toggleRating(index + 1)}
                            >
                                {index + 1} stars
                            </CheckboxRow>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}